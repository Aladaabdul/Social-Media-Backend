const express = require("express")
const userRouter = require("./routes/user-routes")
const blogRouter = require("./routes/blog-routes")
const {connectTomongo} = require("./db")

const PORT = 8000
const app = express();
// Coonecting to database
connectTomongo();
app.use(express.json())


app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

app.listen(PORT, ()=> {
    console.log(`http:\\localhost:${PORT}`)
})