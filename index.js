import express from 'express';
import dotenv from 'dotenv'
import userRoute from './src/routes/user.route.js';
import cors from './src/middleware/cors.middleware.js';

dotenv.config();

const app = express();

app.use(cors)
app.use(express.json())

app.use('/users', userRoute);

const port = process.env.PORT || 5000;


app.listen(port, () =>{
    console.log(`server listening on port ${port}`);
})