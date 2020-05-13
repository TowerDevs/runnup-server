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
const port = process.env.NODE_ENV || 3001;
require("./config/db");

/* --- Middleware --- */
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(express.json());
app.use(morgan("dev"));

/* --- Routes --- */
app.use("/api/v1", require("./routes/auth"));
app.use("/api/v1", require("./routes/errors"));
app.use("/api/v1", require("./routes/routes"));
app.use("/api/v1", require("./routes/runs"));
app.use("/api/v1", require("./routes/friends"));

/* --- Bootup --- */
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;