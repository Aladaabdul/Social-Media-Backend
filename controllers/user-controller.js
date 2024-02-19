const userModel = require("../model/User")
const bcrypt = require("bcryptjs")


const getAllUser = async(req, res, next) => {
    let users;
    try {
        users = await userModel.find();
    } catch (err) {
        console.log(err);
    }
    if (!users) {
        return res.status(404).json({message: "No Users found"});
    }
    return res.status(200).json({users});
};


const signup = async(req, res, next) => {
    const {name, email, password} = req.body

    let existingUser;
    try {
        existingUser = await userModel.findOne({email})
    } catch (err) {
        return console.log(err);
    }
    if (existingUser) {
        return res
        .status(400)
        .json({message: "User already Exists! Login instead"})
    }
    const hashedPassword = bcrypt.hashSync(password); 

    const user = new userModel({
        name,
        email,
        password: hashedPassword,
        blogs: [],
    });
    try {
        await user.save()
    } catch (err) {
        return console.log(err)
    }
    return res.status(201).json({user})
}

const login = async (req, res, next) => {
    const {email, password} = req.body;

    let existingUser;
    try {
        existingUser = await userModel.findOne({email});
    } catch (err) {
        console.log(err);
    }
    if (!existingUser) {
        return res
        .status(404)
        .json({message: "No user by this email"});
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({message:"Incorrect Password"})
    }

    return res.status(200).json({message: "Login Successfully"})
}

module.exports = {
    getAllUser,
    signup,
    login,
};