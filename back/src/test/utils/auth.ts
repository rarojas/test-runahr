import * as jwt from 'jsonwebtoken';

export const getToken = (body: any) => jwt.sign(body, 'top_secret');
