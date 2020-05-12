const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const router = express.router()

const register_validation = require("../middleware/validation/auth_create");
const login_validation = require("../middleware/validation/auth_login");

const auth_controller = require('../controllers/auth')

const User = require('../models/users')

// Create User
router.post('/api/v1/users', register_validation, auth_controller.user_create);
// Login User
router.post('/api/v1/users/access-token', login_validation, auth_controller.user_login);
// User Creds
router.get('/api/v1/users', auth_controller.user_details)
//Logout User
router.delete('/api/v1/routes/access-token')
