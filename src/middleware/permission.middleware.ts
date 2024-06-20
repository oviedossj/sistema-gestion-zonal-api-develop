import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getRolesEnum } from '@src/config/auth/roles';

export const verifyRole = (allowedRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies['auth-token']; 
    if (!token) return next(new Error('general.UNAUTHORIZED.missing_access_key'));

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    const rolesEnum = getRolesEnum();

    const userRole = Object.keys(rolesEnum).find(key => rolesEnum[key] === decoded.role);
    if (!userRole || !allowedRoles.includes(userRole)) return next(new Error('general.FORBIDDEN.function_access_restricted'));

    next();
  } catch (error) {
    if (error instanceof Error && (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError')) {
      return next(new Error('general.UNAUTHORIZED.invalid_access_key'));
    }
    next(error);
  }
};

