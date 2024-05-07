import express from "express"
import { Vote } from "./../../../models/index.js"

const votesRouter = new express.Router()

votesRouter.post("/", async (req, res) => {
  const { currentReviewId, currentUserId, voteDirection } = req.body

  let voteResponse = ""
  // TODO set review and user ids to integers.
  try {
    const newVote = await Vote.query()
      .where("userId", currentUserId)
      .where("reviewId", currentReviewId)
    if (newVote.length === 0) {
       await Vote.query().insert({
        userId: currentUserId,
        reviewId: currentReviewId,
        voteValue: voteDirection
      })

      voteResponse = "created vote"
    } else {
      if (newVote.voteValue === voteDirection) {
        await Vote.query().update({ voteValue: 0 }).where("id", newVote.id)
        voteResponse = "removed vote"
      } else if (newVote.voteValue === 1 && voteDirection === -1) {
        await Vote.query().updateAndFetch({ voteValue: voteDirection })
        voteResponse = "upvoted"
      } else if (newVote.voteValue === -1 && voteDirection === 1) {
        voteResponse = "downvoted"
        await Vote.query().updateAndFetch({ voteValue: voteDirection })
      }
    }
    res.status(200).json({ voteResponse })
  } catch (error) {
    console.log(error)
    res.status(500).json({})
  }
})

export default votesRouter
