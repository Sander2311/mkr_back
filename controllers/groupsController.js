import groupsModel from "../models/groupsModel.js";

export const createGroupe = async (req, res) => {
    try {
        const newGroup = await groupsModel.create({
            groupName: req.body.groupName,
        })


        res.json(newGroup);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Fail creating',
        });
    }
}

export const getAllGroups = async (req, res) => {
    try {
        const groups = await groupsModel.find().exec()

        res.json(groups);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Fail creating',
        });
    }
}