import { prisma } from "../prismaLunar.js";

export const obtenerProductos = async () => await prisma.producto.findMany();

export const obtenerProductoPorId = async (id) => await prisma.producto.findUnique({ where: { id } });

export const guardarProducto = async (data) => await prisma.producto.create({ data });

export const actualizarProducto = async (id, data) => {
  return await prisma.producto.update({ where: { id }, data });
};

export const eliminarProducto = async (id) => {
  return await prisma.producto.delete({ where: { id } });
};
