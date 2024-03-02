const express = require("express");
const multer = require("multer");
const path = require("path");

const blogController = require("../controllers/blog-controller");

const blogRouter = express.Router()

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'uploads/');
    },
    filename: function (req, file, callback) {
        const extension = path.extname(file.originalname)
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
        callback(null, uniqueSuffix + extension);
    }
});

// Initialize Multer upload
const upload = multer({ storage: storage });

blogRouter.get("/", blogController.getAllblog);
blogRouter.post("/add", upload.single('image'), blogController.addBlog);
blogRouter.put("/update/:id", blogController.updateBlog);
blogRouter.delete("/delete/:id", blogController.deleteblog);
blogRouter.get("/:id", blogController.getByid);
blogRouter.get("/user/:id", blogController.getByUserId)


module.exports = blogRouter