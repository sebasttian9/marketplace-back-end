import request from "supertest";
import app from "../../app.js";
import { faker } from '@faker-js/faker';

describe("Users Controllers ", () => {



    describe("testing /POST route createUsers", () => {
        it("Should respond with a 201 code status", async () => {
            const payload = {
                email : faker.internet.email(), 
                password : "123456",
                nombre : faker.person.fullName(),
                imagen : faker.image.avatar()
             }
            const response = await request(app).post("/api/v1/usuarios").send(payload);
            // console.log(response.body);
            expect(response.status).toBe(201);
        });

    });


    // describe("testing /POST Login with email and password", () => {
    //     it("Should respond with a 200 code status", async () => {
    //         const payload = {
    //             email : "svalenzuela.ortiz@gmail.com",
    //             password : "123456"
    //         }
    //         const response = await request(app).post("/api/v1/login").send(payload);
    //         // console.log(response.body);
    //         expect(response.status).toBe(200);
    //     });

    // });


  

});