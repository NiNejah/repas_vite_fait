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
 *       - FAVORITES
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
*       500:
 *         description: Internal Server Error.
 *     tags:
 *       - FAVORITES
 */
router.route("/users/:id/favorites/add").post(authenticateToken,userController.addOneFavorite);

/**
 * @openapi
 * /users/{id}/favorites/remove:
 *   delete:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to remove favorites.
 *     summary: Remove a favorite.
 *     description: Removes a favorite with the provided id.
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
 *         description: All user favorites after removal.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 *     tags:
 *       - FAVORITES
 */
router.route("/users/:id/favorites/remove").delete(userController.removeOneFavorite);



/**
 * @openapi
 * /users/{id}/vegetarian/update:
 *   post:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update the vegetarian field.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isVegetarian:
 *                 type: boolean
 *     summary: Update the vegetarian field of a user.
 *     description: Updates the vegetarian field of the user with the provided id.
 *     responses:
 *       200:
 *         description: The updated user with the new value of the vegetarian field.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 vegetarian: true
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: User not found
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 *     tags:
 *       - Allergic
 */
router.route("/users/:id/vegetarian/update").post(authenticateToken,userController.updateVegetarianField);

/**
 * @openapi
 * /users/{id}/vegetarian:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to get the vegetarian status.
 *     summary: Get the vegetarian status for a user.
 *     description: Retrieves the vegetarian status for the user with the provided id.
 *     responses:
 *       200:
 *         description: The vegetarian status for the user.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data: true
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: User not found
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 *     tags:
 *       - Allergic
 */
router.route("/users/:id/vegetarian").get(userController.getVegetarianStatus);

/**
 * @openapi
 * /users/{id}/peanutFree/update:
 *   post:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update the PeanutFree field.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isPeanutFree:
 *                 type: boolean
 *     summary: Update the PeanutFree field of a user.
 *     description: Updates the PeanutFree field of the user with the provided id.
 *     responses:
 *       200:
 *         description: The updated user with the new value of the PeanutFree field.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 PeanutFree: true
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: User not found
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 *     tags:
 *       - Allergic
 */
router.route("/users/:id/peanutFree/update").post(authenticateToken,userController.updatePeanutFreeField);

/**
 * @openapi
 * /users/{id}/peanutFree:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to get the PeanutFree status.
 *     summary: Get the PeanutFree status for a user.
 *     description: Retrieves the PeanutFree status for the user with the provided id.
 *     responses:
 *       200:
 *         description: The PeanutFree status for the user.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data: true
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: User not found
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 *     tags:
 *       - Allergic
 */
router.route("/users/:id/peanutFree").get(userController.getPeanutFreeStatus);

/**
 * @openapi
 * /users/{id}/porkFree/update:
 *   post:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update the PorkFree field.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isPorkFree:
 *                 type: boolean
 *     summary: Update the PorkFree field of a user.
 *     description: Updates the PorkFree field of the user with the provided id.
 *     responses:
 *       200:
 *         description: The updated user with the new value of the PorkFree field.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 PorkFree: true
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: User not found
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 *     tags:
 *       - Allergic
 */
router.route("/users/:id/porkFree/update").post(authenticateToken,userController.updatePorkFreeField);

/**
 * @openapi
 * /users/{id}/porkFree:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to get the PorkFree status.
 *     summary: Get the PorkFree status for a user.
 *     description: Retrieves the PorkFree status for the user with the provided id.
 *     responses:
 *       200:
 *         description: The PorkFree status for the user.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data: true
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: User not found
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 *     tags:
 *       - Allergic
 */
router.route("/users/:id/porkFree").get(userController.getPorkFreeStatus);

// ************************************************ PROGRAM : 
/**
 * @openapi
 * /users/{id}/program:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to get the program.
 *     summary: Get the program for a user.
 *     description: Retrieves the program array for the user with the provided id.
 *     responses:
 *       200:
 *         description: The program array for the user.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - id: "123"
 *                   date: "2024-01-20"
 *                 - id: "456"
 *                   date: "2024-01-25"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: User not found
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 *     tags:
 *       - PROGRAM
 */
router.route("/users/:id/program").get(userController.getAllProgram);


/**
 * @openapi
 * /users/{id}/program/add:
 *   post:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to add a date to the program.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               programDate:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   date:
 *                     type: string
 *     summary: Add a date to the program.
 *     description: Adds a date to the program array of the user with the provided id.
 *     responses:
 *       200:
 *         description: The updated program array.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - id: "123"
 *                   date: "2024-01-20"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: User not found
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 *     tags:
 *       - PROGRAM
 */
router.route("/users/:id/program/add").post(authenticateToken,userController.addProgramDate);

/**
 * @openapi
 * /users/{id}/program/remove:
 *   post:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to remove a date from the program.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               programDateId:
 *                 type: string
 *     summary: Remove a date from the program.
 *     description: Removes a date from the program array of the user with the provided id.
 *     responses:
 *       200:
 *         description: The updated program array.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - id: "456"
 *                   date: "2024-01-25"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: User not found
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 *     tags:
 *       - PROGRAM
 */
router.route("/users/:id/program/remove").post(authenticateToken,userController.deleteProgramDate);


/**
 * @openapi
 * /users/{id}/program/update:
 *   post:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to modify a date in the program.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               programDateId:
 *                 type: string
 *               newDate:
 *                 type: string
 *     summary: Modify a date in the program.
 *     description: Modifies a date in the program array of the user with the provided id.
 *     responses:
 *       200:
 *         description: The updated program array.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - id: "123"
 *                   date: "2024-01-30"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: User not found
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 *     tags:
 *       - PROGRAM
 */
router.route("/users/:id/program/update").post(authenticateToken,userController.updateProgramDate);



export default router;