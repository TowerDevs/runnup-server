const router = require('express').Router();
const auth = require("../middleware/token");
const validation = require("../middleware/validation/runs");
const controller = require("../controllers/runs");

// Create Run
router.post('/runs', validation, controller.run_create);

// Get Run
router.get('/runs', auth, controller.run_findByUserID);

// Get Run by Route
router.get('/runs', auth, controller.run_findByRouteID);

// Get Run Details
router.get('/runs/:_id', auth, controller.run_details);

// Update Run
router.put('/runs/:_id', auth, validation, controller.run_update);

// Delete Run
router.delete('/runs/:_id', auth, controller.run_delete)

module.exports = router;


