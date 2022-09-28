import { fetchApiWithAuthRequest } from '../fetchApi';
import { endpoints } from '../endpoints';
import { httpMethods } from '../constants';
import { apiUrl } from '../apiUrl';
import mockApi from '../mockApiData';

const inviteApi = ({
  authenticationToken,
  name,
  email
}: {
  authenticationToken: string;
  name: string;
  email: string;
}): Promise<void> =>  
fetchApiWithAuthRequest({
    url: apiUrl(endpoints.organizations.invite),
    method: httpMethods.post,
    authenticationToken,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      name, email
    }),
  }).catch((res) => {
    if (process.env.REACT_APP_MOCKAPI_RESPONSE) {
      res = {
        data: mockApi.myOrganizationMockResponse.myOrganizationInviteMockResponse,
      };
    }
    return res;
  });
  
  export default inviteApi;