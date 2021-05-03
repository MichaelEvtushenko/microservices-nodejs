import { Request } from 'express';

export interface ContextUser {
  id: number;
}

export const getCurrentUser = (request: Request): ContextUser => {
  const userProp = Symbol.for('user');
  return (request as any)[userProp];
};
