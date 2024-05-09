/// <reference types="Cypress" />

context("HTTP requests to /api/v1/planetsRouter" , () => {

  describe("GET /planets", () => {
  const initialPlanets = [{ name: "Mercury", description: "Very close to the sun" }, { name: "Mars", description: "Might have water" }]
    
  before(() => { 
    cy.task("db:truncate", "Planet")
    cy.task("db:insert", { modelName: "Planet", json: initialPlanets })
  })

  it("When the header type is correct", () => {
    cy.request("/api/v1/planets")
    .its("headers")
    .its("content-type")
    .should("include", "application/json")
  })

  it("When the response status is correct", () => {
    cy.request("/api/v1/planets")
    .its("status")
    .should("be.equal", 200)
  })

  it("When there are two planets in the database", () => {
    cy.request("/api/v1/planets")
    .its("body")
    .its("planets")
    .should("have.length", 2)
  })

  it("Each planet will have the correct attributes", () => {
    cy.request("api/v1/planets")
    .its("body")
    .its("planets")
    .should((planet) => {
      expect(planet[0]).to.have.property("name", "Mercury")
      expect(planet[0]).to.have.property("description", "Very close to the sun")
    })
  })
})

  describe("GET /planets/:id", () => {
    const initialPlanet = { name: "Venus", description: "Gas planet" }
    const initialUser = [{ email: "test@testsuite.com", cryptedPassword: "12345"}, { email: "test2@testsuite.com", cryptedPassword: "54321" }, { email: "test3@testsuite.com", cryptedPassword: "78965" }]
    let showPageUrl
    let userId1
    let userId2
    let userId3

    before(() => { 
      cy.task("db:truncate", "Planet")
      cy.task("db:truncate", "User")
      cy.task("db:truncate", "Review")
      cy.task("db:insert", { modelName: "Planet", json: initialPlanet })
      cy.task("db:insert", { modelName: "User", json: initialUser })
     
      cy.task("db:find", { modelName: "User", conditions: { email: "test@testsuite.com" }}).then((user) => {
        userId1 = user[0].id
      })
      cy.task("db:find", { modelName: "User", conditions: { email: "test2@testsuite.com" }}).then((user) => {
        userId2 = user[0].id
      })
      cy.task("db:find", { modelName: "User", conditions: { email: "test3@testsuite.com" }}).then((user) => {
        userId3 = user[0].id
      })

      cy.task("db:find", { modelName: "Planet", conditions: { name: "Venus" }}).then((planet)  => {
          const newReview = { body: "Very cloudy conditions my whole stay.", rating: 2, planetId: planet[0].id, userId: userId1 }
          cy.task("db:insert", { modelName: "Review", json: newReview })
      }).then((review) => {
          const votes = [{ userId: parseInt(userId1), reviewId: parseInt(review.id), voteValue: 1 },
          { userId: parseInt(userId2), reviewId: parseInt(review.id), voteValue: 1 },
          { userId: parseInt(userId3), reviewId: parseInt(review.id), voteValue: -1 }]
          cy.task("db:insert", { modelName: "Vote", json: votes })
      })

      cy.task("db:find", { modelName: "Planet", conditions: { name:"Venus" }}).then((planet) => {
        showPageUrl = `/api/v1/planets/${planet[0].id}`
      })
    })

    it("When the header type is correct", () => {
      cy.request(showPageUrl)
      .its("headers")
      .its("content-type")
      .should("include", "application/json")
    })
  
    it("When the response status is correct", () => {
      cy.request(showPageUrl)
      .its("status")
      .should("be.equal", 200)
    })
  
    it("The planet will have the correct name", () => {
      cy.request(showPageUrl)
      .its("body")
      .its("planet")
      .should("have.property", "name", "Venus")
    })

    it("A planet will have any reviews associated with it as a nested object", () => {
      cy.request(showPageUrl)
      .its("body")
      .its("planet")
      .its("reviews")
      .should("have.length", 1)
    })

    it("A review has the correct information", () => {
      cy.request(showPageUrl)
      .its("body")
      .its("planet")
      .its("reviews")
      .should((review) => {
      expect(review[0]).to.have.property("body", "Very cloudy conditions my whole stay.")
      expect(review[0]).to.have.property("rating", 2)
      })
    })

    it("A review has a voteCount property and has the correct upVotes and downVotes properties", () => {
      cy.request(showPageUrl)
      .its("body")
      .its("planet")
      .its("reviews")
      .should((review) => {
        expect(review[0]).to.have.property("voteCount")
        expect(review[0].voteCount).to.have.property("upVotes", 2)
        expect(review[0].voteCount).to.have.property("downVotes", 1)
      })
    })
  })

  describe("POST /planets", () => {
    beforeEach(() => { 
      cy.task("db:truncate", "Planet")
    })

    it("When the response status is correct", () => {
      cy.request("POST", "/api/v1/planets", { name: "Earth" })
      .its("status")
      .should("equal", 201)
    })

    it("It will return the newly persisted planet", () => {
      cy.request("POST", "api/v1/planets", { name:"Earth", description:" Home sweet home" }).should(
        (response) => {
          expect(response.body.planet).to.have.property("name", "Earth")
        }
      )
    })
  })

  describe("When a POST request is unsuccessful", () => {
    beforeEach(() => { 
      cy.task("db:truncate", "Planet")
    })

    it("When the response status is unprocessable content (validation error)", () => {
      cy.request({
        method: "POST",
        url: "/api/v1/planets",
        body: { name: "" },
        failOnStatusCode: false
      })
      .its("status").should("be.equal", 422)
    })
    
    it("Validation errors will show that name is a required property", () => {
      cy.request({
        method: "POST",
        url: "/api/v1/planets",
        body: { name: "" },
        failOnStatusCode: false
      }).should((response) => {
        const errorsForNameField = response.body.errors.name[0]
        expect(errorsForNameField.keyword).to.be.equal("required")
        expect(errorsForNameField.message).to.be.equal("must have required property 'name'")
      })
    })

    it("Validation errors will show that a planet name must be unique", () => {
      cy.request({
        method: "POST",
        url: "/api/v1/planets",
        body: { name: "Earth" },
        failOnStatusCode: false
      })
      cy.request({
        method: "POST",
        url: "/api/v1/planets",
        body: { name: "Earth" },
        failOnStatusCode: false
      }).should((response => {
        const errorsForNameField = response.body.errors.name[0]
        expect(errorsForNameField.keyword).to.be.equal("unique")
        expect(errorsForNameField.message).to.be.equal("name already in use.")
      }))
    })
  })
})