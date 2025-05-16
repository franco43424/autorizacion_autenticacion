import jwt from "jsonwebtoken";
import { TIPOSUSUARIO } from "../enums/tiposUsuarios.enum.js";

export const middlewareSaludar = (request, response, next) => {
    const body = request.body;
    next();
}

export const validarTokenMiddleware = (request, response, next) => {
    const autorizationToken = request.headers.authorization;

    if (!autorizationToken) {
        return response.status(401).json({ message: "Debe iniciar sesión" });
    }

    const token = autorizationToken.replace('Bearer ', '');

    try {
        const payload = jwt.verify(token, process.env.CLAVE_JWT);
        request.payload = payload;
        next();
    } catch (error) {
        response.status(401).json({ message: "Token inválido" });
    }
}

export const puedoBorrarMiddleware = (request, response, next) => {
    const payload = request.payload;
    if (payload.userType.id === TIPOSUSUARIO.ADMIN) {
        next();
    }
    response.status(403).json({ message: "No tiene permiso para borrar" });
}