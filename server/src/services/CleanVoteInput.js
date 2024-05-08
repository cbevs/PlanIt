const CleanVoteInput = (vote) => {
  Object.keys(vote).forEach((field) => {
    if (vote[field] === "") {
      delete vote[field]
    }
    (vote.userId)
    const userIdInteger = parseInt(vote.userId)
    const reviewIdInteger = parseInt(vote.userId)
    vote.userId = userIdInteger
    vote.reviewId = reviewIdInteger
  })
  
  return vote
}

export default CleanVoteInput
