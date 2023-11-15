

export const register = async (req, res) => {
    try {

        console.log(req.body);
    //     // const password = req.body.password;
    //     // const salt = await bcrypt.genSalt(10); // algr encryption pass
    //     // const hash = await bcrypt.hash(password, salt); //our hass of pass

    //     // const doc = new UserModel({
    //     //     email: req.body.email,
    //     //     fullName: req.body.fullName,
    //     //     avatarUrl: req.body.avatarUrl,
    //     //     passwordHash: hash,
    //     // })

    //     // const user = await doc.save();

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
            message: "Good"
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