import coursesModel from "../models/coursesModel.js";

export const createCourse = async (req, res) => {
  try {
    const newCourse = await coursesModel.create({
      title: req.body.title,
      teachers: req.body.teachers,
      groups: req.body.groups,
    });

    res.json(newCourse);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Fail creating",
    });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await coursesModel
      .find()
      .populate([
        {
          path: "teachers",
          model: "User",
        },
        {
          path: "groups",
          model: "Group",
        },
      ])
      .sort({ createdAt: -1 });

    res.json(courses);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Fail creating",
    });
  }
};

export const getCoursesByTeacherId = async (req, res) => {
  try {
    const teacherId = req.params.id;

    const courses = await coursesModel
      .find({
        teachers: { $in: [teacherId] },
      })
      .populate([
        {
          path: "teachers",
          model: "User",
        },
        {
          path: "groups",
          model: "Group",
        },
      ])
      .sort({ createdAt: -1 });

    res.json(courses);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Fail creating",
    });
  }
};

export const getCoursesByGroup = async (req, res) => {
  try {
    const group = req.params.group;

    const courses = await coursesModel
      .find({
        groups: { $in: [group] },
      })
      .populate([
        {
          path: "teachers",
          model: "User",
        },
        {
          path: "groups",
          model: "Group",
        },
      ])
      .sort({ createdAt: -1 });

    res.json(courses);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Fail creating",
    });
  }
};
