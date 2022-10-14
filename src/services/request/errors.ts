import axios from 'axios';

interface ApiErrorData {
  error?: string;
  message?: string[];
}

const isNetworkError = (error: unknown): boolean =>
  error instanceof Error && error.message === 'Network Error';

const getApiErrorData = (error: unknown): ApiErrorData | null =>
  axios.isAxiosError(error) ? error.response?.data : null;

const getApiErrorMsg = (error: unknown): string => {
  const data = getApiErrorData(error);
  return data?.error || data?.message?.[0] || '';
};

export const getErrorMessage = (error: unknown): string => {
  const apiErrorMsg = getApiErrorMsg(error);

  if (apiErrorMsg) {
    return apiErrorMsg;
  }

  if (isNetworkError(error)) {
    return 'Sem conexão à internet. Confira sua conexão e tente novamente!';
  }

  return 'Deu um probleminha técnico aqui, nada grave. Tente de novo em alguns instantes!';
};
