const User = require("../models/user");
const db = require("../config/db");
const { dataValid } = require("../utils/dataValidation");

const register = async (req, res) => {
    const valid = {
        username: "required",
        password: "required",
        confirmPassword: "required",
        email: "required,isEmail",
        name: "required",
    };

    const user = await dataValid(valid, req.body);

    try {
        

        if (user.data.password !== user.data.confirmPassword) {
            user.message.push("Password tidak sama");
        }

        if (user.message.length > 0) {
            return res.status(400).json({
                message: user.message,
            });
        }

        const usernameExist = await User.findAll({
            where: {
                username: user.data.username,
            },
        });

        const emailExist = await User.findAll({
            where: {
                email: user.data.email,
            },
        });

        if (usernameExist.length > 0) {
            return res.status(400).json({
                message: "Username telah digunakan",
            });
        }

        if (emailExist.length > 0) {
            return res.status(400).json({
                message: "Email telah digunakan",
            });
        }

        const newUser = await User.create(user.data);

        return res.status(201).json({
            message: "success",
            data: newUser,
        });
    } catch (error) {
        console.log("Error di register", error);
    }
};

const login = 

module.exports = { register };
