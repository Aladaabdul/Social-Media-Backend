const mongoose = require("mongoose");

const Schema = mongoose.Schema

const UserModelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    resetToken: {
        type: String,
        default: null
    },
    resetTokenExpires: {
        type: Date,
        default: null
    },
    blogs: [{type: mongoose.Types.ObjectId, ref: "Blog", required: true}]
})
module.exports = mongoose.model("User", UserModelSchema)