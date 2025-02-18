import request from "supertest";
import server from "../../server";

//TEST FOR POST REQUEST

describe("POST /api/products", () => {
  it("Should display validation errors", async () => {
    const res = await request(server).post("/api/products").send();

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toHaveLength(4);

    expect(res.status).not.toBe(404);
  });

  it("Should display validation error when price is not greater than 0", async () => {
    const res = await request(server).post("/api/products").send({
      name: "Testing Price",
      price: 0,
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toHaveLength(1);

    expect(res.status).not.toBe(404);
  });

  it("Should display validation error when price is not a number or greater than 0", async () => {
    const res = await request(server).post("/api/products").send({
      name: "Testing Price",
      price: "Not a number",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toHaveLength(2);

    expect(res.status).not.toBe(404);
  });

  it("Should create a new product", async () => {
    const res = await request(server).post("/api/products").send({
      name: "Testing",
      price: 50,
    });

    //Expecting that the http status is 201 (created)
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("data");

    expect(res.status).not.toBe(404);
    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("errors");
  });
});

//TEST FOR GET REQUEST
describe("GET /api/products", () => {
  it("Should check if api/products URL exists", async () => {
    const response = await request(server).get("/api/products");
    expect(response.status).not.toBe(404);
  });
  it("GET a JSON response with products", async () => {
    const response = await request(server).get("/api/products");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveLength(1);

    expect(response.body).not.toHaveProperty("errors");
    expect(response.status).not.toBe(404);
  });
});

//TEST FOR GET BY ID REQUEST
describe("GET /api/products/:id", () => {
  it("Should return a 404 responde for a non-existing product", async () => {
    const productId = 398383;
    const res = await request(server).get(`/api/products/${productId}`);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe("Product not found");
  });
  it("Should check if the ID is a number", async () => {
    const res = await request(server).get(`/api/products/hola`);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0].msg).toBe("ID must be a number");
    expect(res.body.errors).toHaveLength(1);
  });
  it("Get a JSON response for a single product ", async () => {
    const res = await request(server).get(`/api/products/1`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");

    expect(res.status).not.toBe(400);
  });
});

//TEST FOR PUT REQUEST
describe("PUT /api/products/:id", () => {
  it("Should display validation error messages when updating a product", async () => {
    const res = await request(server).put("/api/products/1").send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toBeTruthy();
    expect(res.body.errors).toHaveLength(5);

    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("data");
  });

  it("Should validate that price is greater than 0", async () => {
    const res = await request(server).put("/api/products/1").send({
      name: "testing",
      availability: true,
      price: -300,
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toBeTruthy();
    expect(res.body.errors).toHaveLength(1);
    expect(res.body.errors[0].msg).toBe("Price must be greater than 0");

    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("data");
  });

  it("Should check if the ID is a number", async () => {
    const res = await request(server).put(`/api/products/hola`).send({
      name: "testing",
      availability: true,
      price: 300,
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0].msg).toBe("ID must be a number");
    expect(res.body.errors).toHaveLength(1);
  });

  it("Should return a 404 response for a non-existent product", async () => {
    const productId = 398383;
    const res = await request(server).put(`/api/products/${productId}`).send({
      name: "testing",
      availability: true,
      price: 300,
    });
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Product not found");

    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("data");
  });

  it("Should update an existent product with valid data", async () => {
    const res = await request(server).put(`/api/products/1`).send({
      name: "testing",
      availability: true,
      price: 300,
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");

    expect(res.status).not.toBe(400);
    expect(res.body).not.toHaveProperty("errors");
  });
});

//TEST FOR PATCH REQUEST
describe("PATCH /api/products/:id", () => {
  it("Should return a 404 response for a non-existent product", async () => {
    const productId = 398383;
    const res = await request(server).patch(`/api/products/${productId}`);
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Product not found");

    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("data");
  });
  it("Should update product availability", async () => {
    const res = await request(server).patch(`/api/products/1`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.availability).toBe(false);

    expect(res.status).not.toBe(404);
    expect(res.status).not.toBe(400);
    expect(res.body).not.toHaveProperty("error");
  });
});

//TEST FOR DELETE REQUEST
describe("DELETE /api/products/:id", () => {
  it("Should check a valid ID", async () => {
    const res = await request(server).delete(`/api/products/hola`);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0].msg).toBe("ID must be a number");
  });

  it("Should return a 404 response for a non-existent product", async () => {
    const productId = 398383;
    const res = await request(server)
      .delete(`/api/products/${productId}`)
      .send({});
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Product not found");

    expect(res.status).not.toBe(200);
  });

  it("Should delete a product", async () => {
    const res = await request(server).delete(`/api/products/1`);
    expect(res.status).toBe(200);
    expect(res.body.data).toBe("The product was deleted");

    expect(res.status).not.toBe(404);
    expect(res.status).not.toBe(400);
  });
});
