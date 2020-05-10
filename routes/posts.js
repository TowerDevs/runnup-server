const router = require("express").Router();
const validation = require("../middleware/posts");
const controller = require("../controllers/posts");

router.post("/", validation, controller.create);

router.get("/", controller.read);

router.get("/:_id", controller.return);

router.put("/:_id", validation, controller.update);

router.delete("/:_id", controller.delete);

module.exports = router;