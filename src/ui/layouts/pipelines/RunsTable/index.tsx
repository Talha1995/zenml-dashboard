import React from 'react';
import { routePaths } from '../../../../routes/routePaths';
import { useHistory } from '../../../hooks';

import { Table } from '../../common/Table';

import { useHeaderCols } from './HeaderCols';
import { useService } from './useService';

export const RunsTable: React.FC<{
  runIds: TId[];
  pagination?: boolean;
  emptyStateText: string;
  fetching: boolean;
  pipelineRuns?: any;
}> = ({
  runIds,
  pagination = true,
  emptyStateText,
  fetching,
  pipelineRuns,
}) => {
  const history = useHistory();

  const {
    sortedRuns,
    setSortedRuns,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
    setSelectedRunIds,
  } = useService({ pipelineRuns });

  const openDetailPage = (run: TRun) => {
    setSelectedRunIds([]);
    history.push(routePaths.run.pipeline.statistics(run.id, run.pipelineId));
  };

  const headerCols = useHeaderCols({
    runs: pipelineRuns,
    setRuns: setSortedRuns,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
  });
  debugger;

  return (
    <Table
      pagination={pagination}
      loading={fetching}
      showHeader={true}
      headerCols={headerCols}
      tableRows={sortedRuns}
      emptyState={{ text: emptyStateText }}
      trOnClick={openDetailPage}
    />
  );
};
