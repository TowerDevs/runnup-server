const router = require('express').Router();
const controller = require("../controllers/friends")
const auth = require("../middleware/token");

// Add friend
router.put('/friends', auth, controller.friend_add);

module.exports = router;