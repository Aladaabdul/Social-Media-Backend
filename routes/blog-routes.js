const express = require("express")

const blogController = require("../controllers/blog-controller");

const blogRouter = express.Router()

blogRouter.get("/", blogController.getAllblog);
blogRouter.post("/add", blogController.addBlog);
blogRouter.put("/update/:id", blogController.updateBlog);
blogRouter.delete("/delete/:id", blogController.deleteblog);
blogRouter.get("/:id", blogController.getByid);

module.exports = blogRouter