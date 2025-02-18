import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
  updateProductAvailability,
} from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router();
//Setting the schema
/**
 * @swagger
 * components:
 *    schemas:
 *      Product:
 *        type: object
 *        properties:  
 *          id:
 *              type: integer
 *              description: The product ID
 *              example: 1
 *          name:
 *              type: string
 *              description: The product name
 *              example: Macbook Pro
 *          price:
 *              type: number
 *              description: The product price
 *              example: 2000 
 *          availability:
 *              type: boolean
 *              description: The product availability
 *              example: true 
 * 
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Products
 *     description: Return a list of all products
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *          application/json:
 *           schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *    summary: Get a product by ID
 *    tags:
 *      - Products
 *    description: Get a product based on its ID
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to retrive
 *      required: true
 *      schema: 
 *        type: integer
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Invalid ID response
 *      404:
 *        description: Not found response
 *     
 */

/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: Create a new product
 *    tags:
 *      - Products
 *    description: Create a new product in the database
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: "Macbook Pro"
 *              price: 
 *                type: integer
 *                example: 2000
 *    responses:
 *      201:
 *        description: Product created successfully
 *      400:
 *        description: Bad request - Invalid data
 */

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *    summary: Update a product by ID
 *    tags:
 *      - Products
 *    description: Update a product based on its ID
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to retrieve
 *        required: true
 *        schema: 
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: "Macbook Pro"
 *              price: 
 *                type: integer
 *                example: 2000
 *              availability:
 *                type: boolean
 *                example: true
 *    responses:
 *      200:
 *        description: Product Updated Successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad Request - Invalid ID
 *      404:
 *        description: Product Not Found
 */

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *    summary: Update the product availability
 *    tags:
 *      - Products
 *    description: Update the availability of a product based on its ID
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to retrieve
 *        required: true
 *        schema: 
 *          type: integer
 *    responses:
 *      200:
 *        description: Product Updated Successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad Request - Invalid ID
 *      404:
 *        description: Product Not Found
 */

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    summary: Delete the product by ID
 *    tags:
 *      - Products
 *    description: Delete a product based on its ID
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to delete
 *        required: true
 *        schema: 
 *          type: integer
 *    responses:
 *      200:
 *        description: Product Deleted Successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad Request - Invalid ID
 *      404:
 *        description: Product Not Found
 */


//routing
//Get products
router.get("/", getProducts);
router.get(
  "/:id",
  param("id").isInt().withMessage("ID must be a number"),
  handleInputErrors,
  getProductById
);

//Create product
router.post(
  "/",
  //Validate
  body("name").notEmpty().withMessage("Name cannot be empty"),

  body("price")
    .isNumeric()
    .withMessage("Price must be a number")
    .notEmpty()
    .withMessage("Price cannot be empty")
    .custom((value) => value > 0)
    .withMessage("Price must be greater than 0"),
  //Error middleware
  handleInputErrors,
  //Create product on database
  createProduct
);

router.put(
  "/:id",

  //Validate
  param("id").isInt().withMessage("ID must be a number"),

  body("name").notEmpty().withMessage("Name cannot be empty"),

  body("price")
    .isNumeric()
    .withMessage("Price must be a number")
    .notEmpty()
    .withMessage("Price cannot be empty")
    .custom((value) => value > 0)
    .withMessage("Price must be greater than 0"),
  body("availability")
    .isBoolean()
    .withMessage("Availability must be a boolean"),
  //Error middleware
  handleInputErrors,
  updateProduct
);

router.patch(
  "/:id",
  param("id").isInt().withMessage("ID must be a number"),
  handleInputErrors,
  updateProductAvailability
);

router.delete(
  "/:id",
  param("id").isInt().withMessage("ID must be a number"),
  handleInputErrors,
  deleteProduct
);

export default router;
