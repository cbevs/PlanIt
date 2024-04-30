import express from "express";
import { Planet } from "../../../models/index.js";
import objection from "objection";
import cleanUserInput from "../../../services/cleanUserInput.js";

const { ValidationError } = objection;

const planetsRouter = new express.Router();

planetsRouter.get("/", async (req, res) => {
  try {
    const planets = await Planet.query();
    res.status(200).json({ planets: planets });
  } catch (err) {
    res.status(500).json({ errors: err });
  }
});

planetsRouter.post("/", async (req, res) => {
  const { body } = req;
  const formInput = cleanUserInput(body);
  const { name, description } = formInput;

  try {
    const newPlanetEntry = await Planet.query().insertAndFetch({ name, description });
    res.status(200).json({ planet: newPlanetEntry });
  } catch (error) {
    console.log(error);
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    } else {
      return res.status(500).json({ errors: error });
    }
  }
});

export default planetsRouter;
