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

export default planetsRouter