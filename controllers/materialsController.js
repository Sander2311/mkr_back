import materialsModel from "../models/materialsModel.js";

export const createMaterial = async (req, res) => {
  try {
    const newMaterial = await materialsModel.create({
      course: req.body.course,
      title: req.body.title,
      url: req.body.url,
    });

    res.json(newMaterial);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Fail creating",
    });
  }
};

export const getAllMaterialsByCourseId = async (req, res) => {
  try {
    const materials = await materialsModel
      .find({ course: req.params.id })
      .sort({ createdAt: 1 });

    res.json(materials);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Fail creating",
    });
  }
};

export const updateMaterial = async (req, res) => {
  try {
    const newMaterial = await materialsModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    res.json(newMaterial);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Fail creating",
    });
  }
};

export const deleteMaterial = async (req, res) => {
  try {
    const newMaterial = await materialsModel.findByIdAndDelete(req.params.id);

    res.json(newMaterial);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Fail creating",
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await coursesModel
      .findById(courseId)
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
      .exec();

    res.json(course);
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
    const groupId = req.params.groupId;

    const courses = await coursesModel
      .find({
        groups: { $in: [groupId] },
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
