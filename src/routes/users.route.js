import { Router } from 'express';
import jwt from "jsonwebtoken";
import {
    actualizarUsuario,
    eliminarUsuario,
    guardarUsuario,
    obtenerTodosUsuarios,
    obtenerUnoPorRut,
    loginUsuario
} from '../services/users.service.js';
import { middlewareSaludar, puedoBorrarMiddleware, validarTokenMiddleware } from '../middlewares/prueba.middleware.js';

const router = Router();

router.get('/', async (request, response) => {
    response.json(await obtenerTodosUsuarios());
});

router.get('/:rut', async (request, response) => {
    const rut = parseInt(request.params.rut);
    response.json(await obtenerUnoPorRut(rut));
});

router.post('/', async (request, response) => {
    const dataUsuario = request.body;
    response.json(await guardarUsuario(dataUsuario));
});

router.put('/:rut', async (request, response) => {
    const rut = parseInt(request.params.rut);
    const dataUsuario = request.body;
    response.json(await actualizarUsuario(dataUsuario, rut));
});

router.delete('/:rut', validarTokenMiddleware, puedoBorrarMiddleware, async (request, response) => {
    const rut = parseInt(request.params.rut);
    response.json(await eliminarUsuario(rut));
});

router.post('/login', middlewareSaludar, async (request, response) => {
    const dataEntrando = request.body;
    const respuesta = await loginUsuario(dataEntrando);
    if (respuesta.status === 200) {
        const token = jwt.sign(
            respuesta.usuario,
            process.env.CLAVE_JWT,
            { expiresIn: '10h' }
        );
        response.json({ token });
    }

    response.status(respuesta.status).json(respuesta);
});

export default router;