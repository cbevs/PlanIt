class ReviewSerializer {
  static async getReviewDetails(review, currentUser) {
    const allowedAttributes = ["id", "body", "planetId", "userId", "rating"]
    let serializedReview = {}
    for (const attribute of allowedAttributes) {
      serializedReview[attribute] = review[attribute]
    }
    serializedReview.voteCount = await review.$voteCount()
    serializedReview.currentUserVote = await review
      .$relatedQuery("votes")
      .findOne({ userId: currentUser.id, reviewId: review.id })
    if (serializedReview.currentUserVote === undefined) {
      serializedReview.currentUserVote = 0
    }
    return serializedReview
  }
}

export default ReviewSerializer