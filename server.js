const express = require("express");
const connectDB = require('./config/db');
const fs = require("fs");
const path = require("path");
const app = express();
const modelsRouter = require("./routes/api/models");
const usersRouter = require("./routes/api/users");

// Connect Database
connectDB();


const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(uploadDir));

app.use("/api/models", modelsRouter);
app.use("/api/users", usersRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${ PORT }/`);
});
