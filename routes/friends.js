const router = require('express').Router();
const validation = require("../middleware/validation/friends");
const controller = require("../controllers/friends")
const auth = require("../middleware/token");

// Add friend
router.put('/friends', auth, validation.create, controller.friend_add);

// Repond to friend request
router.put('/friends/respond', auth, controller.friend_respond);

module.exports = router;