import express from "express"
import { Review } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import { ValidationError } from "objection"
const reviewsRouter = new express.Router()

reviewsRouter.get("/:id", async (req,res) => {
  const reviewId = req.params.id
  try {
    const review = await Review.query().findById(reviewId)
    res.status(200).json({ review: review })
  } catch (error) {
    res.status(500).json({ errors: error })
  }
})

reviewsRouter.patch("/:id", async (req, res) => {
  const requestBody = req.body
  const formInput = cleanUserInput(requestBody)
  const { body, rating, reviewId } = formInput
  try {
    const review = await Review.query().update({ body, rating }).where("id", reviewId)
    return res.status(200).json({ review: review })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    } else {
      return res.status(500).json({ errors: error })
    }
  }
})

reviewsRouter.delete("/:id", async (req,res) => {
  const reviewId = req.params.id
  try{
    await Vote.query().delete().where("reviewId", reviewId)
    await Review.query().deleteById(reviewId)
    return res.status(200).json({})
  } catch (error){
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

export default reviewsRouter