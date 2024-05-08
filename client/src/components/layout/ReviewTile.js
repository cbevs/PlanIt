import React, { useState } from "react"
import ReviewEditButton from "./ReviewEditButton"
import ReviewDeleteButton from "./ReviewDeleteButton"
const ReviewTile = ({ review, user, setPlanet, planet }) => {
  const voteClick = async (event) => {
    if (user) {
      const reviewBody = {
        currentReviewId: review.id,
        voteDirection: parseInt(event.currentTarget.getAttribute("data-vote")),
      }
      const response = await fetch("/api/v1/votes", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(reviewBody),
      })
      const responseBody = await response.json()
      const newVotes = responseBody.voteCount
      const updatedReviews = planet.reviews.map((existingReview) => {
        if (existingReview.id === review.id) {
          return {
            ...existingReview,
            voteCount: { upVotes: newVotes.upVotes, downVotes: newVotes.downVotes },
          }
        } else {
          return existingReview
        }
      })
      setPlanet({ ...planet, reviews: updatedReviews })
    }
  }
  return (
    <div className="review">
      <li>
        {review.body}
      </li>
      <li>
        Rating: {review.rating}
      </li>
      <li className="vote">
        Up votes: {review.voteCount.upVotes}
        <i onClick={voteClick} className="fas fa-arrow-up up-vote" data-vote="1"></i>
      </li>
      <li className="vote">
        Down votes: {review.voteCount.downVotes}
        <i onClick={voteClick} className="fas fa-arrow-down down-vote" data-vote="-1"></i>
      </li>
      {user ? <ReviewEditButton review={review} user={user} /> : null}
      {user ? (
        <ReviewDeleteButton review={review} user={user} setPlanet={setPlanet} planet={planet} />
      ) : null}
    </div>
  )
}
export default ReviewTile