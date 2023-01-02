import { ApiRoutes } from 'src/constants/apiRoutes';
import { request } from 'src/services/request';

interface LoginBody {
  auth_header: string;
  grant_type: string;
}

export interface LoginResponse {
  user: {
    id: string;
    name: string;
  };
  token: string;
}

export const requestLogin = async ({
  auth_header,
  grant_type,
}: LoginBody): Promise<LoginResponse> => {
  const { data } = await request.post<LoginResponse>(ApiRoutes.auth, {
    body: { grant_type },
    headers: {
      Authorization: auth_header,
    },
  });

  return data;
};
