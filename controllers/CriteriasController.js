import coursesModel from "../models/coursesModel.js";
import criteriasModel from "../models/criteriasModel.js";
import marksModel from "../models/marksModel.js";
import usersModel from "../models/usersModel.js";

export const createCriterias = async (req, res) => {
  try {
    const newCriteria = await criteriasModel.create({
      course: req.body.course,
      title: req.body.title,
      maxMark: req.body.maxMark,
    });

    const course = await coursesModel.findById(req.body.course).populate({
      path: "groups",
      model: "Group",
    });

    const students = await usersModel.find({
      role: "student",
      group: course.groups[0]._id,
    });

    for (const student of students) {
      await marksModel.create({
        user: student._id,
        course: course._id,
        criteria: newCriteria._id,
        mark: 0,
      });
    }

    res.json(newCriteria);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Fail creating",
    });
  }
};

export const getAllCriteriasByCourseId = async (req, res) => {
  try {
    const criterias = await criteriasModel
      .find({ course: req.params.id })
      .sort({ createdAt: 1 });

    res.json(criterias);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Fail creating",
    });
  }
};
