const express = require("express")
const userRouter = require("./routes/user-routes")
const blogRouter = require("./routes/blog-routes")
const {connectTomongo} = require("./db");

const PORT = 8000
const app = express();
// Connecting to database
connectTomongo();
app.use(express.json())

//Route for user-related API endpoints
app.use("/api/user", userRouter);
// Route for blog-related API endpoints
app.use("/api/blog", blogRouter);

app.listen(PORT, ()=> {
    console.log(`http:\\localhost:${PORT}`)
})