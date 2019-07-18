import chai from "chai";
import chaiHTTP from "chai-http";
import app from "../app";

chai.use(chaiHTTP);
const { expect } = chai;
const baseUrl = "/api/v1/property";

describe("Property endpoints", function() {
  this.timeout(0);
  let userToken;
  let adminToken;
  const invalidToken = "Bearer xxxxxxxxxxxxxxx123456";
  before("signin to get access token", async () => {
    const defaultUser = {
      email: "john.user@gmail.com",
      password: "secret"
    };
    const admin = {
      email: "chinwe.admin@gmail.com",
      password: "secret"
    };
    const userRes = await chai
      .request(app)
      .post("/api/v1/auth/signin")
      .send(defaultUser);
    const token1 = userRes.body.data.token;
    userToken = `Bearer ${token1}`;
    const adminRes = await chai
      .request(app)
      .post("/api/v1/auth/signin")
      .send(admin);
    const token2 = adminRes.body.data.token;
    adminToken = `Bearer ${token2}`;
  });
  describe("Create property ad", () => {
    const defaultProperty = {
      state: "Lagos",
      price: "1500000",
      address: "No 1, Joy avenu, Lagos, Nigeria",
      city: "Lagos",
      type: "2_bedroom",
      image_url: "main_image_url.com"
    };
    it("It should ensure that token is provided", done => {
      chai
        .request(app)
        .post(`${baseUrl}`)
        .send(defaultProperty)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.error).to.eql("You must log in to continue");
          done();
        });
    });
    it("It should ensure that the provided token is valid", done => {
      chai
        .request(app)
        .post(`${baseUrl}`)
        .send(defaultProperty)
        .set("authorization", invalidToken)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.error).to.eql(
            "Invalid token, kindly log in to continue"
          );
          done();
        });
    });
    it("It should successfully create a property ad", done => {
      chai
        .request(app)
        .post(`${baseUrl}`)
        .send(defaultProperty)
        .set("authorization", userToken)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property("data");
          expect(res.body.data).to.be.an("object");
          done();
        });
    });
  });

  describe("Get all propertys Ads", () => {
    it("It should return all property Ads sold or not", done => {
      chai
        .request(app)
        .get(`${baseUrl}`)
        .set("authorization", adminToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("data");
          expect(res.body.data).to.be.an("array");
          done();
        });
    });
  });
  describe("Update property ad status", () => {
    let propertyId;
    const invalidPropertyId = "1000";
    const newStatus = { status: "sold" };
    const invalidStatus = { status: "lorem" };
    let wrongPropertyOwnerToken;
    before("Create a property ad to be updated", async () => {
      const defaultProperty = {
        state: "Jos",
        price: "1400000",
        address: "No 1, Mary avenu, Lagos, Nigeria",
        city: "Lagos",
        type: "2_bedroom",
        image_url: "main_image_url.com"
      };
      const user = {
        first_name: "Foo",
        last_name: "Bar",
        email: "foo@bar.com",
        password: "sha1$fc8dc1d2$1$036ea46b75d0017897c09a4022c90787e5287778",
        phone_number: "08145776655",
        address: "Ajao Estate"
      };
      const property = await chai
        .request(app)
        .post(`${baseUrl}`)
        .send(defaultProperty)
        .set("authorization", userToken);
      propertyId = property.body.data.id;
      const wrongUser = await chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(user);
      wrongPropertyOwnerToken = `Bearer ${wrongUser.body.data.token}`;
    });
;
    it("It should successfully update property ad status", done => {
      chai
        .request(app)
        .patch(`${baseUrl}/${propertyId}/sold`)
        .send(newStatus)
        .set("authorization", userToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("data");
          expect(res.body.data).to.be.an("object");
          done();
        });
    });
  });

  describe("Update property ad price", () => {
    let propertyId;
    const newPrice = { price: "1200000" };
    const invalidPrice = { price: "1200000" };
    before("Create a property ad to be updated", async () => {
      const defaultProperty = {
        state: "Jos",
        price: "1400000",
        address: "No 1, Mary avenu, Lagos, Nigeria",
        city: "Lagos",
        type: "2_bedroom",
        image_url: "main_image_url.com"
      };
      const property = await chai
        .request(app)
        .post(`${baseUrl}`)
        .send(defaultProperty)
        .set("authorization", userToken);
      propertyId = property.body.data.id;
      it("It should ensure that price is provided", done => {
        chai
          .request(app)
          .patch(`${baseUrl}/${propertyId}/price`)
          .send({ price: "" })
          .set("authorization", userToken)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.errors[0]).to.eql("price is required");
            expect(res.body.errors[1]).to.eql("price must be a valid number");
            done();
          });
      });

      it("It should return invalid price error", done => {
        chai
          .request(app)
          .patch(`${baseUrl}/${propertyId}/price`)
          .send(invalidPrice)
          .set("authorization", userToken)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.errors[0]).to.eql("price must be a valid number");
            done();
          });
      });

      it("It should successfully update property ad price", done => {
        chai
          .request(app)
          .patch(`${baseUrl}/${propertyId}/price`)
          .send(newPrice)
          .set("authorization", userToken)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property("data");
            expect(res.body.data).to.be.an("object");
            done();
          });
      });
    });
    describe("Update property by status", () => {
    });

    describe("Get a specific property by id", () => {
      const propertyId = 1;
      const invalidPropertyId = 686;
      it("It should return a specific property with the provided id", done => {
        chai
          .request(app)
          .get(`${baseUrl}/${propertyId}`)
          .set("authorization", userToken)
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body).to.have.property("error");
            expect(res.body).to.be.an("object");
            expect(res.body.error).to.eql(
              `Property with id: ${propertyId} does not exist`
            );
            done();
          });
      });
      it("It should return no property exist with the provided id", done => {
        chai
          .request(app)
          .get(`${baseUrl}/${invalidPropertyId}`)
          .set("authorization", userToken)
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body).to.have.property("error");
            expect(res.body.error).to.eql(
              `Property with id: ${invalidPropertyId} does not exist`
            );
            done();
          });
      });
    });
  });
});
