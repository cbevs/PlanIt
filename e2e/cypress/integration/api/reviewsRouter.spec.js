/// <reference types="Cypress" />

context("HTTP requests to /api/v1/reviewsRouter" , () => {

  describe("GET /reviews/:id", () => {
    let reviewIdUrl
    const initialPlanet = { name: "Mercury", description: "Very close to the sun" }   
    const initialUsers = [{ email: "test@testsuite.com", cryptedPassword: "12345"}, { email: "test2@testsuite.com", cryptedPassword: "54321" }, { email: "test3@testsuite.com", cryptedPassword: "78965" }]
    let userId1
    let userId2
    let userId3

    beforeEach(() => { 
      cy.task("db:truncate", "Planet")
      cy.task("db:truncate", "User")
      cy.task("db:truncate", "Review")
      cy.task("db:insert", { modelName: "Planet", json: initialPlanet })
      cy.task("db:insert", { modelName: "User", json: initialUsers })
     
      cy.task("db:find", { modelName: "User", conditions: { email: "test@testsuite.com" }}).then((user) => {
        userId1 = user[0].id
      })
      cy.task("db:find", { modelName: "User", conditions: { email: "test2@testsuite.com" }}).then((user) => {
        userId2 = user[0].id
      })
      cy.task("db:find", { modelName: "User", conditions: { email: "test3@testsuite.com" }}).then((user) => {
        userId3 = user[0].id
      })

      cy.task("db:find", { modelName: "Planet", conditions: { name: "Mercury" }}).then((planet) => {
          const newReview = { body: "It was very toasty my whole stay. Great for a winter getaway!", rating: 4, planetId: planet[0].id, userId: userId1 }
          cy.task("db:insert", { modelName: "Review", json: newReview })
      }).then((review) => {
          reviewIdUrl = `/api/v1/reviews/${review.id}`
          const votes = [{ userId: parseInt(userId1), reviewId: parseInt(review.id), voteValue: 1 },
          { userId: parseInt(userId2), reviewId: parseInt(review.id), voteValue: 1 },
          { userId: parseInt(userId3), reviewId: parseInt(review.id), voteValue: -1 }]
          cy.task("db:insert", { modelName: "Vote", json: votes })
       })
    })

    it("When the header type is correct", () => {
      cy.request(reviewIdUrl)
      .its("headers")
      .its("content-type")
      .should("include", "application/json")
    })
  
    it("When the response status is correct", () => {
      cy.request(reviewIdUrl)
      .its("status")
      .should("be.equal", 200)
    })

    it("The review will show the correct properties at its URL/:id path", () => {
      cy.request(reviewIdUrl)
      .its("body")
      .its("review")
      .should("have.property", "body", "It was very toasty my whole stay. Great for a winter getaway!")
    })

    it("A review will have a voteCount nested object", () => {
        cy.request(reviewIdUrl)
        .its("body")
        .its("review")
        .should("have.property", "voteCount")
    })

    it("A review's voteCount object will have upVotes", () => {
      cy.request(reviewIdUrl)
      .its("body")
      .its("review")
      .its("voteCount")
      .should("have.property", "upVotes", 2)
    })

    it("A review's voteCount object will have downVotes", () => {
      cy.request(reviewIdUrl)
      .its("body")
      .its("review")
      .its("voteCount")
      .should("have.property", "downVotes", 1)
    })
  })

  describe("PATCH /reviews/:id", () => {
    let reviewIdUrl
    let reviewId
    const initialPlanet = { name: "Mercury", description: "Very close to the sun" }   
    const initialUsers = [{ email: "test@testsuite.com", cryptedPassword: "12345"}, { email: "test2@testsuite.com", cryptedPassword: "54321" }, { email: "test3@testsuite.com", cryptedPassword: "78965" }]
    let userId1
    let userId2
    let userId3
  
    beforeEach(() => { 
      cy.task("db:truncate", "Planet")
      cy.task("db:truncate", "User")
      cy.task("db:truncate", "Review")
      cy.task("db:insert", { modelName: "Planet", json: initialPlanet })        
      cy.task("db:insert", { modelName: "User", json: initialUsers })
       
      cy.task("db:find", { modelName: "User", conditions: { email: "test@testsuite.com" }}).then((user) => {
        userId1 = user[0].id
        })
      cy.task("db:find", { modelName: "User", conditions: { email: "test2@testsuite.com" }}).then((user) => {
         userId2 = user[0].id
        })
      cy.task("db:find", { modelName: "User", conditions: { email: "test3@testsuite.com" }}).then((user) => {
         userId3 = user[0].id
        })
  
      cy.task("db:find", { modelName: "Planet", conditions: { name: "Mercury" }}).then((planet) => {
        const newReview = { body: "It was very toasty my whole stay. Great for a winter getaway!", rating: 4, planetId: planet[0].id, userId: userId1 }
      cy.task("db:insert", { modelName: "Review", json: newReview })}).then((review) => {
        reviewIdUrl = `/api/v1/reviews/${review.id}`
        reviewId = review.id
        const votes = [{ userId: parseInt(userId1), reviewId: parseInt(review.id), voteValue: 1 },
        { userId: parseInt(userId2), reviewId: parseInt(review.id), voteValue: 1 },
        { userId: parseInt(userId3), reviewId: parseInt(review.id), voteValue: -1 }]
        cy.task("db:insert", { modelName: "Vote", json: votes })
       })
    })

    it("When the response status is correct", () => {
      cy.request({
        method: "PATCH",
        url: reviewIdUrl,
        body: { reviewId: reviewId, body: "I had a pleasant trip", rating: 3 }
      })
      .its("status").should("be.equal", 200)
     })

    it("When a review is updated, it's updates persist in the database", () => {
      cy.request({
        method: "PATCH",
        url: reviewIdUrl,
        body: { reviewId: reviewId, body: "I had a pleasant trip", rating: 3 }
      })
      cy.request(reviewIdUrl)
      .its("body")
      .its("review")
      .should("have.property", "body", "I had a pleasant trip")
      cy.request(reviewIdUrl)
      .its("body")
      .its("review")
      .should("have.property", "rating", 3)
    })

    describe("When a PATCH has a bad/malformed request body" , () => {
      it("Validation errors will show that rating is a required property", () => {
        cy.request({
          method: "PATCH",
          url: reviewIdUrl,
          body: { reviewId: reviewId, body: "I had a pleasant trip" },
          failOnStatusCode: false
        }).should((response) => {
          const errorsForNameField = response.body.errors.rating[0]
          expect(errorsForNameField.keyword).to.be.equal("required")
          expect(errorsForNameField.message).to.be.equal("must have required property 'rating'")
         })
       })

       it("The edited review will not be persisted into the database", () => {
        cy.request({
          method: "PATCH",
          url: reviewIdUrl,
          body: { reviewId: reviewId, body: "I had a pleasant trip", },
          failOnStatusCode: false
        })
        cy.request(reviewIdUrl)
        .its("body")
        .its("review")
        .should("have.property", "body", "It was very toasty my whole stay. Great for a winter getaway!")
       })
     })
  })

  describe("DELETE /reviews/:id", () => {
    let reviewIdUrl
    let reviewId
    const initialPlanet = { name: "Mercury", description: "Very close to the sun" }   
    const initialUsers = [{ email: "test@testsuite.com", cryptedPassword: "12345"}, { email: "test2@testsuite.com", cryptedPassword: "54321" }, { email: "test3@testsuite.com", cryptedPassword: "78965" }]
    let userId1
    let userId2
    let userId3
    let planetId
  
    before(() => { 
      cy.task("db:truncate", "Planet")
      cy.task("db:truncate", "User")
      cy.task("db:truncate", "Review")
      cy.task("db:insert", { modelName: "Planet", json: initialPlanet })        
      cy.task("db:insert", { modelName: "User", json: initialUsers })
       
      cy.task("db:find", { modelName: "User", conditions: { email: "test@testsuite.com" }}).then((user) => {
        userId1 = user[0].id
        })
      cy.task("db:find", { modelName: "User", conditions: { email: "test2@testsuite.com" }}).then((user) => {
         userId2 = user[0].id
        })
      cy.task("db:find", { modelName: "User", conditions: { email: "test3@testsuite.com" }}).then((user) => {
         userId3 = user[0].id
        })
  
      cy.task("db:find", { modelName: "Planet", conditions: { name: "Mercury" }}).then((planet) => {
        const newReview = { body: "It was very toasty my whole stay. Great for a winter getaway!", rating: 4, planetId: planet[0].id, userId: userId1 }
        planetId = planet[0].id
      cy.task("db:insert", { modelName: "Review", json: newReview })}).then((review) => {
        reviewIdUrl = `/api/v1/reviews/${review.id}`
        reviewId = review.id
        const votes = [{ userId: parseInt(userId1), reviewId: parseInt(review.id), voteValue: 1 },
        { userId: parseInt(userId2), reviewId: parseInt(review.id), voteValue: 1 },
        { userId: parseInt(userId3), reviewId: parseInt(review.id), voteValue: -1 }]
        cy.task("db:insert", { modelName: "Vote", json: votes })
       })
    })

    it("When the response status is correct", () => {
      cy.request({
        method: "DELETE",
        url: reviewIdUrl,
        body: { reviewId: reviewId }
      })
      .its("status").should("be.equal", 200)
    })

    it("When deleted, the review will no longer exist on the planet review array", () => {
      cy.request({
        method: "DELETE",
        url: reviewIdUrl,
        body: { reviewId: reviewId }
      })
      cy.request(`/api/v1/planets/${planetId}`)
      .its("body")
      .its("planet")
      .its("reviews")
      .should("have.length", 0)
    })
  })
})