import express from "express"
import { Planet } from "../../../models/index.js"
const planetsRouter = new express.Router()

planetsRouter.get("/", async (req, res) => {
  try {
    const planets = await Planet.query()
    res.status(200).json({ planets: planets })
  } catch(err) {
    res.status(500).json({ errors: err })        
  }
})

planetsRouter.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const planet = await Planet.query().findById(id)
    return res.status(200).json({ planet: planet })
  } catch(error) {
    return res.status(500).json({ errors: error })
  }
})

export default planetsRouter