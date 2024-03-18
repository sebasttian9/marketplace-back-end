/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API para la gestión de usuarios
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - nombre
 *         - email
 *         - password
 *         - imagen
 *       properties:
 *         id_usuario:
 *           type: integer
 *           description: The auto-generated id of the users
 *         nombre:
 *           type: string
 *           description: The user's full name
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password input
 *         imagen:
 *           type: string
 *           description: The user's image link
 *         authsource:
 *           type: string
 *           description: Authentication source (normal o google)
 *         createdAt:
 *           type: string
 *           description: The date of the record's creation
 *         updatedAt:
 *           type: string
 *           description: The date of the record's last update
 *
 *       example:
 *         email: hola@hola.com
 *         password: hola123
 *         nombre: Don Hola
 *         imagen: https://t4.ftcdn.net/jpg/04/23/14/25/360_F_423142507_FsZUpYT6eamfNgyPxRlezjyx8eV1tlXz.jpg
 */

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       id_usuario:
 *         type: integer
 *         description: Unique identifier of the user
 *       nombre:
 *         type: string
 *         description: User's name
 *       avatar:
 *         type: string
 *         format: uri
 *         description: URL of the user's avatar image
 *       email:
 *         type: string
 *         format: email
 *         description: User's email address
 *       password:
 *         type: string
 *         description: User's password (hashed)
 *       authsource:
 *         type: string
 *         description: Authentication source (e.g., normal, oauth)
 *       isadmin:
 *         type: boolean
 *         description: Indicates whether the user is an administrator or not
 *       created_at:
 *         type: string
 *         format: date-time
 *         description: The date and time when the user account was created
 *       updated_at:
 *         type: string
 *         format: date-time
 *         description: The date and time when the user account was last updated
 *     example:
 *       id_usuario: 29
 *       nombre: Don Hola
 *       avatar: https://t4.ftcdn.net/jpg/04/23/14/25/360_F_423142507_FsZUpYT6eamfNgyPxRlezjyx8eV1tlXz.jpg
 *       email: hola@hola.com
 *       password: "$2a$10$yOhlFGeevvvmftZ9SKME1.lJOQFSSGjDPQL10jlzDG63BvPA4.TbC"
 *       authsource: normal
 *       isadmin: false
 *       created_at: "2024-03-18T17:34:20.234Z"
 *       updated_at: "2024-03-18T17:34:20.234Z"
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       '201':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                user:
 *                  $ref: '#/definitions/User'
 *       '400':
 *         description: Error al crear el usuario
 */
