const blogModel = require("../model/Blog");

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
    
    const blog = new blogModel({
        title,
        description,
        image,
        user
    });
    
    try {
        await blog.save();
    } catch (err) {
        return console.log(err)
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
        blog = await blogModel.findByIdAndDelete(blogId)
    } catch (err) {
        return console.log(err)
    }
    if (!blog) {
        return res.status(500).json({message: "Unable to delete blog"})
    }
    return res.status(200).json({blog});
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
        return res.status(500).json({message: "Blog Not Found"})
    }
    return res.status(200).json({blog});
}

module.exports = {
    getAllblog,
    addBlog,
    updateBlog,
    deleteblog,
    getByid
}