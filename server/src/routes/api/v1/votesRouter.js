import express from "express"
import { Vote, Review } from "./../../../models/index.js"

const votesRouter = new express.Router()
votesRouter.post("/", async (req, res) => {
  const { currentReviewId, voteDirection } = req.body
  let currentReviewIdInteger = parseInt(currentReviewId)
  let currentUserIdInteger = parseInt(req.user.id)
  let currentUserVote = voteDirection
  try {
    const newVote = await Vote.query().findOne({
      userId: currentUserIdInteger,
      reviewId: currentReviewId,
    })
    if (!newVote) {
      await Vote.query().insert({
        userId: currentUserIdInteger,
        reviewId: currentReviewIdInteger,
        voteValue: currentUserVote,
      })
    } else {
      if (newVote.voteValue === voteDirection) {
        currentUserVote = 0
        await Vote.query().updateAndFetchById(newVote.id, { voteValue: currentUserVote })
      } else {
        await Vote.query().updateAndFetchById(newVote.id, { voteValue: currentUserVote })
      }
    }
    const review = await Review.query().findById(currentReviewIdInteger)
    const voteTotals = await review.$voteCount()
    res.status(200).json({ voteCount: voteTotals, voteValue: currentUserVote })
  } catch (error) {
    console.log(error)
    res.status(500).json({})
  }
})
export default votesRouter
