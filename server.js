/* --- Dependencies --- */
require("dotenv").config();
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

/* --- Configuration --- */
const app = express();
const port = process.env.NODE_ENV || 3001;

/* --- Middleware --- */
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(express.json());

/* --- Routes --- */
app.use("/api/contact", require("./routes/contact"));
app.use("/api/errors", require("./routes/errors"));
app.use("/api/posts", require("./routes/posts"));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/build/index.html")); // change for mobile
});

/* --- Bootup --- */
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;