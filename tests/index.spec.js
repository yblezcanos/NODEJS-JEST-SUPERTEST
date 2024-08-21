import app from "../src/app";
import request from "supertest";

describe("Get /tasks", () => {
    test("Should respond with a 200 status code", async () => {
        const response = await request(app).get("/tasks").send();
        console.log(response);
    });
});