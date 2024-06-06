import express from 'express';
import dotenv from 'dotenv'
import http from 'http'
import userRoute from './src/routes/user.route.js';
import authRoute from './src/routes/auth.route.js';
import bookRoute from './src/routes/library.route.js';
import cors from './src/middleware/cors.middleware.js';
//puto el que lo lea
import startServerSocket from './src/WebSocket/wss.js';
import routerMeta from './src/routes/meta.routes.js';
import routerAuth from './src/routes/auth.route.js';

dotenv.config();

const app = express();

app.use(cors)
app.use(express.json())

app.use('/users', userRoute);
app.use('/books', bookRoute);
app.use('/meta', routerMeta);
app.use('/auth', routerAuth);

const port = process.env.PORT || 5000;


app.listen(port, () =>{
    console.log(`server listening on port ${port}`);
})

startServerSocket()