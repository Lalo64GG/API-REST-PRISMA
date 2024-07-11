import express from 'express';
import dotenv from 'dotenv';
import userRoute from './src/routes/user.route.js';
import authRoute from './src/routes/auth.route.js';
import bookRoute from './src/routes/library.route.js';
import cors from './src/middleware/cors.middleware.js';
import { startServerSocket } from './src/WebSocket/wss.js';
import routerMeta from './src/routes/meta.routes.js';
import messageRoute from './src/routes/message.routes.js';

dotenv.config();

const app = express();

app.use(cors);
app.use(express.json());

app.use('/users', userRoute);
app.use('/books', bookRoute);
app.use('/meta', routerMeta);
app.use('/auth', authRoute);
app.use('/messages', messageRoute); // Añadir la nueva ruta de mensajes

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

startServerSocket(server);  // Passing the server instance to the WebSocket server
