import marksModel from "../models/marksModel.js";

export const getAllMarksByCourseId = async (req, res) => {
  try {
    const marks = await marksModel
      .find({ course: req.params.id })
      .populate({
        path: "criteria",
        model: "Criteria",
      })
      .sort({ createdAt: 1 });

    res.json(marks);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Fail creating",
    });
  }
};

export const updateMarkById = async (req, res) => {
  try {
    const mark = await marksModel.findByIdAndUpdate(req.params.id, {
      mark: req.body.mark,
    });

    res.json(mark);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Fail creating",
    });
  }
};
