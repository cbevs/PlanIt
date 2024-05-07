import express from "express"
import { Vote, Review } from "./../../../models/index.js"


const votesRouter = new express.Router()
votesRouter.post("/", async (req, res) => {
  const { currentReviewId,  voteDirection } = req.body
  let currentReviewIdInteger = parseInt(currentReviewId)
  let newVoteDirection = 0
  try {
    const newVote = await Vote.query().findOne({ userId: req.user.id, reviewId: currentReviewId  })
   
    if (!newVote) {
       await Vote.query().insert({
        userId: req.user.id,
        reviewId: currentReviewIdInteger,
        voteValue: voteDirection
      })
    } else {
      if (newVote.voteValue === voteDirection) {
        newVoteDirection = 0
      } 
      await Vote.query().updateAndFetchById(newVote.id, { voteValue: newVoteDirection })
    }
    const review = await Review.query().findById(currentReviewIdInteger)
    
    const voteTotals = await review.$voteCount()
    console.log(voteTotals)
    
    res.status(200).json({ currentUserVoteValue: voteTotals })
  } catch (error) {
    console.log(error)
    res.status(500).json({})
  }
})
export default votesRouter