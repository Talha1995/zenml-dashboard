import { workspaceActionTypes } from '../../actionTypes';
import getMyWorkspacesApi from '../../../api/workspaces/getMyWorkspacesApi';

export const getMyWorkspacesAction = ({
  selectDefault,
  selectedWorkspace,
  onSuccess,
  onFailure,
}: {
  selectedWorkspace?: string;
  selectDefault?: boolean;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: workspaceActionTypes.getMyWorkspaces.request,
  payload: {
    apiMethod: getMyWorkspacesApi,
    isAuthenticated: true,
    failureActionType: workspaceActionTypes.getMyWorkspaces.failure,
    successActionType: workspaceActionTypes.getMyWorkspaces.success,
    params: { selectDefault, selectedWorkspace },
    onSuccess,
    onFailure,
  },
});
