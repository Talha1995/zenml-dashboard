import React from 'react';

import { translate } from '../translate';
import { CollapseTable } from '../../../common/CollapseTable';
import { useHistory, useSelector } from '../../../../hooks';
import { routePaths } from '../../../../../routes/routePaths';

import { useService } from './useService';
import { getHeaderCols } from './getHeaderCols';
import { RunsForStackTable } from './RunsForStackTable';
import { projectSelectors } from '../../../../../redux/selectors';

export const List: React.FC = () => {
  const history = useHistory();
  const {
    openStackIds,
    setOpenStackIds,
    fetching,
    filteredStacks,
    setSelectedRunIds,
  } = useService();

  const headerCols = getHeaderCols({ openStackIds, setOpenStackIds });
  const selectedProject = useSelector(projectSelectors.selectedProject);
  const openDetailPage = (stack: TStack) => {
    setSelectedRunIds([]);

    history.push(routePaths.stack.configuration(stack.id, selectedProject));
  };

  return (
    <>
      <CollapseTable
        renderAfterRow={(stack: TStack) => (
          <RunsForStackTable
            nestedRow={true}
            stack={stack}
            openStackIds={openStackIds}
            fetching={fetching}
          />
        )}
        loading={fetching}
        showHeader={true}
        headerCols={headerCols}
        tableRows={filteredStacks}
        emptyState={{ text: translate('emptyState.text') }}
        trOnClick={openDetailPage}
      />
    </>
  );
};
