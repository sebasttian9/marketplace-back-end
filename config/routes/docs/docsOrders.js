/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API para la gestión de pedidos
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *   schemas:
 *     Orders:
 *       type: object
 *       required:
 *         - usuario_id
 *         - numero_pedido
 *         - neto
 *         - iva
 *         - total
 *         - estado
 *       properties:
 *         id_pedido:
 *           type: integer
 *           description: The auto-generated id of the order
 *         usuario_id:
 *           type: integer
 *           description: The buyer's connection to its user id
 *         numero_pedido:
 *           type: string
 *           description: order code
 *         observaciones:
 *           type: string
 *           description: The order notes
 *         neto:
 *           type: integer
 *           description: The order total price before taxes
 *         iva:
 *           type: integer
 *           description: The order taxes (19%)
 *         total:
 *           type: integer
 *           description: The order total price with taxes
 *         estado:
 *           type: string
 *           description: The order's state (pending, paid or delivered)
 *         createdAt:
 *           type: string
 *           description: The date of the order's creation
 *         updatedAt:
 *           type: string
 *           description: The date of the order's last update
 *       example:
 *         usuario_id: 5
 *         numero_pedido: "3F7T9K6W"
 *         neto: 30000
 *         iva: 5700
 *         total: 35700
 *         estado: "pending"
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Obtener todos los pedidos
 *     tags: [Orders]
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Orders'
 *       '400':
 *         description: Error al obtener los pedidos
 */

/**
 * @swagger
 * /orders/{id_pedido}:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Obtener un pedido
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id_pedido
 *         required: true
 *         schema:
 *           type: integer
 *         description: The order's id
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Orders'
 *       '400':
 *         description: Error al obtener el pedido
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Crear una nueva ficha de pedido
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                orders:
 *                  $ref: '#/components/schemas/Orders'
 *     responses:
 *       '201':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   $ref: '#/components/schemas/Orders'
 *       '400':
 *         description: Error al postear los pedidos
 */

/**
 * @swagger
 * /orders/{id_pedido}:
 *   put:
 *     summary: Actualizar un pedido
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id_pedido
 *         required: true
 *         schema:
 *           type: integer
 *         description: The order's id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orders:
 *                 $ref: '#/components/schemas/Orders'
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   $ref: '#/components/schemas/Orders'
 *       '400':
 *         description: Error al modificar los pedidos
 */

/**
 * @swagger
 * /orders/{id_pedido}:
 *   delete:
 *     summary: Eliminar un pedido
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id_pedido
 *         required: true
 *         schema:
 *           type: integer
 *         description: The order's id
 *     responses:
 *       '204':
 *         description: Success
 *       '400':
 *         description: Error al eliminar los pedidos
 */
