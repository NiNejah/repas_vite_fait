import { Router } from 'express';
import * as userController from '../controllers/userController.js';
import {authenticateToken} from  '../middleware/token.js'


const router = Router();

router.get('/', function (req, res) {
    res.status(200).json({
        status: 'API is Working',
        message: 'Welcome!',
    });
});
// ************************************************ USER : 

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Get a list of all users.
 *     responses:
 *       '200':
 *         description: Successful response with a list of users.
 *     tags:
 *       - Users
 */
router.route('/users').get(userController.getAllUsers);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID.
 *     description: Returns a single user by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: The user with the specified ID.
 *       404:
 *         description: user not found.
 *     tags:
 *       - Users
 */
router.route('/users/:id').get(userController.getUser);

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user.
 *     description: Creates a new user with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: The new user.
 *       404:
 *         description: Error 
 *     tags:
 *       - Users
 */
router.route('/users').post(userController.addUser);

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     security:
 *       - BearerAuth: []   
 *     summary: Update a user by ID.
 *     description: Updates a user with the provided data.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 required: false
 *               email:
 *                 type: string
 *                 required: false
 *               password:
 *                  type: string
 *                  required: false
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 _id: UserID
 *                 username: updatedName
 *                 email: updatedEmail
 *                 password: updatedPassword
 *               message: User updated successfully.
 *       404:
 *         description: User not found or error updating user.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: User not found or error updating user.
 *     tags:
 *       - Users
 */
router.route('/users/:id').put(authenticateToken, userController.modifyUser);


/**
 * @openapi
 * /users/login:
 *   post:
 *     summary: Login user.
 *     description: Login a user with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: The user login.
 *       404:
 *         description: Error 
 *     tags:
 *       - Users
 */
router.route('/users/login').post(userController.loginUser);


// ************************************************ FAVORITE : 
/**
 * @openapi
 * /users/{id}/favorites:
 *   get:
 *     summary: Get a favorites by userID.
 *     description: Returns a all favorites by userID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to get it's favorites repat.
 *     responses:
 *       200:
 *         description: all favorites of a specified user .
 *       404:
 *         description: user not found.
 *     tags:
 *       - Users
 */
router.route("/users/:id/favorites").get(userController.getAllFavorites);

/**
 * @openapi
 * /users/{id}/favorites/add:
 *   post:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to add favorites .
 *     summary: Create a new favorite .
 *     description: Creates a new favorite with the provided id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               favoriteId:
 *                 type: string
 *     responses:
 *       200:
 *         description: all user favorites .
 *       404:
 *         description: Error 
 *     tags:
 *       - Users
 */
router.route("/users/:id/favorites/add").post(userController.addOneFavorite);

router.route("/users/:id/favorites/remove").get(userController.removeOneFavorite);


export default router;