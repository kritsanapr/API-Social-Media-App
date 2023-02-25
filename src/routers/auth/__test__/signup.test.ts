import request from "supertest";

import { app } from "../../../app";

it("return a 201 on successful signup", async () => {
  jest.setTimeout(60000);

  return request(app)
    .post("/signup")
    .send({
      email: "email@email.com",
      password: "1234567890",
    })
    .expect(201);
});

it("sets the cookie after successful signup", async () => {
  const res = request(app)
    .post("/signup")
    .send({
      email: "email@email.com",
      password: "1234567890",
    })
    .expect(201);

  expect(res.get("Set-Cookie")).toBeDefined();
});
