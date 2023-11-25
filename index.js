import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as authController from "./controllers/authController.js";
import * as usersController from "./controllers/usersController.js";
import * as coursesController from "./controllers/coursesController.js";
import * as groupsController from "./controllers/groupsController.js";
import * as materialsController from "./controllers/materialsController.js";
import * as messagesController from "./controllers/messagesController.js";
import * as criteriasController from "./controllers/criteriasController.js";
import * as marksController from "./controllers/marksController.js";
import checkAuth from "./utils/checkAuth.js";

mongoose
  .connect(
    "mongodb+srv://admim:sander@cluster0.2urd1z3.mongodb.net/mkr?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app = express();

app.use(express.json()); // read json from req
app.use(cors()); // manage cors error

app.post("/auth/register", authController.register);
app.post("/auth/login", authController.login);

app.get("/users/me", checkAuth, usersController.getMe);
app.get("/users/teachers", usersController.getAllTeachers);
app.get("/users/students", usersController.getAllStudents);
app.patch("/users/:id", usersController.updateStudentGroup);
app.get("/users/:id", usersController.getUserById);
app.get("/users/group/:id", usersController.getStudentsByGroupId);

app.get("/course/:id", coursesController.getCourseById);
app.post("/courses/", coursesController.createCourse);
app.get("/courses/", coursesController.getAllCourses);
app.get("/courses/:id", coursesController.getCoursesByTeacherId);
app.get("/courses/group/:groupId", coursesController.getCoursesByGroup);

app.post("/groups/", groupsController.createGroupe);
app.get("/groups/", groupsController.getAllGroups);

app.post("/materials/", materialsController.createMaterial);
app.get("/materials/:id", materialsController.getAllMaterialsByCourseId);
app.patch("/materials/:id", materialsController.updateMaterial);
app.delete("/materials/:id", materialsController.deleteMaterial);

app.post("/messages/", messagesController.createMesage);
app.get("/messages/:id", messagesController.getAllMessagesByCourseId);

app.post("/criterias/", criteriasController.createCriterias);
app.get("/criterias/:id", criteriasController.getAllCriteriasByCourseId);

app.get("/marks/:id", marksController.getAllMarksByCourseId);
app.patch("/marks/:id", marksController.updateMarkById);

app.listen(3333, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server started");
});
