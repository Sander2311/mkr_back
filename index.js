import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as authController from './controllers/authController.js';

mongoose
    .connect('mongodb+srv://admim:sander@cluster0.2urd1z3.mongodb.net/mkr?retryWrites=true&w=majority')
    .then(() =>console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json()); // read json from req
app.use(cors()); // manage cors error

app.post('/auth/register',  authController.register);

app.listen(3333, (err) => {
    if(err){
        return console.log(err);
    }

    console.log('Server started')
});