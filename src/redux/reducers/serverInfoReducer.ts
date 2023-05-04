import { serverInfoActionTypes } from '../actionTypes';

export interface State {
  id: string;
  version: string;
  deploymentType: string;
  databaseType: string;
  secretsStoreType: string;
}

interface Payload {
  id: string;
  version: string;
  deployment_type: string;
  database_type: string;
  secrets_store_type: string;
}

export type Action = {
  type: string;
  payload: Payload;
};

export const initialState: State = {
  databaseType: '',
  deploymentType: '',
  id: '',
  secretsStoreType: '',
  version: '',
};

const newState = (info: Payload): State => ({
  databaseType: info.database_type,
  deploymentType: info.deployment_type,
  id: info.id,
  secretsStoreType: info.secrets_store_type,
  version: info.version,
});

export default function serverInfoReducer(
  state: State = initialState,
  action: Action,
) {
  switch (action.type) {
    case serverInfoActionTypes.getServerInfo.success: {
      return { ...newState(action.payload) };
    }
    default:
      return state;
  }
}
