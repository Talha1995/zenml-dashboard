import _ from 'lodash';
import { createSelector, Selector } from 'reselect';

import { State } from '../reducers/runsReducer';
import { extractItemFromById } from './utils';

const stateKey = (state: State): State => _.get(state, 'persisted.runs') || {};

const getById = (state: State): Record<TId, TRun> =>
  _.get(stateKey(state), 'byId');

const getMyRunIds = (state: State): TId[] => _.get(stateKey(state), 'myRunIds');

const getByPipelineId = (state: State): Record<TId, TId[]> =>
  _.get(stateKey(state), 'byPipelineId');
const getByStackComponentId = (state: State): Record<TId, TId[]> =>
  _.get(stateKey(state), 'byStackComponentId');
const getByStackId = (state: State): Record<TId, TId[]> =>
  _.get(stateKey(state), 'byStackId');

export const myRuns = (state?: State | null): TRun[] => {
  if (!state) return [];
  const myRunIds = getMyRunIds(state);
  const byId = getById(state);

  return (myRunIds || []).reduce((current: TRun[], id: TId) => {
    const run = byId[id];

    if (run) {
      current = [...current, run];
    }

    return current;
  }, [] as TRun[]);
};

export const runsForPipelineId = (pipelineId: TId | null | undefined) => (
  state?: State | null,
): TRun[] => {
  if (!state || !pipelineId) return [];
  const byPipelineId = getByPipelineId(state);
  const byId = getById(state);

  if (!byPipelineId[pipelineId]) return [];
  return byPipelineId[pipelineId].map((id: TId) => byId[id]);
};
export const runsForStackComponentId = (
  stackComponentId: TId | null | undefined,
) => (state?: State | null): TRun[] => {
  if (!state || !stackComponentId) return [];
  const byStackComponentId = getByStackComponentId(state);
  const byId = getById(state);

  if (!byStackComponentId[stackComponentId]) return [];
  return byStackComponentId[stackComponentId].map((id: TId) => byId[id]);
};
export const runsForStackId = (stackId: TId | null | undefined) => (
  state?: State | null,
): TRun[] => {
  if (!state || !stackId) return [];
  const byStackId = getByStackId(state);
  const byId = getById(state);

  if (!byStackId[stackId]) return [];
  return byStackId[stackId].map((id: TId) => byId[id]);
};

export const runForId = (runId: TId): Selector<any, TRun> =>
  createSelector(getById, extractItemFromById(runId));

export const forRunIds = (runIds: TId[]) => (state?: State | null): TRun[] => {
  if (!state || !runIds) return [];
  const byId = getById(state);

  return runIds.map((id: TId) => byId[id]);
};

const runSelectors = {
  myRuns,
  runsForPipelineId,
  runsForStackId,
  runsForStackComponentId,
  runForId,
  forRunIds,
};

export { runSelectors };
