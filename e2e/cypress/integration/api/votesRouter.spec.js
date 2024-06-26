/// <reference types="Cypress" />

context("HTTP requests to /api/v1/votesRouter" , () => {

  describe("POST /votes", () => {
    
    const initialPlanet = { name: "Mercury", description: "Very close to the sun" }   
    const initialUser = { email: "test@testsuite.com", password: "12345" }
    let userId
    let reviewId

    beforeEach(() => { 
      cy.task("db:truncate", "Planet")
      cy.task("db:truncate", "User")
      cy.task("db:truncate", "Vote")
      cy.task("db:truncate", "Review")
      cy.task("db:insert", { modelName: "Planet", json: initialPlanet })
      cy.task("db:insert", { modelName: "User", json: initialUser })
     
      cy.task("db:find", { modelName: "User", conditions: { email: "test@testsuite.com" }}).then((user) => {
        userId = user[0].id
      })

      cy.task("db:find", { modelName: "Planet", conditions: { name: "Mercury" }}).then((planet)  => {
          const newReview = { body: "It was very toasty my whole stay. Great for a winter getaway!", rating: 4, planetId: planet[0].id, userId: userId }
          cy.task("db:insert", { modelName: "Review", json: newReview })
      }).then((review) => {
          reviewId = review.id
       })
    })

    it("When the response status is correct", () => {
      cy.request({
        method: "POST",
        url: "/api/v1/user-sessions",
        body: { email: "test@testsuite.com", password: "12345" }
      })
      cy.request({
        method: "POST",
        url: "/api/v1/votes",
        body: { currentReviewId: reviewId, voteDirection: 1 }
      })
      .its("status").should("be.equal", 200)
    })

    it("When a vote is entered by a user", () => {
      cy.request({
        method: "POST",
        url: "/api/v1/user-sessions",
        body: { email: "test@testsuite.com", password: "12345" }
      })
      cy.request({
        method: "POST",
        url: "/api/v1/votes",
        body: { currentReviewId: reviewId, voteDirection: 1 }
      })
      cy.request(`/api/v1/reviews/${reviewId}`)
      .its("body")
      .its("review")
      .its("voteCount")
      .its("upVotes")
      .should("be.equal", 1)
    })

    it("If a vote already exists for a user, it will be removed upon them voting the same direction", () => {
      cy.request({
        method: "POST",
        url: "/api/v1/user-sessions",
        body: { email: "test@testsuite.com", password: "12345" }
      })
      cy.request({
        method: "POST",
        url: "/api/v1/votes",
        body: { currentReviewId: reviewId, voteDirection: 1 }
      })
      cy.request({
        method: "POST",
        url: "/api/v1/votes",
        body: { currentReviewId: reviewId, voteDirection: 1 }
      })
      cy.request(`/api/v1/reviews/${reviewId}`)
      .its("body")
      .its("review")
      .its("voteCount")
      .its("upVotes")
      .should("be.equal", 0)
    })
  })
})