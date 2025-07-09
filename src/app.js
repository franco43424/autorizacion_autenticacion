import express from 'express';
import productosRoute from './routes/productos.route.js';

const app = express();
app.use(express.json());

app.use('/productos', productosRoute);

app.get('/', (req, res) => {
  res.send('API de productos funcionando correctamente');
});

export default app;
