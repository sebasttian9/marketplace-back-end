/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API para la gestión de inventario
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *   schemas:
 *     Products:
 *       type: object
 *       required:
 *         - marca_id
 *         - nombre
 *         - descripcion
 *         - precio_lista
 *         - stock
 *         - usado
 *       properties:
 *         id_producto:
 *           type: integer
 *           description: The auto-generated id of the users
 *         marca_id:
 *           type: integer
 *           description: The brand's id
 *         SKU:
 *           type: string
 *           description: stock keeping unit
 *         nombre:
 *           type: string
 *           description: The item's name
 *         descripcion:
 *           type: string
 *           description: The item's description and key characteristics
 *         precio_lista:
 *           type: integer
 *           description: The item's price, stored in DOUBLE notation
 *         stock:
 *           type: integer
 *           description: The item's current stock
 *         usado:
 *           type: integer
 *           description: The item's state, new or used.
 *         createdAt:
 *           type: string
 *           description: The date of the record's creation
 *         updatedAt:
 *           type: string
 *           description: The date of the record's last update
 *       example:
 *         marca_id: 2
 *         nombre: "Llanta"
 *         descripcion: "LLanta Marca XX. Fabricada el año 2012. Utilizada por el Rato McQueen"
 *         precio_lista: 30000
 *         stock: 3
 *         usado: 1
 */

/**
 * @swagger
 * /products:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Products'
 *       '400':
 *         description: Error al obtener los productos
 */

/**
 * @swagger
 * /products/{id_producto}:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Obtener un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id_producto
 *         required: true
 *         schema:
 *           type: integer
 *         description: The item's id
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Products'
 *       '400':
 *         description: Error al obtener el producto
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crear una nueva ficha de producto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                products:
 *                  $ref: '#/components/schemas/Products'
 *     responses:
 *       '201':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   $ref: '#/components/schemas/Products'
 *       '400':
 *         description: Error al postear los productos
 */

/**
 * @swagger
 * /products/{id_producto}:
 *   put:
 *     summary: Actualizar un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id_producto
 *         required: true
 *         schema:
 *           type: integer
 *         description: The item's id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 $ref: '#/components/schemas/Products'
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   $ref: '#/components/schemas/Products'
 *       '400':
 *         description: Error al modificar los productos
 */

/**
 * @swagger
 * /products/{id_producto}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id_producto
 *         required: true
 *         schema:
 *           type: integer
 *         description: The item's id
 *     responses:
 *       '204':
 *         description: Success
 *       '400':
 *         description: Error al eliminar los productos
 */
