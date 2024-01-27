const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

require("dotenv").config();

beforeEach(async () => {
  await mongoose.connect(process.env.DB_HOST);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("POST /users/login", () => {
  it("should login", async () => {
    const res = await request(app).post("/users/login").send({
      email: "maksym@gmail.com",
      password: "12345678",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    // expect(res.body.user.email).toBe("maksym@gmail.com");
    // expect(res.body.user.subscription).toBe("starter");
    expect(res.body).toMatchObject({
      user: {
        email: expect.stringMatching(/maksym@gmail.com/),
        subscription: expect.stringMatching(/starter/),
      },
    });
  });
});
