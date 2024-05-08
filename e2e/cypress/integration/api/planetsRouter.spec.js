/// <reference types="Cypress" />

context("/api/v1/planetsRouter" , () => {

  describe("GET /planets", () => {
  const initialPlanets = [{name:"Mercury", description:"very close to the sun"},{name:"Mars", description:"might have water"}]
    
  before(() =>{ 
    cy.task("db:truncate", "Planet")
    cy.task("db:insert", {modelName:"Planet", json:initialPlanets})
  })

  it("has the correct response type", () => {
    cy.request("/api/v1/planets")
    .its("headers")
    .its("content-type")
    .should("include", "application/json")
  })

  it("returns the correct status code", () =>{
    cy.request("/api/v1/planets")
    .its("status")
    .should("be.equal", 200)
  })

  it("loads two planets", () =>{
    cy.request("/api/v1/planets")
    .its("body")
    .its("planets")
    .should("have.length", 2)
  })

  it("has the right properties for a planet", () =>{
    cy.request("api/v1/planets")
    .its("body")
    .its("planets")
    .should((planet)=>{
      expect(planet[0]).to.have.property("name","Mercury")
      expect(planet[0]).to.have.property("description", "very close to the sun")
    })
  })
})

  describe("GET /planets/:id", () =>{
    const initialPlanet = {name:"Venus", description:"gas planet"}
    let showPageUrl

    before(() =>{ 
      cy.task("db:truncate", "Planet")
      cy.task("db:insert", {modelName:"Planet", json:initialPlanet})
      cy.task("db:find", {modelName:"Planet",conditions:{name:"Venus"}}).then((planet) => {
        showPageUrl = `/api/v1/planets/${planet[0].id}`
      })
    })

    it("has the correct response type", () => {
      cy.request(showPageUrl)
      .its("headers")
      .its("content-type")
      .should("include", "application/json")
    })
  
    it("returns the correct status code", () =>{
      cy.request(showPageUrl)
      .its("status")
      .should("be.equal", 200)
    })
  
    it("returns the correct data", () =>{
      cy.request(showPageUrl)
      .its("body")
      .its("planet")
      .should("have.property", "name","Venus")
    })
  })

  describe("POST /planets", () =>{
    beforeEach(() =>{ 
      cy.task("db:truncate", "Planet")
    })

    it("returns the correct status", () =>{
      cy.request("POST", "/api/v1/planets", { name: "earth"})
      .its("status")
      .should("equal", 201)
    })

    it("returns the newly persisted planet", () =>{
      cy.request("POST", "api/v1/planets", {name:"earth", description:"home sweet home"}).should(
        (response) => {
          expect(response.body.planet).to.have.property("name", "earth")
        }
      )
    })
  })

  describe("when posting unsuccessfully", () =>{
    beforeEach(() =>{ 
      cy.task("db:truncate", "Planet")
    })

    it("returns the right status code", () =>{
      cy.request({
        method: "POST",
        url: "/api/v1/planets",
        body: {name:""},
        failOnStatusCode: false
      })
      .its("status").should("be.equal", 422)
    })
    
    it("shows that name is a required property", () =>{
      cy.request({
        method: "POST",
        url: "/api/v1/planets",
        body: {name:""},
        failOnStatusCode: false
      }).should((response) => {
        const errorsForNameField = response.body.errors.name[0]
        expect(errorsForNameField.keyword).to.be.equal("required")
        expect(errorsForNameField.message).to.be.equal("must have required property 'name'")
        expect(errorsForNameField.params.missingProperty).to.be.equal("name")
      })
    })
  })
})