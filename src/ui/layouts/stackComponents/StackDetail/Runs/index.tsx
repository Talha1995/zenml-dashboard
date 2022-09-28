import React from 'react';
import { translate } from '../translate';
import { RunsTable } from '../../RunsTable';
import { useService } from './useService';

export const Runs: React.FC<{ stackComponentId: TId }> = ({
  stackComponentId,
}) => {
  const { fetching, runIds } = useService({ stackComponentId });
  // debugger;

  return (
    <RunsTable
      fetching={fetching}
      emptyStateText={translate('emptyState.text')}
      runIds={runIds}
    />
  );
};
