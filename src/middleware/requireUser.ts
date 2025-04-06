import { NextFunction, Request, Response } from "express";
import { Roles } from "../types";

export const authorizePermissions = (roles: Roles) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req['user'])
            res.status(401).json({ message: 'not authorized' });
        if (!roles.includes(req['user'].role))
            res.status(403).json({ message: 'not allowed' });
        
        next();
    };
};