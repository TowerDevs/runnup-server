const router = require('express').Router();
const auth = require("../middleware/token");
const validation = require("../middleware/validation/auth");
const controller = require("../controllers/auth");

// Create User
router.post('/users', validation.create, controller.user_create);

// User Creds
router.get('/users', auth.verifyToken, validation.login, controller.user_details);

// Login User
router.post('/users/access-token', validation.login, controller.user_login);

//Logout User
// router.delete('/users/access-token', ); // add controller

// Update User
router.put('/users', auth.verifyToken, controller.user_update);

// Delete User
router.delete('/users', auth.verifyToken, controller.user_delete);

module.exports = router;

