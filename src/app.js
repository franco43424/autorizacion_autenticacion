import express from 'express';
import usersRoute from './routes/users.route.js';

const app = express();

app.use(express.json());

app.use('/usuarios', usersRoute);

app.get('/', (request, response) => {
    response.send("Servicio funcionando correctamente");
});

export default app;