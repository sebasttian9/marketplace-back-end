/**
 * @swagger
 * tags:
 *   name: FavoriteProducts
 *   description: API para la gestión de productos marcados como favoritos
 */

/**
 * @swagger
 * definitions:
 *   ProductResponse:
 *     type: object
 *     properties:
 *       Products:
 *         type: array
 *         items:
 *           $ref: '#/components/schemas/FavoriteProduct'
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
 *     ProductId:
 *       type: object
 *       properties:
 *         id_producto:
 *           type: integer
 *           description: The ID of the product
 *       example:
 *         id_producto: 51
 *     FavoriteProduct:
 *       type: object
 *       properties:
 *         id_producto:
 *           type: integer
 *           description: The ID of the product
 *         usuario_id:
 *           type: integer
 *           description: The ID of the user associated with the product
 *         sku:
 *           type: string
 *           description: The stock keeping unit (SKU) of the product
 *         marca_producto:
 *           type: string
 *           description: The brand of the product
 *         nombre:
 *           type: string
 *           description: The name of the product
 *         descripcion:
 *           type: string
 *           description: The description of the product
 *         precio_lista:
 *           type: integer
 *           description: The listed price of the product
 *         stock:
 *           type: integer
 *           description: The stock quantity of the product
 *         usado:
 *           type: boolean
 *           description: Indicates whether the product is used or not
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the product was created
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the product was last updated
 *         imagen_url:
 *           type: string
 *           description: The URL of the product image
 *         id_prod_favorito:
 *           type: integer
 *           description: The ID of the favorite product
 *       example:
 *         id_producto: 23
 *         usuario_id: 22
 *         sku: ACE605643
 *         marca_producto: Wurth
 *         nombre: Aceite
 *         descripcion: Aceite de Frenos 250ml.
 *         precio_lista: 25000
 *         stock: 2
 *         usado: false
 *         created_at: "2024-03-18T12:35:29.155Z"
 *         updated_at: "2024-03-18T12:35:29.155Z"
 *         imagen_url: https://marketplace-adl-iamges.s3.sa-east-1.amazonaws.com/aceitewurth.jfif
 *         id_prod_favorito: 98
 */

/**
 * @swagger
 * /user/myfavsproducts:
 *   get:
 *     summary: Get favorite products by user
 *     tags: [FavoriteProducts]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/definitions/ProductResponse'
 *       '400':
 *         description: Error fetching favorite products
 *
 *   post:
 *     summary: Add a new favorite product
 *     tags: [FavoriteProducts]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductId'
 *     responses:
 *       '201':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/SuccessMessage'
 *       '400':
 *         description: Error adding favorite product
 *
 * /user/myfavsproducts/{id}:
 *   delete:
 *     summary: Delete a favorite product
 *     tags: [FavoriteProducts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The id of the favorite product to delete
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/SuccessMessage'
 *       '400':
 *         description: Error deleting favorite product
 */
