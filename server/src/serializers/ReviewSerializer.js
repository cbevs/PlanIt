class ReviewSerializer {
  static getReviewDetails(Review) {
    const allowedAttributes = ["id", "body", "planetId", "userId"]
    let serializedReview = {}
    for (const attribute of allowedAttributes) {
      serializedReview[attribute] = Review[attribute]
    }
    return serializedReview
  }
}

export default ReviewSerializer