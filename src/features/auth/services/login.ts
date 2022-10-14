import { ApiRoutes } from 'src/constants/apiRoutes';
import { request } from 'src/services/request';

interface LoginBody {
  token: string | null;
}

interface LoginResponse {
  access_token: string;
}

export const googleLogin = async ({
  token,
}: LoginBody): Promise<LoginResponse> => {
  const { data } = await request.post<LoginResponse>(ApiRoutes.googleLogin, {
    data: { token },
  });

  return data;
};

export const appleLogin = async ({
  token,
}: LoginBody): Promise<LoginResponse> => {
  const { data } = await request.post<LoginResponse>(ApiRoutes.appleLogin, {
    data: { token },
  });

  return data;
};
