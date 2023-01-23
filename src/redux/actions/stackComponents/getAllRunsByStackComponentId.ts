import { stackComponentActionTypes } from '../../actionTypes';
import getAllRunsByStackComponentIdApi from '../../../api/stackComponents/getAllRunsByStackComponentIdApi';

export const getAllRunsByStackComponentId = ({
  stackComponentId,
  sort_by,
  logical_operator,
  page,
  size,
  filtersParam,
  onSuccess,
  onFailure,
}: {
  sort_by: string;
  logical_operator: string;
  page: number;
  size: number;
  filtersParam?: any;
  stackComponentId: TId;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => {
  return {
    type: stackComponentActionTypes.getStackComponentForId.request,
    payload: {
      apiMethod: getAllRunsByStackComponentIdApi,
      isAuthenticated: true,
      failureActionType:
        stackComponentActionTypes.getRunsByStackComponentId.failure,
      successActionType:
        stackComponentActionTypes.getRunsByStackComponentId.success,
      params: {
        sort_by,
        logical_operator,
        stackComponentId,
        page,
        size,
        filtersParam,
      },
      onSuccess,
      onFailure,
    },
  };
};
