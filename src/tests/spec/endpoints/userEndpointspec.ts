import supertest from "supertest";
import  app  from "../../../server";

const req = supertest(app);
let user_id: number;
let token: string;

describe("User Endpoints", function () {
  describe("/users request", function () {
    it("gets the api endpoint /api/users", async () => {
      const res = await req.post("/api/users").send({
        user_name: "test121",
        first_name: "test121",
        last_name: "test121",
        email: "test121@hotmail.com",
        password: "test121"
      });
      user_id = res.body.id;
      expect(res.status).toBe(200);
    });

    it("gets the api endpoint /users", async () => {
      //Get authorization token
      const signinRes = await req
        .post("/api/users/authenticate")
        .send({ first_name: "test121", password: "test121" });
        token = signinRes.body.data.token
      //Send the request
      const res = await req
        .get("/api/users")
        .set({ Authorization: "Bearer " + token });
      expect(res.status).toBe(200);
    });

    it("gets the api endpoint /api/users/authenticate", async () => {
      const res = await req
        .post("/api/users/authenticate")
        .send({ first_name: "test121", password: "test121" });
      expect(res.status).toBe(200);
    });
    afterAll(async () => {
      await req
        .delete('/api/users')
    });
  });
});