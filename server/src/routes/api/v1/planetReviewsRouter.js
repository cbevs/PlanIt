import express from "express"
import objection from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js"
const { ValidationError } = objection
import { Review } from "../../../models/index.js"

const planetReviewsRouter = new express.Router({ mergeParams: true })

planetReviewsRouter.post("/", async (req, res) => {
  const { body } = req
  const formInput = cleanUserInput(body)
  const { reviewText } = formInput
  const { planetId}  = req.params
  console.log(req.params)

  try {
    const review = await Review.query().insertAndFetch({ reviewText, planetId })
    console.log(review)

    return res.status(200).json({ review: review })
  } catch (error) {
    console.log(error)
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    } else {
      return res.status(500).json({ errors: error })
    }
  }
})








export default planetReviewsRouter