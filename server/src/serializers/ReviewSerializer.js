import { Vote } from "../models/index.js"

class ReviewSerializer {
  static async getReviewDetails(review, currentUser) {
    const allowedAttributes = ["id", "body", "planetId", "userId", "rating"]
    let serializedReview = {}
    for (const attribute of allowedAttributes) {
      serializedReview[attribute] = review[attribute]
    }
    serializedReview.voteCount = await review.$voteCount()
    const currentUserVoteData = await Vote.query().findOne({ userId: currentUser.id, reviewId: review.id })
    serializedReview.currentUserVote = currentUserVoteData.voteValue
    return serializedReview
  }
}

export default ReviewSerializer