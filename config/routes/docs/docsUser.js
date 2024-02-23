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
 *       properties:
 *         id_usuario:
 *           type: integer
 *           description: The auto-generated id of the users
 *         perfil_id:
 *           type: integer
 *           description: The id that connects to its profile
 *         nombre:
 *           type: string
 *           description: The user's full name
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *         createdAt:
 *           type: string
 *           description: The date of the record's creation
 *         updatedAt:
 *           type: string
 *           description: The date of the record's last update
 *
 *       example:
 *         nombre: John Dee
 *         email: john@dee.com
 *         password: strawberries123
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
 *             type: object
 *             properties:
 *               user:
 *                 $ref: '#/components/schemas/Users'
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                user:
 *                  $ref: '#/components/schemas/Users'
 *       '400':
 *         description: Error al obtener los viajes
 */
