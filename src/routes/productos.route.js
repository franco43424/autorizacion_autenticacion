import { Router } from 'express';
import {
  obtenerProductos,
  obtenerProductoPorId,
  guardarProducto,
  actualizarProducto,
  eliminarProducto
} from '../services/productos.service.js';

import { validarProductoMiddleware } from '../middlewares/validaciones.middleware.js';

const router = Router();

router.get('/', async (req, res) => res.json(await obtenerProductos()));

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  res.json(await obtenerProductoPorId(id));
});

router.post('/', validarProductoMiddleware, async (req, res) => {
  res.json(await guardarProducto(req.body));
});

router.put('/:id', validarProductoMiddleware, async (req, res) => {
  const id = parseInt(req.params.id);
  res.json(await actualizarProducto(id, req.body));
});

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  res.json(await eliminarProducto(id));
});

export default router;
