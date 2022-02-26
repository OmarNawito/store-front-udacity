import supertest from "supertest";
import  app  from "../../../server";

const req = supertest(app);
let user_id: number;

describe("User Endpoints", function () {
  describe("/users request verbs", function () {
    it("gets the api endpoint /api/users", async () => {
      const res = await req.post("/api/users").send({
        user_name: "omar223",
        first_name: "omar223",
        last_name: "nawito223",
        email: "o_mohsen12223@hotmail.com",
        password: "1234567891"
      });
      user_id = res.body.id;
      expect(res.status).toBe(200);
    });

    it("gets the api endpoint /users", async () => {
      //Get authorization token
      const signinRes = await req
        .post("/api/users/authenticate")
        .send({ first_name: "omar223", password: "1234567891" });
      //Send the request
      const res = await req
        .get("/api/users")
        .set({ Authorization: "bearer " + signinRes.body.data.token });
      expect(res.status).toBe(200);
    });

    it("gets the api endpoint /api/users/authenticate", async () => {
      const res = await req
        .post("/api/users/authenticate")
        .send({ first_name: "omar223", password: "1234567891" });
      expect(res.status).toBe(200);
    });
  });
});