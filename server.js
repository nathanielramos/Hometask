const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const modelsRouter = require("./routes/api/models");

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(uploadDir));

app.use("/api/models", modelsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${ PORT }/`);
});
