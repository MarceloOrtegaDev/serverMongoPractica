import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.models.js';
import { connect } from '../db/db.mongo.js';

export const validarJwt = async (req, res, next) => {
    try {
        const token = req.cookies.token; 
        if (!token) {
            return res.status(401).json('No se encontró el token');
        }
        const decoded = jwt.verify(token, "MiSecretoJEJEJEJE");
        console.log(decoded)
        await connect();
        const user = await UserModel.findById(decoded.userId);
        if (!user) {
            return res.status(401).json('Token invalido');
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({
            message: 'Error en el servidor',
        });
    }
};
