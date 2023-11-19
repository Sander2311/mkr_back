import usersModel from "../models/usersModel.js";

export const getMe = async (req, res) => {
    try {
        const user = await usersModel.findById(req.userId).select("-passwordHash").exec();

        if (!user) {
            return res.status(404).json({
                message: 'User is not exist',
            });
        };


        res.json(user);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'You do not have access',
        });
    }
}

export const getAllTeachers = async (req, res) => {
    try {
        const teachers = await usersModel.find({
            role: "teacher"
        }).select("-passwordHash").exec();



        res.json(teachers);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'You do not have access',
        });
    }
}

