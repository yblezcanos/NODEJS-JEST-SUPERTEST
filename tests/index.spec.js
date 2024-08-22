import app from "../src/app";
import request from "supertest";

describe("Get /tasks", () => {
    test("Should respond with a 200 status code", async () => {
        const response = await request(app).get("/tasks").send();
        expect(response.statusCode).toBe(200);
    });
    test("Should respond with an array", async () => {
        const response = await request(app).get("/tasks").send();
        expect(response.body).toBeInstanceOf(Array);
    });
});

describe("Post /tasks", () => {
    describe("Given a title and descripcion", () => {
        const newTask = {
            title: "test task",
            description: "test description"
        };

        test("Should respond with a 200 status code", async () => {
            const response = await request(app).post("/tasks").send(newTask);
            expect(response.statusCode).toBe(200);
        });
        test("Should have a content_type: aplication/json in header", async () => {
            const response = await request(app).post("/tasks").send(newTask);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
        });
        test("Should respond with an task id", async () => {
            const response = await request(app).post("/tasks").send(newTask);
            expect(response.body.id).toBeDefined();
        });
    });
    
    describe("When title and description are missing", () => {
        test("Should respond with a 400 status code", async () => {
            const response = await request(app).post("/tasks").send({});
            expect(response.statusCode).toBe(400);
        });
    })
});