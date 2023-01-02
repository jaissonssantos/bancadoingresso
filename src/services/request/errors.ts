import { ApiError } from './ApiError';

const isNetworkError = (error: unknown): boolean =>
  error instanceof Error && error.message === 'Network request failed';

const getApiErrorMsg = (error: unknown): string => {
  if (!(error instanceof ApiError)) {
    return '';
  }

  return (
    error.data.error ||
    (typeof error.data.message === 'string'
      ? error.data.message
      : error.data.message?.[0]) ||
    ''
  );
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
