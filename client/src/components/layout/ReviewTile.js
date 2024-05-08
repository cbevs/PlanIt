import React from "react"
import ReviewEditButton from "./ReviewEditButton";
import ReviewDeleteButton from "./ReviewDeleteButton"

const ReviewTile = ({ review, user, setPlanet, planet }) => {
  const voteClick = async (event) => {
    if (user){
      const reviewBody = {
        currentReviewId: review.id,
        voteDirection: event.currentTarget.value,
      }
  
      const response = await fetch("/api/v1/votes", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(reviewBody),
      })
  
      const responseBody = await response.json()
      const newVotes = responseBody.currentUserVoteValue
      
      const updatedReviews = planet.reviews.map(existingReview => {
        if (existingReview.id === review.id) {
          return {...existingReview, voteCount: { upVotes: newVotes.upVotes, downVotes: newVotes.downVotes }}
        } else {
          return existingReview
        }
      })
      setPlanet({...planet, reviews: updatedReviews})
    }
  }

  return(
    <div className="review">
    <li>{review.body}</li>
    <li>Rating: {review.rating}</li>
    <li onClick={voteClick} value="1">
        Up votes: {review.voteCount.upVotes}
      </li>
      <li onClick={voteClick} value="-1">
        Down votes: {review.voteCount.downVotes}
      </li>
      { user ? <ReviewEditButton review={review} user={user} /> : null }
      { user ? <ReviewDeleteButton review={review} user={user} setPlanet={setPlanet} planet={planet}  /> : null }
    </div>
  )
}

export default ReviewTile
