const userModel = require("../model/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config();
const nodemailer = require("nodemailer");
const uuid = require("uuid");
require("dotenv").config

const secretKey = process.env.TOKEN_KEY

// Function to Get all Users
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


// Post users
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

    const token = jwt.sign({ userId: user.id, email: user.email }, secretKey , { expiresIn: '1h' });

    return res.status(201).json({ user, token });
}

// Login Users
const login = async (req, res, next) => {
    const {email, password} = req.body;

    let existingUser;
    try {
        existingUser = await userModel.findOne({email});
    } catch (err) {
        return console.log(err);
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


     // Generate JWT token
     const token = jwt.sign({ userId: existingUser.id, email: existingUser.email }, secretKey , { expiresIn: '1h' });

     return res.status(200).json({ message: "Login successful.", token });
}

// configure nodemailer to use local SMTP server
const transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 1025, // Maildev listens on port 1025 by default
    secure: false,
    tls: {
      rejectUnauthorized: false
    }
  });


async function sendResetEmail(existingUser, token) {
    const mailOptions = {
      from: 'no-reply@yourdomain.com',
      to: existingUser.email,
      subject: 'Password Reset Request',
      text: `Click on the following link to reset your password: http://localhost:3000/reset-password?token=${token}`
    };
  
    return transporter.sendMail(mailOptions);
  }


// Forgot password Logic
const forgotPassword = async(req, res, next) => {
    const {email} = req.body;

    let existingUser;
    try {
        existingUser = await userModel.findOne({email})
    } catch (error) {
        return console.log(error)
    }

    if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
    }

    const token = uuid.v4();

    // Save token and its expiration time in db
    existingUser.resetToken = token;
    existingUser.resetTokenExpires = Date.now() + 3600000; // Expire in 1 hour


    try {
        await existingUser.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({message:"Failed to save the reset token"})
    }

    try {
        await sendResetEmail(existingUser, token);
        return res.status(200).json({ message: 'Password reset email sent successfully' });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Failed to send password reset email' });
      }

}


// reset password Logic
const resetPassword = async(req, res, next) => {
    const {token, newPassword} = req.body;

    let existingUser;
    try {
        existingUser = await userModel.findOne({
            resetToken: token,
            resetTokenExpires: { $gt: Date.now() } // Check if token is not expired
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: "Something went wrong! try again"})
    }

    if (!existingUser) {
        return res.status(400).json({message: "Invalid or expired token"})
    }

    const hashedPassword = bcrypt.hashSync(newPassword);

    existingUser.password = hashedPassword;
    existingUser.resetToken = undefined;
    existingUser.resetTokenExpires = undefined;

    try {
        await existingUser.save()
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Failed to reset password"})
    }

    return res.status(200).json({message: "Password reset successfully"})
}

module.exports = {
    getAllUser,
    signup,
    login,
    forgotPassword,
    resetPassword
};