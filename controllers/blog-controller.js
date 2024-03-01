const { default: mongoose } = require("mongoose");
const blogModel = require("../model/Blog");
const userModel = require("../model/User");

const getAllblog = async (req, res, next) => {
    let blogs;
    try {
        blogs = await blogModel.find();
    } catch (err) {
        console.log(err);
    }
    if (blogs.length === 0) {
        return res.status(404).json({message: "No blog found"});
    }
    return res.status(200).json({blogs});
};

const addBlog = async (req, res, next) => {
    const {title, description, image, user} = req.body
    
    let existingUser;
    try {
        existingUser = await userModel.findById(user)
    } catch (err) {
        return console.log(err)
    }
    if (!existingUser) {
        return res.status(400).json({message: "Unable To find User By This Id"})
    }
    const blog = new blogModel({
        title,
        description,
        image,
        user
    });
    
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session})
        await session.commitTransaction();
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: err})
    }
    return res.status(201).json({blog})
}

const updateBlog = async (req, res, next) => {
    const blogId = req.params.id;
    const {title, description} = req.body;

    let blog;
    try {
        blog = await blogModel.findByIdAndUpdate(blogId, {
            title,
            description
        });
    } catch (err) {
        return console.log(err)
    }
    if (!blog) {
        return res.status(500).json({message: "Unable to update blog"})
    }
    return res.status(200).json({blog})
}

const deleteblog = async (req, res, next) => {
    const blogId = req.params.id;

    let blog;
    try {
        blog = await blogModel.findByIdAndDelete(blogId).populate("user");
        await blog.user.blogs.pull(blog)
        await blog.user.save()
    } catch (err) {
        return console.log(err)
    }
    if (!blog) {
        return res.status(500).json({message: "Unable to delete blog"})
    }
    return res.status(200).json({message: "Deleted Successfully"});
}

const getByid = async (req, res, next) => {
    const id = req.params.id;

    let blog;
    try {
        blog = await blogModel.findById(id)
    } catch(err) {
        console.log(err);
    }
    if (!blog) {
        return res.status(404).json({message: "Blog Not Found"})
    }
    return res.status(200).json({blog});
}

const getByUserId = async (req, res, next) => {
    const userId = req.params.id;

    let userBlogs;
    try {
        userBlogs = await userModel.findById(userId).populate("blogs");
    } catch(err) {
        return console.log(err);
    }
    if (!userBlogs) {
        return res.status(404).json({message: "No Blog Found"});
    }
    return res.status(200).json({userBlogs})
}

module.exports = {
    getAllblog,
    addBlog,
    updateBlog,
    deleteblog,
    getByid,
    getByUserId
}