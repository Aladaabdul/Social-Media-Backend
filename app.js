const express = require("express");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const yaml = require("js-yaml");
const userRouter = require("./routes/user-routes");
const blogRouter = require("./routes/blog-routes");
const {connectTomongo} = require("./db");

const PORT = 8000
const app = express();
// Connecting to database
connectTomongo();
app.use(express.json())

const swaggerDocument = yaml.load(fs.readFileSync("./swagger.yaml", 'utf-8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Route for user-related API endpoints
app.use("/api/user", userRouter);
// Route for blog-related API endpoints
app.use("/api/blog", blogRouter);

console.log("testing...")

app.listen(PORT, ()=> {
    console.log(`http:\\localhost:${PORT}`)
})