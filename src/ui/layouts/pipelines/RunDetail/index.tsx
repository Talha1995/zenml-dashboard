import React from 'react';

import { routePaths } from '../../../../routes/routePaths';
import { translate } from './translate';
import { BasePage } from '../BasePage';
import { useService } from './useService';

import { Configuration } from '../RunDetail/Configuration';
import { DAG } from '../../../components/dag';

import { Box, Paragraph } from '../../../components';

import { RunStatus } from './components';

import { formatDateToDisplayOnTable } from '../../../../utils';
import { useHistory, useSelector } from '../../../hooks';
import { projectSelectors } from '../../../../redux/selectors';

const getTabPages = ({
  selectedProject,
  pipelineId,
  runId,
  fetching,
}: {
  selectedProject: string;
  pipelineId: TId;
  runId: TId;
  fetching: boolean;
}): TabPage[] => {
  return [
    {
      text: 'DAG',

      Component: () => <DAG runId={runId} fetching={fetching} />,
      path: routePaths.run.pipeline.statistics(
        selectedProject,
        runId,
        pipelineId,
      ),
    },
    {
      text: 'Configuration',

      Component: () => <Configuration runId={runId} />,
      path: routePaths.run.pipeline.results(selectedProject, runId, pipelineId),
    },
  ];
};

const getBreadcrumbs = ({
  selectedProject,
  pipelineId,
  runId,
}: {
  selectedProject: string;
  pipelineId: TId;
  runId: TId;
}): TBreadcrumb[] => {
  return [
    {
      name: translate('header.breadcrumbs.pipelines.text'),
      clickable: true,
      to: routePaths.pipelines.list(selectedProject),
    },
    {
      name: pipelineId,
      clickable: true,
      to: routePaths.pipeline.configuration(pipelineId, selectedProject),
    },
    {
      name: `Run ${runId}`,
      clickable: true,
      to: routePaths.run.pipeline.statistics(
        runId,
        pipelineId,
        selectedProject,
      ),
    },
  ];
};

export interface RunDetailRouteParams {
  id: TId;
  pipelineId: TId;
}

export const RunDetail: React.FC = () => {
  const { runId, pipelineId, run, fetching } = useService();
  const selectedProject = useSelector(projectSelectors.selectedProject);
  const tabPages = getTabPages({
    selectedProject,
    runId,
    pipelineId,
    fetching,
  });
  const breadcrumbs = getBreadcrumbs({
    runId,
    pipelineId,
    selectedProject,
  });

  const boxStyle = {
    backgroundColor: '#E9EAEC',
    padding: '10px 0',
    borderRadius: '8px',
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-around',
  };
  const headStyle = { color: '#828282' };
  const history = useHistory();
  return (
    <BasePage
      tabPages={tabPages}
      tabBasePath={routePaths.run.pipeline.base(runId, pipelineId)}
      breadcrumbs={breadcrumbs}
    >
      <Box style={boxStyle}>
        <Box>
          <Paragraph style={headStyle}>RUN ID</Paragraph>
          <Paragraph style={{ color: '#515151', marginTop: '10px' }}>
            {run.id}
          </Paragraph>
        </Box>
        <Box>
          <Paragraph style={headStyle}>RUN NAME</Paragraph>
          <Paragraph style={{ color: '#515151', marginTop: '10px' }}>
            {run.name}
          </Paragraph>
        </Box>
        <Box>
          <Paragraph style={headStyle}>PIPELINE NAME</Paragraph>
          <Paragraph
            size="small"
            style={{
              color: '#22BBDD',
              textDecoration: 'underline',
              cursor: 'pointer',
              marginTop: '10px',
            }}
            onClick={(event) => {
              event.stopPropagation();
              history.push(
                routePaths.pipeline.configuration(
                  run.pipeline?.id,
                  selectedProject,
                ),
              );
            }}
          >
            {run.pipeline?.name}
          </Paragraph>
        </Box>
        <Box>
          <Paragraph style={headStyle}>STATUS</Paragraph>
          <Paragraph
            style={{
              marginTop: '10px',
              justifyContent: 'center',
              borderRadius: '50%',
              height: '25px',
              width: '25px',
              paddingTop: '3px',
              textAlign: 'center',
            }}
          >
            <RunStatus run={run} />
          </Paragraph>
        </Box>
        <Box>
          <Paragraph style={headStyle}>STACK NAME</Paragraph>
          <Paragraph
            size="small"
            style={{
              color: '#22BBDD',
              textDecoration: 'underline',
              cursor: 'pointer',
              marginTop: '10px',
            }}
            onClick={(event) => {
              event.stopPropagation();
              history.push(
                routePaths.stack.configuration(run.stack?.id, selectedProject),
              );
            }}
          >
            {run.stack?.name}
          </Paragraph>
        </Box>
        <Box>
          <Paragraph style={headStyle}>AUTHOR</Paragraph>
          <Paragraph style={{ color: '#515151', marginTop: '10px' }}>
            {run?.user?.name}
          </Paragraph>
        </Box>
        <Box>
          <Paragraph style={headStyle}>CREATED</Paragraph>
          <Paragraph style={{ color: '#515151', marginTop: '10px' }}>
            {formatDateToDisplayOnTable(run.created)}
          </Paragraph>
        </Box>
      </Box>
    </BasePage>
  );
};

export default RunDetail;
