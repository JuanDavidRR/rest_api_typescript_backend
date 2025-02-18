import { Request, Response } from "express";
import Product from "../models/Product.model";

export const getProductById = async (request: Request, response: Response) => {
  // Get the id from the URL
  const { id } = request.params;
  const product = await Product.findByPk(id);

  // If the product does not exist
  if (!product) {
    response.status(404).json({ error: "Product not found" });
    return; // Ensure function returns void
  }

  response.json({ data: product });
};

export const getProducts = async (request: Request, response: Response) => {
  const products = await Product.findAll({
    order: [["id", "DESC"]],
  });
  response.json({
    data: products,
  });
};

export const createProduct = async (request: Request, response: Response) => {
  const product = await Product.create(request.body);

  //Return the product that we saved
  response.status(201).json({
    data: product,
  });
};

export const updateProduct = async (request: Request, response: Response) => {
  // Get the id from the URL
  const { id } = request.params;
  const product = await Product.findByPk(id);

  // If the product does not exist
  if (!product) {
    response.status(404).json({ error: "Product not found" });
    return; // Ensure function returns void
  }

  //Update the product
  await product.update(request.body);
  await product.save();

  response.json({ data: product });
};

export const updateProductAvailability = async (
  request: Request,
  response: Response
) => {
  // Get the id from the URL
  const { id } = request.params;
  const product = await Product.findByPk(id);

  // If the product does not exist
  if (!product) {
    response.status(404).json({ error: "Product not found" });
    return; // Ensure function returns void
  }

  //Update the product availability
  product.availability = !product.dataValues.availability;
  await product.save();

  response.json({ data: product });
};

export const deleteProduct = async (request: Request, response: Response) => {
  // Get the id from the URL
  const { id } = request.params;
  const product = await Product.findByPk(id);

  // If the product does not exist
  if (!product) {
    response.status(404).json({ error: "Product not found" });
    return; // Ensure function returns void
  }

  //Delete the product
  await product.destroy();

  response.json({ data: "The product was deleted" });
};
