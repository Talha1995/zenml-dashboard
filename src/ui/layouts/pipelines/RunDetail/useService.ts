import { RunDetailRouteParams } from '.';
import { billingActions } from '../../../../redux/actions';
import { billingSelectors, runSelectors } from '../../../../redux/selectors';
import { useParams, useRequestOnMount, useSelector } from '../../../hooks';

interface ServiceInterface {
  runId: TId;
  pipelineId: TId;
  run: TRun;
  billing: TBilling | Record<any, any>;
}

export const useService = (): ServiceInterface => {
  const { id, pipelineId } = useParams<RunDetailRouteParams>();

  // useRequestOnMount(() =>
  //   runsActions.runForId({
  //     pipelineId,
  //     runId: id,
  //   }),
  // );

  useRequestOnMount(() =>
    billingActions.billingForRunId({
      runId: id,
      pipelineId,
    }),
  );

  const run = useSelector(runSelectors.runForId(id));
  const billing = useSelector(billingSelectors.billingForRunId(id));

  return { runId: id, pipelineId, run, billing };
};
