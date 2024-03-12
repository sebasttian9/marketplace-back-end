import request from "supertest";
import app from "../../server.js";

describe("Products Controllers ", () => {

    describe("testing GET /products", () => {
        it("Should respond with a 200 code status", async () => {
            const response = await request(app).get("/api/v1/products").send();
            expect(response.status).toBe(200);
        });

        it("Should respond an array and at least 1 object", async () => {
            const response = await request(app).get("/api/v1/products");
            const { results } = response.body;
            // console.log(results)
            expect(Array.isArray(results)).toBe(true);
            expect(results[0]).toBeInstanceOf(Object);
        });
    });


    describe("testing GET get products by SKU", () => {
        it("Should respond with a 200 code status", async () => {
            const response = await request(app).get("/api/v1/products/MR-100001").send();
            // console.log(response.body);
            expect(response.status).toBe(200);
        });

    });


    describe("testing non-existent sku", () => {
        it("Should respond with a 404 code status", async () => {
            const response = await request(app).get("/api/v1/products/MR-10001234").send();
            // console.log(response.body);
            expect(response.status).toBe(404);
        });        

    });



    describe("testing DELETE products by sku", () => {
        it("Should respond with a 204 code status", async () => {
            const response = await request(app).delete("/api/v1/products/MR-100006").send();
            // console.log(response.body);
            expect(response.status).toBe(204);
        });        

    });

  

});