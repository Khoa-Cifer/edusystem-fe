export interface ResponseDto<T = unknown> {
  result: T | null;
  isSuccess: boolean;
  statusCode: number;
  message: string;
}
