/* --- Dependencies --- */

require("dotenv").config();
const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
// const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const xss = require("xss-clean");
const redis = require("redis");

/* --- Configuration --- */
const app = express();
const port = process.env.PORT || 3001;
const redisPort = process.env.REDIS_PORT || 6379;

const env = process.env.NODE_ENV;
require("./config/db");
const swaggerOptions={
    swaggerDefinition: {
        info: {
          version: "1.0.0",
          title: "RunnUp API",
          description: "RunnUp API Information",
          contact: { 
            name: "Joshua D'Silva"
          },
          servers: ["http://localhost:3001"]
        }
      },
      // ["server.js"]
      apis: ['routes/*.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

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
const redisClient = redis.createClient(redisPort);

// Cache middleware
checkCache = (req, res, next) => {
  const { id } = req.params;

  redis_client.get(id, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    //if no match found
    if (data != null) {
      res.send(data);
    } else {
      //proceed to next middleware function
      next();
    }
  });
};


module.exports = app;