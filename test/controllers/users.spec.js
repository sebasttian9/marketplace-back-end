import request from "supertest";
import app from "../../app.js";
import { faker } from '@faker-js/faker';
import jwt from "jsonwebtoken";

// Para realizar testing comentar 'import { logger } from "logger-express";' en app.js

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


    describe("testing /POST Login with email and password incorrect", () => {
        it("Should respond with a 400 code status", async () => {
            const payload = {
                email : "svalenzuela.ortiz@gmail.com",
                password : "12345667"
            }
            const response = await request(app).post("/api/v1/login").send(payload);
            // console.log(response.body);
            expect(response.status).toBe(400);
        });

    });


    describe("testing /POST Login with email and password correct", () => {
        it("Should respond with a 200 code status", async () => {
            const payload = {
                email : "svalenzuela.ortiz@gmail.com",
                password : "1234"
            }
            const response = await request(app).post("/api/v1/login").send(payload);
            // console.log(response.body);
            expect(response.status).toBe(200);
        });

    });


    describe("testing /GET User by valid id_usuario ", () => {
        it("Should respond with a 200 code status", async () => {
            const payload = {
                id_usuario : 1
            }
            const token = jwt.sign({ email: "svalenzuela.ortiz@gmail.com", id_usuario: 2 }, process.env.JWT_SECRET, {
                expiresIn: "1h",
              });
            const response = await request(app).get("/api/v1/usuarios").set("Authorization", `Bearer: ${token}`).send(payload);
            // console.log(response.body);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
        });

    });


    describe("testing /GET User by invalid id_usuario ", () => {
        it("Should respond with a 400 code status", async () => {
            // const payload = {
            //     id_usuario : 100
            // }
            const token = jwt.sign({ email: "svalenzuela.ortiz@gmail.com", id_usuario: 100 }, process.env.JWT_SECRET, {
                expiresIn: "1h",
              });
            const response = await request(app).get("/api/v1/usuarios").set("Authorization", `Bearer: ${token}`).send();
            console.log(response.body);
            expect(response.status).toBe(400);
        });

    });

});