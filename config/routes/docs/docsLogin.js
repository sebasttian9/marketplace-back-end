/**
 * @swagger
 * tags:
 *   name: Login
 *   description: Autenticación de usuarios
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *       example:
 *         email: hola@hola.com
 *         password: hola123
 */

/**
 * @swagger
 * definitions:
 *   LoginResponse:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *         description: Welcome message with user's name
 *       data:
 *         type: object
 *         properties:
 *           id_usuario:
 *             type: integer
 *             description: Unique identifier of the user
 *           nombre:
 *             type: string
 *             description: User's name
 *           avatar:
 *             type: string
 *             description: URL of the user's avatar image
 *           email:
 *             type: string
 *             description: User's email address
 *           password:
 *             type: string
 *             description: User's password (hashed)
 *           authsource:
 *             type: string
 *             description: Authentication source (e.g., normal, oauth)
 *           isadmin:
 *             type: boolean
 *             description: Indicates whether the user is an administrator or not
 *           created_at:
 *             type: string
 *             format: date-time
 *             description: The date and time when the user account was created
 *           updated_at:
 *             type: string
 *             format: date-time
 *             description: The date and time when the user account was last updated
 *         example:
 *           id_usuario: 29
 *           nombre: Don Hola
 *           avatar: https://t4.ftcdn.net/jpg/04/23/14/25/360_F_423142507_FsZUpYT6eamfNgyPxRlezjyx8eV1tlXz.jpg
 *           email: hola@hola.com
 *           password: "$2a$10$yOhlFGeevvvmftZ9SKME1.lJOQFSSGjDPQL10jlzDG63BvPA4.TbC"
 *           authsource: normal
 *           isadmin: false
 *           created_at: "2024-03-18T17:34:20.234Z"
 *           updated_at: "2024-03-18T17:34:20.234Z"
 *       code:
 *         type: integer
 *         description: HTML status code of the response
 *       token:
 *         type: string
 *         description: Authentication token (made by JWT) for the user session
 *     example:
 *       message: "Bienvenido, Don Hola has iniciado sesion"
 *       data:
 *         id_usuario: 29
 *         nombre: Don Hola
 *         avatar: https://t4.ftcdn.net/jpg/04/23/14/25/360_F_423142507_FsZUpYT6eamfNgyPxRlezjyx8eV1tlXz.jpg
 *         email: hola@hola.com
 *         password: "$2a$10$yOhlFGeevvvmftZ9SKME1.lJOQFSSGjDPQL10jlzDG63BvPA4.TbC"
 *         authsource: normal
 *         isadmin: false
 *         created_at: "2024-03-18T17:34:20.234Z"
 *         updated_at: "2024-03-18T17:34:20.234Z"
 *       code: 200
 *       token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhvbGFAaG9sYS5jb20iLCJpZF91c3VhcmlvIjoyOSwiaWF0IjoxNzEwNzg0MDIxLCJleHAiOjE3MTA3ODc2MjF9.bT3QFqwp9UjKKcuD8_nd43tL0cRkbBi5vX-c5YXOSBU"
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autenticar un usuario
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/LoginResponse'
 *       '500':
 *         description: Bad Request
 */
