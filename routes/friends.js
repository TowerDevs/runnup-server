const router = require('express').Router();
const validation = require("../middleware/validation/friends");
const controller = require("../controllers/friends")
const auth = require("../middleware/token");

// Add friend
router.post('/friends', auth, validation.create, controller.friend_add);

// Repond to friend request
router.patch('/friends', auth, controller.friend_respond);

// Manage friend
router.put('/friends', auth, controller.friend_manage);

module.exports = router;