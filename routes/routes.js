const router = require('express').Router();
const auth = require("../middleware/token");
const validation = require("../middleware/validation/routes");
const controller = require("../controllers/routes");

// Create Route
router.post('/routes', auth.verifyToken, validation.create, controller.route_create);

// Get Routes
router.get('/routes', auth.verifyToken, controller.route_findByUserID);

// Get Route Details
router.get('/routes/:id', auth.verifyToken, controller.route_details);

// Update Route
router.put('/routes/:id', auth.verifyToken, controller.route_update);

// Delete Route
router.delete('/routes/:id', auth.verifyToken, controller.route_delete);

module.exports = router;


