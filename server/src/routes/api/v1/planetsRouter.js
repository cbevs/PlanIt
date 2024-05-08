import express from "express"
import { Planet } from "../../../models/index.js"
import objection from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js"
import planetReviewsRouter from "./planetReviewsRouter.js"
import PlanetSerializer from "../../../serializers/PlanetSerializer.js"

const { ValidationError } = objection

const planetsRouter = new express.Router()

planetsRouter.use("/:planetId/reviews", planetReviewsRouter)

planetsRouter.get("/", async (req, res) => {
  try {
    const planets = await Planet.query()
    const serializedPlanets = planets.map((planet) => {
      return PlanetSerializer.getPlanetDetails(planet)
    })
    res.status(200).json({ planets: serializedPlanets })
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: err })
  }
})

planetsRouter.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const planet = await Planet.query().findById(id)
    const serializedPlanet = await PlanetSerializer.getPlanetWithReviews(planet)
    return res.status(200).json({ planet: serializedPlanet })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

planetsRouter.post("/", async (req, res) => {
  const { body } = req
  const formInput = cleanUserInput(body)
  const { name, description } = formInput

  try {
    const newPlanetEntry = await Planet.query().insertAndFetch({ name, description })
    res.status(201).json({ planet: newPlanetEntry })
  } catch (error) {
    console.log(error)
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    } else {
      return res.status(500).json({ errors: error })
    }
  }
})

export default planetsRouter
