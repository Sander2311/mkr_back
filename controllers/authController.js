import bcrypt from "bcrypt";

import UserModel from '../models/usersModel.js';

export const register = async (req, res) => {
    try {

        const password = req.body.password;
        if (password !== req.body.confirmPassword) {
            return res.status(401).json({
                message: 'password !== confirmPassword',
            });
        }
        const salt = await bcrypt.genSalt(10); 
        const hash = await bcrypt.hash(password, salt); 

        const doc = new UserModel({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            passwordHash: hash,
            role: req.body.role,
        })
   

         const user = await doc.save();

    //     // const token = jwt.sign({ // after register create token
    //     //     _id: user._id,
    //     // },
    //     //     'keyToken123', // key of token
    //     //     {
    //     //         expiresIn: '30d', //life time of the token 
    //     //     }
    //     // );

    //     // const { passwordHash, ...userData } = user._doc;

        res.json({
            message: "Done",
            user
            // ...userData,
            // token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot register',
        });
    };
}