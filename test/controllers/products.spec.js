import request from "supertest";
import app from "../../server.js";

describe("Operaciones CRUD de Products", () => {

    describe("testing GET /products", () => {
        it("Should respond with a 200 code status", async () => {
            const response = await request(app).get("/api/v1/products").send();
            expect(response.status).toBe(200);
        });

        it("Should respond an array and at least 1 object", async () => {
            const response = await request(app).get("/api/v1/products");
            const { results } = response.body;
            console.log(results)
            expect(Array.isArray(results)).toBe(true);
            expect(results[0]).toBeInstanceOf(Object);
        });
    });


    // describe("testing DELETE /cafes", () => {

    //     it("Should respond with a 404 code status", async () => {
    //         const id = 6;
    //         const token = "123456";

    //         const response = await request(app).delete(`/cafes/${id}`).set("Authorization", `Bearer ${token}`).send();
    //         expect(response.status).toBe(404);
    //     });

    // });


    // describe("testing POST /cafes", () => {

    //     it("Should respond with a 201 code status", async () => {
    //         const payload = {
    //             id: 10,
    //             name: 'chocolate',
    //         };
    //         const response = await request(app).post("/cafes").send(payload);
    //         expect(response.status).toBe(201);
    //     });

    // });



    // describe("testing PUT /cafes/:id", () => {

    //     it("Should respond with a 400 code status", async () => {
    //         const id = 10;
    //         const cafeUpdate = {
    //             id: 11,
    //             name: "chocochino",
    //         };
    //         const response = await request(app)
    //             .put(`/cafes/${id}`)
    //             .send(cafeUpdate);
    //         expect(response.status).toBe(400);
    //     });

    // });

});