import coursesModel from "../models/coursesModel.js";

export const createCourse = async (req, res) => {
    try {
        const newCourse = await coursesModel.create({
            title: req.body.title,
            teachers: req.body.teachers,
            groups: req.body.groups,
        })


        res.json(newCourse);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Fail creating',
        });
    }
}