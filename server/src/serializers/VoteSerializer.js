class VoteSerializer {

  getDetails(vote){
    const allowedAttributes = ["id", "userId", "reviewId", "voteValue"]
    let serializedVote = {}
    for (const attribute of allowedAttributes){
      serializedVote[attribute] = vote[attribute]
    }
    return serializedVote
  }
}

export default VoteSerializer