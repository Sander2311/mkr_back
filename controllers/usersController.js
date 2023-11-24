import groupsModel from "../models/groupsModel.js";
import usersModel from "../models/usersModel.js";

export const getMe = async (req, res) => {
  try {
    const user = await usersModel
      .findById(req.userId)
      .select("-passwordHash")
      .exec();

    if (!user) {
      return res.status(404).json({
        message: "User is not exist",
      });
    }

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "You do not have access",
    });
  }
};

export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await usersModel
      .find({
        role: "teacher",
      })
      .select("-passwordHash")
      .exec();

    res.json(teachers);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "You do not have access",
    });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await usersModel
      .find({
        role: "student",
      })
      .populate({
        path: "group", // Назва поля, яке має бути заповнене
        model: "Group", // Назва моделі, на яку посилається айдішники
      })
      .select("-passwordHash")
      .exec();

    res.json(students);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "You do not have access",
    });
  }
};

export const getStudentsByGroupId = async (req, res) => {
  try {
    const groupId = req.params.id;

    const students = await usersModel
      .find({
        role: "student",
        group: groupId,
      })
      .populate({
        path: "group", // Назва поля, яке має бути заповнене
        model: "Group", // Назва моделі, на яку посилається айдішники
      })
      .select("-passwordHash")
      .exec();

    res.json(students);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "You do not have access",
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await usersModel
      .findById(userId)
      .populate({
        path: "group", // Назва поля, яке має бути заповнене
        model: "Group", // Назва моделі, на яку посилається айдішники
      })
      .select("-passwordHash")
      .exec();

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "You do not have access",
    });
  }
};

export const updateStudentGroup = async (req, res) => {
  try {
    const studentsId = req.params.id;

    const student = await usersModel.findOne({ _id: studentsId }).exec();

    let oldGroup = student.group ? student.group : null;

    const newStudent = await usersModel
      .findByIdAndUpdate(studentsId, {
        group: req.body.group,
      })
      .select("-passwordHash")
      .exec();

    if (oldGroup) {
      await groupsModel.findByIdAndUpdate(oldGroup, {
        $inc: { studentsNumber: -1 },
      });
    }
    await groupsModel.findByIdAndUpdate(req.body.group, {
      $inc: { studentsNumber: 1 },
    });

    res.json(newStudent);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "You do not have access",
    });
  }
};
