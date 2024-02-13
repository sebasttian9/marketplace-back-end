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
 *         - titulo
 *         - precio
 *         - imagen
 *         - descripcion
 *         - categoria
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the users
 *         titulo:
 *           type: string
 *           description: The item's name
 *         precio:
 *           type: integer
 *           description: The item's price
 *         imagen:
 *           type: string
 *           description: The item's image link
 *         descripcion:
 *           type: array
 *           items:
 *             type: string
 *           description: The item's description and key characteristics
 *         categoria:
 *           type: string
 *           description: The category that the item belongs to
 *         createdAt:
 *           type: string
 *           description: The date of the record's creation
 *         updatedAt:
 *           type: string
 *           description: The date of the record's last update
 *       example:
 *         destino: "Llanta"
 *         presupuesto: 30000
 *         imagen: "https://jktornel.com.mx/wp-content/uploads/2022/06/IMG-BLOG-COMO-LEER-UNA-LLANTA.png"
 *         descripcion: ["Cantidad: 1","Modelo : Racer", "Año de manufactura: 2005"]
 *         categoria: "Ruedas"
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
 * /products/{id}:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Obtener un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
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
 * /products/{id}:
 *   put:
 *     summary: Actualizar un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
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
 * /products/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
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
