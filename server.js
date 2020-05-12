/* --- Dependencies --- */
require("dotenv").config();
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const xss = require("xss-clean");

/* --- Configuration --- */
const app = express();
const port = process.env.PORT || 3001;
const env = process.env.NODE_ENV || "development";

/* --- Middleware --- */
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(express.json());
app.use(morgan("dev"));

/* --- Routes --- */
app.use("/api/contact", require("./routes/contact"));
app.use("/api/errors", require("./routes/errors"));
app.use("/api/posts", require("./routes/posts"));

/* --- Bootup --- */
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;