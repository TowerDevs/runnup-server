const router = require('express').Router();
const auth = require("../middleware/token");
const validation = require("../middleware/validation/auth");
const controller = require("../controllers/auth");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");



// Create User

/**
 * @swagger
 * /api/v1/users:
 *  post:
 *    parameters:
 *       - name: name
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: User's email.
 *         in: formData
 *         required: true
 *         type: string     
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *       
 *    description: Create an user account
 *    responses:
 *      '201':
 *        description: A successful response
 *        content:
 *                   text/plain:
 *                   schema:
 *                       type: string
 *                       example: pong
 *       
 * 
 */
router.post('/users', validation.create, controller.user_create);

// User Creds

/**
 * @swagger
 * /api/v1/users:
 *  get:
 *    description: Use to get user details
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/users', auth, controller.user_details);

// Login User

/**
 * @swagger
 * /api/v1/users/access-token:
 *  post:
 *    parameters:
 *       - name: email
 *         description: User's email.
 *         in: formData
 *         required: true
 *         type: string     
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *       
 *    description: Login user account 
 *    responses:
 *      '201':
 *        description: A successful response
 *        content:
 *                   text/plain:
 *                   schema:
 *                       type: string
 *                       example: pong
 *   
 */
router.post('/users/access-token', validation.login, controller.user_login);

//Logout User
// router.delete('/users/access-token', ); // add controller

// Update User

/**
 * @swagger
 * /api/v1/users:
 *  put:
 *    description: Update user details
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.put('/users', auth, controller.user_update);

// Delete User

/**
 * @swagger
 * /api/v1/users:
 *  delete:
 *    description: Delete user account
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.delete('/users', auth, controller.user_delete);

module.exports = router;

