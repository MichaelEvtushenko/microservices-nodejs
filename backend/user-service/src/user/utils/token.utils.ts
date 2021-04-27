import { sign } from 'jsonwebtoken';

// todo: move secret to .env
export const generateAccessToken = (userId: number) => sign({ id: userId }, 'secret-42');
