export interface ApiResponse<T> {
  code: number;
  data?: T;
  message?: string;
}

export function responseOk<T>(data: T): ApiResponse<T> {
  return { code: 200, data };
}

export function responseError(
  code: number,
  message: string,
): ApiResponse<never> {
  return { code, message };
}
