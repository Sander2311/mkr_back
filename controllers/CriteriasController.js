import criteriasModel from "../models/criteriasModel.js";

export const createCriterias = async (req, res) => {
  try {
    const newMaterial = await criteriasModel.create({
      course: req.body.course,
      title: req.body.title,
      maxMark: req.body.maxMark,
    });

    res.json(newMaterial);
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
      .sort({ createdAt: -1 });

    res.json(criterias);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Fail creating",
    });
  }
};
