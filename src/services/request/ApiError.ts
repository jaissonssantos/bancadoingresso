export interface ApiErrorData {
  error?: string;
  message?: string | string[];
}

export class ApiError extends Error {
  data: ApiErrorData;

  constructor(data: ApiErrorData) {
    super('ApiError');
    this.data = data;
  }
}
