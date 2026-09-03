import request from "supertest";
import express from "express";
import authRoutes from "../routes/authRoutes.js";

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

describe("Auth Endpoints", () => {
  it("should fail validation if email is invalid", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "invalid-email", password: "password123" });
      
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Validation failed");
  });
});
