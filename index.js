import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as authController from './controllers/authController.js';
import * as usersController from './controllers/usersController.js';
import * as coursesController from './controllers/coursesController.js';
import * as groupsController from './controllers/groupsController.js';
import checkAuth from './utils/checkAuth.js';

mongoose
    .connect('mongodb+srv://admim:sander@cluster0.2urd1z3.mongodb.net/mkr?retryWrites=true&w=majority')
    .then(() =>console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json()); // read json from req
app.use(cors()); // manage cors error

app.post('/auth/register', authController.register);
app.post('/auth/login', authController.login);
app.get('/users/me', checkAuth, usersController.getMe);
app.get('/users/teachers', usersController.getAllTeachers);

app.post('/courses/', coursesController.createCourse);
app.get('/courses/', coursesController.getAllCourses);
app.get('/courses/:id', coursesController.getCoursesByTeacherId);
app.get('/courses/:group', coursesController.getCoursesByGroup);

app.post('/groups/', groupsController.createGroupe);
app.get('/groups/', groupsController.getAllGroups);

app.listen(3333, (err) => {
    if(err){
        return console.log(err);
    }

    console.log('Server started')
});