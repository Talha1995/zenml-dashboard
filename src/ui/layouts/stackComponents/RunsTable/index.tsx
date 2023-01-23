import React, { useEffect } from 'react';
import { routePaths } from '../../../../routes/routePaths';
import { useHistory, useLocationPath, useSelector } from '../../../hooks';

import { Table } from '../../common/Table';

import { useHeaderCols } from './HeaderCols';
import { useService } from './useService';
import { projectSelectors } from '../../../../redux/selectors';

export const RunsTable: React.FC<{
  getSorted?: any;
  runIds: TId[];
  paginated?: any;
  pagination?: boolean;
  emptyStateText: string;
  fetching: boolean;
  filter?: any;
}> = ({
  getSorted,
  runIds,
  pagination = true,
  paginated,
  emptyStateText,
  fetching,
  filter,
}) => {
  const history = useHistory();
  const locationPath = useLocationPath();
  const selectedProject = useSelector(projectSelectors.selectedProject);

  const {
    sortedRuns,
    setSortedRuns,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
    setSelectedRunIds,
  } = useService({ runIds, filter });

  const openDetailPage = (run: TRun) => {
    setSelectedRunIds([]);
    history.push(
      routePaths.run.component.statistics(
        locationPath.split('/')[4],
        run.stackComponentId,
        run.id,
        selectedProject,
      ),
    );
  };

  const headerCols = useHeaderCols({
    runs: sortedRuns,
    setRuns: setSortedRuns,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
  });

  useEffect(() => {
    getSorted(activeSorting, activeSortingDirection);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getSorted]);
  return (
    <Table
      activeSorting={
        activeSorting !== 'created' && activeSortingDirection !== 'ASC'
          ? activeSorting
          : 'created'
      }
      pagination={pagination}
      loading={fetching}
      showHeader={true}
      filters={filter}
      paginated={paginated}
      headerCols={headerCols}
      tableRows={sortedRuns}
      emptyState={{ text: emptyStateText }}
      trOnClick={openDetailPage}
    />
  );
};
