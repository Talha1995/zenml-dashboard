/* eslint-disable */

import _ from 'lodash';
import React from 'react';
import { useEffect } from 'react';
import { Sorting, SortingDirection } from './types';
import { pipelinePagesActions } from '../../../../redux/actions';
import { useDispatch, useSelector } from '../../../hooks';
import { runSelectors } from '../../../../redux/selectors';

interface ServiceInterface {
  sortedRuns: TRun[];
  setSortedRuns: (runs: TRun[]) => void;
  activeSorting: Sorting | null;
  setActiveSorting: (arg: Sorting | null) => void;
  activeSortingDirection: SortingDirection | null;
  setActiveSortingDirection: (arg: SortingDirection | null) => void;
  setSelectedRunIds: (ids: TId[]) => void;
}

export const useService = ({
  pipelineRuns,
  runIds,
}: {
  pipelineRuns: any;
  runIds: TId[];
}): ServiceInterface => {
  const dispatch = useDispatch();
  const [activeSorting, setActiveSorting] = React.useState<Sorting | null>(
    'createdAt',
  );
  const [
    activeSortingDirection,
    setActiveSortingDirection,
  ] = React.useState<SortingDirection | null>('DESC');
  const [sortedRuns, setSortedRuns] = React.useState<TRun[]>([]);

  const runs = pipelineRuns
    ? pipelineRuns
    : useSelector(runSelectors.forRunIds(runIds));

  useEffect(() => {
    const orderedRuns = _.sortBy(runs, (run: TRun) =>
      new Date(run.kubeflowStartTime).getTime(),
    ).reverse();

    setSortedRuns(orderedRuns);
  }, []);

  const setSelectedRunIds = (runIds: TId[]) => {
    dispatch(pipelinePagesActions.setSelectedRunIds({ runIds }));
  };

  return {
    sortedRuns,
    setSortedRuns,
    activeSorting,
    setActiveSorting,
    activeSortingDirection,
    setActiveSortingDirection,
    setSelectedRunIds,
  };
};
