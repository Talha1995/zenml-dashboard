import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';

const getOwnerApi = ({
  authenticationToken,
}: {
  authenticationToken: string;
}): Promise<TMember> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.organizations.owner),
    method: httpMethods.get,
    authenticationToken,
  });

export default getOwnerApi;
