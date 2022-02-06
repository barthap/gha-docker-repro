import type { UserInfo as FirebaseAuthUser } from '@firebase/auth-types';

type A = Omit<FirebaseAuthUser, 'providerId'>;

export type { A };

export enum B {
  X = 'X',
  SIMPLE = 'simple',
}

export interface AA {
  readonly id: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface APIErrorResponse {
  /**
   * The HTTP status code derived from error.output.statusCode
   */
  statusCode: number;

  /**
   * The error message
   */
  message: string;

  /**
   * Error code
   */
  code?: string;

  /**
   * Additional data
   */
  data?: any;
}

export function isErrorResponse(
  response: any,
  // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
  // @ts-ignore unused variable, and eslint complains about this not being a ts err
  responseBody?: any
): responseBody is APIErrorResponse {
  return !response.ok && response.status >= 400 && response.status < 600;
}
export * from './export';
