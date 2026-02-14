import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import "dotenv/config";

export interface UserPayload extends JwtPayload {
    id: string;
    email: string;
    first_name: string;
}

function isUserPayload(payload: JwtPayload): payload is UserPayload {
    return (typeof payload.id === 'string' && 
        typeof payload.email === 'string' && 
        typeof payload.first_name === 'string'
    );
}

export function authMiddleware(req: Request,res: Response,next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ 
            message: 'Token não fornecido. Rota Bloquada', 
            success: false
        });
    }

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({ 
            message: 'Token malformatado', 
            success: false
        });
    }

    try {
        const secret = process.env.JWT_SECRET_KEY;
        if (!secret) throw new Error('Secret is missing');

        const decoded = jwt.verify(token, secret);

        if (typeof decoded === 'string' || !isUserPayload(decoded)) {
            return res.status(401).json({ 
                message: 'Token inválido',
                success: false
            });
        }

        req.user = decoded;

        return next();
    } catch(err) {
        return res.status(401).json({ message: 'Token inválido ou expirado' });
    }
}

