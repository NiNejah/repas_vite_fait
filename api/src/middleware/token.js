import jwt from 'jsonwebtoken';
import { config } from "dotenv";

config();
const token_key = process.env.TOKEN_KEY;

export const authenticateToken = (req, res, next) => {
    // console.log(req.headers.authorization);
    const token = req.headers.authorization.replace('Bearer ', '');
    if (!token) return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });

    jwt.verify(token, token_key, (err, user) => {
        if (err) return res.status(403).json({ success: false, message: 'Invalid token.' });
        req.user = user;
        next();
    });
};
