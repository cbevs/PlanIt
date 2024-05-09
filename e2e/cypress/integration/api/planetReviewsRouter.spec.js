/// <reference types="Cypress" />

context("As a user sending HTTP requests to /api/v1/planetReviewsRouter", () => {

  describe("If I send a POST request to /planets/:planetId/reviews", () => {
    
    const initialPlanet = { name: "Mercury", description: "Very close to the sun" }   
    const initialUser = { email: "test@testsuite.com", password: "12345" }
    let userId
    let planetId
    let reviewPostUrl

    beforeEach(() => { 
      cy.task("db:truncate", "Planet")
      cy.task("db:truncate", "User")
      cy.task("db:truncate", "Review")
      cy.task("db:insert", { modelName: "Planet", json: initialPlanet })
      cy.task("db:insert", { modelName: "User", json: initialUser })
     
      cy.task("db:find", { modelName: "User", conditions: { email: "test@testsuite.com" }}).then((user) => {
        userId = user[0].id
      })

      cy.task("db:find", { modelName: "Planet", conditions: { name: "Mercury" }}).then((planet) => {
        planetId = planet[0].id
        reviewPostUrl = `/api/v1/planets/${planet[0].id}/reviews`
      })
    })

    it("I will receive the correct status code", () => {
      cy.request({
        method: "POST",
        url: reviewPostUrl,
        body: { body: "A bit too toasty for my liking", planetId: planetId, userId: userId, rating: 3 }
      })
      .its("status").should("be.equal", 200)
    })

    it("The new review will persist into the database", () => {
      cy.request({
        method: "POST",
        url: reviewPostUrl,
        body: { body: "A bit too toasty for my liking", planetId: planetId, userId: userId, rating: 3 }
      })
      cy.request(`/api/v1/planets/${planetId}`)
      .its("body")
      .its("planet")
      .its("reviews")
      .should("have.length", 1)
    })

    it("The new review will include the body and rating", () => {
      cy.request({
        method: "POST",
        url: reviewPostUrl,
        body: { body: "A bit too toasty for my liking", planetId: planetId, userId: userId, rating: 3 }
      })
      cy.request(`/api/v1/planets/${planetId}`)
      .its("body")
      .its("planet")
      .its("reviews")
      .should((review) => {
        expect(review[0]).to.have.property("body", "A bit too toasty for my liking")
        expect(review[0]).to.have.property("rating", 3)
      })
    })

    it("I will get a validation error if the review does not have a rating", () => {
      cy.request({
        method: "POST",
        url: reviewPostUrl,
        body: { body: "A bit too toasty for my liking", planetId: planetId, userId: userId },
        failOnStatusCode: false
      }).should((response) => {
        const errorsForNameField = response.body.errors.rating[0]
        expect(errorsForNameField.keyword).to.be.equal("required")
        expect(errorsForNameField.message).to.be.equal("must have required property 'rating'")
      })
    })
  })
})