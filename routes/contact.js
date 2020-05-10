const router = require("express").Router();
const validation = require("../middleware/contact");
const controller = require("../controllers/contact");

router.post("/", validation, controller);

module.exports = router;