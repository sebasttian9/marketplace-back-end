/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API para la gestión de inventario
 */

/**
 * @swagger
 *   definitions:
 *     Product:
 *       type: object
 *       properties:
 *         id_producto:
 *           type: integer
 *           description: Unique identifier of the product
 *         nombre:
 *           type: string
 *           description: Name of the product
 *         SKU:
 *           type: string
 *           description: SKU code of the product
 *         detalle:
 *           type: string
 *           description: Detailed description of the product
 *         imagen:
 *           type: string
 *           description: URL of the product image
 *         precio:
 *           type: integer
 *           description: Price of the product in cents
 *         stock:
 *           type: integer
 *           description: Quantity available in stock
 *         marca:
 *           type: string
 *           description: Brand of the product
 *         usado:
 *           type: boolean
 *           description: Indicates whether the product is used or not
 *         descripcion:
 *           type: string
 *           description: Brief description of the product
 *       example:
 *         id_producto: 6
 *         nombre: Oil
 *         SKU: MR-100006
 *         detalle: 10W-40 Motor Oil
 *         imagen: null
 *         precio: 15000
 *         stock: 100
 *         marca: Chevron
 *         usado: false
 *         descripcion: 10W-40 Motor Oil
 */

/**
 * @swagger
 * definitions:
 *   SingleProduct:
 *     type: object
 *     properties:
 *       id_producto:
 *         type: integer
 *         description: Unique identifier of the product
 *       usuario_id:
 *         type: integer
 *         description: User ID associated with the product
 *       sku:
 *         type: string
 *         description: SKU code of the product
 *       marca_producto:
 *         type: string
 *         description: Brand of the product
 *       nombre:
 *         type: string
 *         description: Name of the product
 *       descripcion:
 *         type: string
 *         description: Detailed description of the product
 *       precio_lista:
 *         type: integer
 *         description: Price of the product in cents
 *       stock:
 *         type: integer
 *         description: Quantity available in stock
 *       usado:
 *         type: boolean
 *         description: Indicates whether the product is used or not
 *       created_at:
 *         type: string
 *         format: date-time
 *         description: The date and time when the record was created
 *       updated_at:
 *         type: string
 *         format: date-time
 *         description: The date and time when the record was last updated
 *       imagen_url:
 *         type: string
 *         description: URL of the product image
 *     example:
 *       id_producto: 15
 *       usuario_id: 22
 *       sku: ACE169582
 *       marca_producto: Peugeot
 *       nombre: Aceite
 *       descripcion: Aceite de frenos 500ml. Original
 *       precio_lista: 35000
 *       stock: 1
 *       usado: false
 *       created_at: "2024-03-17T00:41:46.528Z"
 *       updated_at: "2024-03-17T00:41:46.528Z"
 *       imagen_url: null
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
 *         - brand
 *         - title
 *         - description
 *         - price
 *         - stock
 *         - state
 *       properties:
 *         id_producto:
 *           type: integer
 *           description: The auto-generated id of the users
 *         brand:
 *           type: string
 *           description: The brand's name
 *         SKU:
 *           type: string
 *           description: stock keeping unit, is auto-generated with the title
 *         title:
 *           type: string
 *           description: The item's name
 *         description:
 *           type: string
 *           description: The item's description and key characteristics
 *         price:
 *           type: integer
 *           description: The item's price
 *         stock:
 *           type: integer
 *           description: The item's current stock
 *         state:
 *           type: boolean
 *           description: The item's state, new (0) or used (1).
 *         createdAt:
 *           type: string
 *           description: The date of the record's creation
 *         updatedAt:
 *           type: string
 *           description: The date of the record's last update
 *       example:
 *         brand: "Peugeot"
 *         title: "Llanta"
 *         description: "LLanta Marca XX. Fabricada el año 2012. Utilizada por el Rato McQueen"
 *         price: 30000
 *         stock: 3
 *         state: 1
 */

/**
 * @swagger
 * /products:
 *   get:
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
 *                 total_general:
 *                   type: integer
 *                   example: 18
 *                   description: Entire inventory of marketplace
 *                 total:
 *                   type: integer
 *                   example: 3
 *                   description: Entire inventory requested by the query
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: "#/definitions/Product"
 *       '400':
 *         description: Error al obtener los productos
 */

/**
 * @swagger
 * /products/{sku}:
 *   get:
 *     summary: Obtener un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: sku
 *         required: true
 *         schema:
 *           type: string
 *         description: The item's sku
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/definitions/SingleProduct"
 *       '404':
 *         description: The item doesn't exist
 */

/**
 * @swagger
 * definitions:
 *   MyPost:
 *     type: object
 *     properties:
 *       id_producto:
 *         type: integer
 *         description: Unique identifier of the product
 *       usuario_id:
 *         type: integer
 *         description: User ID associated with the product
 *       sku:
 *         type: string
 *         description: SKU code of the product
 *       marca_producto:
 *         type: string
 *         description: Brand of the product
 *       nombre:
 *         type: string
 *         description: Name of the product
 *       descripcion:
 *         type: string
 *         description: Detailed description of the product
 *       precio_lista:
 *         type: integer
 *         description: Price of the product in cents
 *       stock:
 *         type: integer
 *         description: Quantity available in stock
 *       usado:
 *         type: boolean
 *         description: Indicates whether the product is used or not
 *       created_at:
 *         type: string
 *         format: date-time
 *         description: The date and time when the record was created
 *       updated_at:
 *         type: string
 *         format: date-time
 *         description: The date and time when the record was last updated
 *       imagen_url:
 *         type: string
 *         description: URL of the product image
 *     example:
 *       id_producto: 18
 *       usuario_id: 24
 *       sku: ASD871778
 *       marca_producto: asdasd
 *       nombre: asdasd
 *       descripcion: asdasdasd
 *       precio_lista: 2222
 *       stock: 1
 *       usado: false
 *       created_at: "2024-03-17T18:54:39.027Z"
 *       updated_at: "2024-03-17T18:54:39.027Z"
 *       imagen_url: "https://marketplace-adl-iamges.s3.sa-east-1.amazonaws.com/flujo-carpetas.png"
 */

/**
 * @swagger
 * /myPosts:
 *   get:
 *     summary: Get user's posts
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 myPosts:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/MyPost'
 *       '400':
 *         description: Error fetching user's posts
 */

/**
 * @swagger
 * /products:
 *   post:
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     summary: Create a new product record
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         required: true
 *         description: The image to upload.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Products'
 *     responses:
 *       '201':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/definitions/SingleProduct"
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /products/{sku}:
 *   put:
 *     summary: Actualizar un producto
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sku
 *         required: true
 *         schema:
 *           type: string
 *         description: The items sku
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Products'
 *     responses:
 *       '201':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/definitions/MyPost'
 *       '400':
 *         description: Error al modificar los productos
 */

/**
 * @swagger
 * /products/{sku}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: sku
 *         required: true
 *         schema:
 *           type: string
 *         description: The item's sku
 *     responses:
 *       '204':
 *         description: Success
 *       '400':
 *         description: Error al eliminar los productos
 */
