import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Lottie from 'lottie-react';

import { selectedWorkspace } from '../../../redux/selectors';
import { routePaths } from '../../../routes/routePaths';
import { Box, FlexBox, LinkBox, Paragraph, Separator } from '../../components';
import { PluginCard } from './PluginCard';
import loadingAnimation from './loadingAnimation.json';
import { HUB_API_URL } from '../../../api/constants';
import { useHubToken } from '../../hooks/auth';
import { useToaster } from '../../hooks';

const getData = async (token: string, status: 'pending' | 'available') => {
  return (
    await axios.get(`${HUB_API_URL}/plugins?status=${status}&mine=true`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data as TPlugin[];
};

export const Plugins: React.FC = () => {
  const workspace = useSelector(selectedWorkspace);
  const { failureToast } = useToaster();
  const token = useHubToken();
  const [pendingPlugins, setPendingPlugins] = useState([] as TPlugin[]);
  const [completedPlugins, setCompletedPlugins] = useState(
    [] as { month: string; plugins: TPlugin[] }[],
  );

  useEffect(() => {
    // shouldn't be possible
    if (!token) return;

    getData(token, 'pending').then(setPendingPlugins);
    getData(token, 'available').then((plugins) => {
      const grouped = plugins.reduce((acc, next) => {
        const month = moment(next.created).format('MMMM yyyy');
        if (!acc[month]) acc[month] = [];
        acc[month].push(next);
        return acc;
      }, {} as Record<string, TPlugin[]>);

      const ls = Object.entries(grouped).map(([month, plugins]) => ({
        month,
        plugins,
      }));

      setCompletedPlugins(ls);
    });
  }, [token]);

  return (
    <Box>
      {pendingPlugins.length > 0 && (
        <Box marginVertical="lg">
          <Paragraph color="darkGrey" size="small">
            Pending activity
          </Paragraph>

          <Box marginVertical="lg">
            {pendingPlugins.map((p, i) => (
              <LinkBox
                key={i}
                onClick={() =>
                  failureToast({
                    description:
                      "You can view plugin details once it's completed",
                  })
                }
                style={{
                  display: 'flex',
                  width: '100%',
                  padding: '20px',
                  boxShadow: '0px 4px 20px 0px #0000000D',
                }}
              >
                {/* image */}
                <Box
                  style={{
                    height: '90px',
                    width: '90px',
                    backgroundColor: '#eee',
                    flexGrow: 0,
                  }}
                />

                {/* text */}
                <Box style={{ flexGrow: 1 }} marginHorizontal="lg">
                  <Paragraph color="primary" style={{ fontSize: '24px' }}>
                    {p.name}
                  </Paragraph>
                  <Paragraph
                    color="grey"
                    style={{ fontSize: '20px', marginTop: '8px' }}
                  >
                    Pending
                    {/* TODO: get the last line of build logs for status? */}
                    {/* {p.build_logs?.split('\n') ?? 'Pending'} */}
                  </Paragraph>
                </Box>

                {/* animation */}
                <Box
                  style={{
                    height: '90px',
                    width: '90px',
                    flexGrow: 0,
                  }}
                >
                  <Lottie animationData={loadingAnimation} />
                </Box>
              </LinkBox>
            ))}
          </Box>
        </Box>
      )}

      <Box marginVertical="xl">
        <Paragraph color="primary">Completed</Paragraph>
        {completedPlugins.length > 0 ? (
          completedPlugins.map((m) => (
            <Box key={m.month} marginVertical="lg">
              <Paragraph
                size="tiny"
                style={{
                  color: '#24292F',
                  marginBottom: '6px',
                  opacity: 0.5,
                  fontWeight: 600,
                }}
              >
                {m.month}
              </Paragraph>
              <Separator.Light />
              <FlexBox flexWrap={true} marginVertical="md">
                {m.plugins.map((_, i) => (
                  <PluginCard
                    key={i}
                    title="bloc"
                    description="A predictable state management library that helps implement the BLoC (Business Logic Component) design pattern."
                    url={routePaths.plugins.detail.overview(
                      workspace,
                      'unique-id',
                    )}
                  />
                ))}
              </FlexBox>
            </Box>
          ))
        ) : (
          <Paragraph>{"You haven't uploaded any plugins yet."}</Paragraph>
        )}
      </Box>
    </Box>
  );
};
