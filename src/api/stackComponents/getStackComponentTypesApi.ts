import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
// import mockApi from '../mockApiData';

const getStackComponentTypesApi = ({
  authenticationToken,
}: {
  authenticationToken: string;
}): Promise<TStack> =>
  fetchApiWithAuthRequest({
    url: apiUrl(endpoints.StackComponents.types),
    method: httpMethods.get,
    authenticationToken,
  });

export default getStackComponentTypesApi;
