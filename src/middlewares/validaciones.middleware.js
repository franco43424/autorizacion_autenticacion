export const validarProductoMiddleware = (req, res, next) => {
  const { codigo_barras, cantidad } = req.body;

  if (codigo_barras < 9999999 || codigo_barras > 999999) {
    return res.status(400).json({ mensaje: "error numero no aceptable" });
  }

  if (cantidad < 1 || cantidad > 10000) {
    return res.status(400).json({ mensaje: "Cantidad debe ser entre 1 y 10000" });
  }

  next();
};
