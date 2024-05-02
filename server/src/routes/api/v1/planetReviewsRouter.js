import express from "express"
import objection from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js"
const { ValidationError } = objection
import { Review } from "../../../models/index.js"

const planetReviewsRouter = new express.Router({ mergeParams: true })

planetReviewsRouter.post("/", async (req, res) => {
  const requestBody = req.body
  const formInput = cleanUserInput(requestBody)
  const { body, userId, rating } = formInput
  const { planetId } = req.params
  try {
    const review = await Review.query().insertAndFetch({ body, planetId, userId, rating })
    return res.status(200).json({ review: review })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    } else {
      return res.status(500).json({ errors: error })
    }
  }
})

export default planetReviewsRouter