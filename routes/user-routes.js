const express = require("express")
const userController = require("../controllers/user-controller");

// require auth middleware
const { authenticateToken } = require("../auth");

const userRouter = express.Router();


userRouter.get("/", userController.getAllUser);
userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);


module.exports = userRouter