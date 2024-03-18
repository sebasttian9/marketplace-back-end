/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API para la gestión de pedidos y carrito de compra
 */

/**
 * @swagger
 * definitions:
 *   SuccessMessage:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *         description: A success message
 *     example:
 *       message: Operation successful
 *
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id_pedido:
 *           type: integer
 *           description: The unique identifier of the order
 *         usuario_id:
 *           type: integer
 *           description: The user's ID associated with the order
 *         numero_pedido:
 *           type: string
 *           description: The order number
 *         estado:
 *           type: string
 *           description: The status of the order
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the order was created
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the order was last updated
 *       example:
 *         orders:
 *           - id_pedido: 98
 *             usuario_id: 24
 *             numero_pedido: "ORD911212"
 *             estado: "available"
 *             created_at: "2024-03-18T18:42:31.766Z"
 *             updated_at: "2024-03-18T18:42:31.766Z"
 *           - id_pedido: 97
 *             usuario_id: 24
 *             numero_pedido: "ORD147658"
 *             estado: "available"
 *             created_at: "2024-03-18T16:40:28.842Z"
 *             updated_at: "2024-03-18T16:40:28.842Z"
 *     OrderDetail:
 *       type: object
 *       properties:
 *         id_detalle:
 *           type: integer
 *           description: The unique identifier of the order detail
 *         pedido_id:
 *           type: integer
 *           description: The ID of the order associated with the detail
 *         producto_id:
 *           type: integer
 *           description: The ID of the product associated with the detail
 *         cantidad:
 *           type: integer
 *           description: The quantity of the product in the order detail
 *         neto:
 *           type: string
 *           description: The net price of the product in the order detail
 *         marca_producto:
 *           type: string
 *           description: The brand of the product in the order detail
 *         nombre_producto:
 *           type: string
 *           description: The name of the product in the order detail
 *         descripcion_producto:
 *           type: string
 *           description: The description of the product in the order detail
 *         imagen_producto:
 *           type: string
 *           description: The image URL of the product in the order detail
 *       example:
 *         detalle:
 *           - id_detalle: 58
 *             pedido_id: 98
 *             producto_id: 23
 *             cantidad: 3
 *             neto: "25000"
 *             marca_producto: "Wurth"
 *             nombre_producto: "Aceite"
 *             descripcion_producto: "Aceite de Frenos 250ml."
 *             imagen_producto: "https://marketplace-adl-iamges.s3.sa-east-1.amazonaws.com/aceitewurth.jfif"
 *           - id_detalle: 59
 *             pedido_id: 98
 *             producto_id: 6
 *             cantidad: 1
 *             neto: "15000"
 *             marca_producto: "Chevron"
 *             nombre_producto: "Aceite"
 *             descripcion_producto: "Aceite de motor 10/40"
 *             imagen_producto: "https://static.wixstatic.com/media/6fe420_1bad9b5fc7f442b388d650f3d5c0904e~mv2.png/v1/fill/w_512,h_512,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/6fe420_1bad9b5fc7f442b388d650f3d5c0904e~mv2.png"
 *           - id_detalle: 60
 *             pedido_id: 98
 *             producto_id: 15
 *             cantidad: 1
 *             neto: "35000"
 *             marca_producto: "Peugeot"
 *             nombre_producto: "Aceite"
 *             descripcion_producto: "Aceite de frenos 500ml. Original"
 *             imagen_producto: "https://imagenes.mundorepuestos.com:9091/FOTOGRAFIAS_B2C/producto/200/0032601A.jpg?1"
 *         # Add other order detail objects here...
 */

/**
 * @swagger
 * /user/orders:
 *   get:
 *     summary: Get all orders for the current user
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '400':
 *         description: Error fetching user orders
 *
 *   post:
 *     summary: Create a new order with details
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_producto
 *               - price
 *               - quantity
 *               - price
 *               - action
 *             properties:
 *               id_pedido:
 *                 type: integer
 *                 description: The ID of the order (optional). It's passed through a sessionStorage in React if its initialized, if that's not the case, it's created automatically
 *               id_producto:
 *                 type: integer
 *                 description: The ID of the product
 *               price:
 *                 type: integer
 *                 description: The price of the product
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product that is added to the order
 *               action:
 *                 type: string
 *                 description: The action to perform ('add' generally, 'subt' rarely)
 *             example:
 *               id_producto: 123
 *               price: 25000
 *               quantity: 2
 *               action: add
 *     responses:
 *       '201':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderDetail'
 *       '400':
 *         description: Error creating order with details
 *
 * /user/orders/{orderId}:
 *   get:
 *     summary: Get all details for a specific order
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the order
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderDetail'
 *       '400':
 *         description: Error fetching order details
 *
 * /user/orders/status/{orderNumber}:
 *   put:
 *     summary: Update the status of an order
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: The order number
 *         example: ORD911212
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *               - action
 *             properties:
 *               status:
 *                 type: string
 *                 description: The actual status of the order, they're fixed [unavailable, available, unpaid, purchased]
 *               action:
 *                 type: string
 *                 description: The action to perform [proceed, cancel, stop]
 *             example:
 *               status: unavailable
 *               action: proceed
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '400':
 *         description: Error updating order status
 * /user/orders/{orderNumber}:
 *   delete:
 *     summary: Delete a specific order
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: The order number
 *         example: ORD911212
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/SuccessMessage'
 *       '400':
 *         description: Error deleting order
 *
 * /user/orders/detail/{idDetail}:
 *   put:
 *     summary: Update the quantity of a specific order detail
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idDetail
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the order detail
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *               - action
 *             properties:
 *               quantity:
 *                 type: integer
 *                 description: The quantity to operate the actual number of the order detail
 *               action:
 *                 type: string
 *                 description: The action to perform (increase is 'add', decrease is 'subt')
 *             example:
 *               quantity: 3
 *               action: add
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderDetail'
 *       '400':
 *         description: Error updating order detail
 *
 *   delete:
 *     summary: Delete a specific order detail
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idDetail
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the order detail
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/SuccessMessage'
 *       '400':
 *         description: Error deleting order detail
 */
