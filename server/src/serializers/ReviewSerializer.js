class ReviewSerializer {
  static async getReviewDetails(review) {
    const allowedAttributes = ["id", "body", "planetId", "userId", "rating"]
    let serializedReview = {}
    for (const attribute of allowedAttributes) {
      serializedReview[attribute] = review[attribute]
    }

    serializedReview.voteCount = await review.$voteCount()
    return serializedReview
  }
}

export default ReviewSerializer