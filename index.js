import express from 'express';
import * as authController from './controllers/authController.js';

const app = express();

app.use(express.json()); // read json from req

app.post('/auth/register',  authController.register);

app.listen(3333, (err) => {
    if(err){
        return console.log(err);
    }

    console.log('Server started')
});