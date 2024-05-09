import React, { useEffect, useReducer, useState } from "react"
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
      const newVoteValue = responseBody.voteValue
      const updatedReviews = planet.reviews.map((existingReview) => {
        if (existingReview.id === review.id) {
          return {
            ...existingReview,
            voteCount: { upVotes: newVotes.upVotes, downVotes: newVotes.downVotes },
            currentUserVote: { voteValue: newVoteValue },
          }
        } else {
          return existingReview
        }
      })
      setPlanet({ ...planet, reviews: updatedReviews })
    }
  }

  const currentUserVoteValue = review.currentUserVote.voteValue
  let upVotedClass = ""
  let downVotedClass = ""
  if (currentUserVoteValue === 1) {
    upVotedClass = "up-vote-selected"
  } else if (currentUserVoteValue === -1) {
    downVotedClass = "down-vote-selected"
  }

  return (
    <div className="review">
      <li>{review.body}</li>
      <li>Rating: {review.rating}</li>
      <li className="vote">
        Up votes: {review.voteCount.upVotes}
<<<<<<< HEAD
        <i onClick={voteClick} className={`fas fa-arrow-up upVote ${upVotedClass}`} data-vote="1"></i>
      </li>
      <li className="vote">
        Down votes: {review.voteCount.downVotes}
        <i onClick={voteClick} className={`fas fa-arrow-down downVote ${downVotedClass}`} data-vote="-1"></i>
=======
        <i onClick={voteClick} className="fas fa-arrow-up up-vote" data-vote="1"></i>
      </li>
      <li className="vote">
        Down votes: {review.voteCount.downVotes}
        <i onClick={voteClick} className="fas fa-arrow-down down-vote" data-vote="-1"></i>
>>>>>>> e8094b53e9da91890dc6eeb9a16105df094cf8a2
      </li>
      {user ? <ReviewEditButton review={review} user={user} /> : null}
      {user ? (
        <ReviewDeleteButton review={review} user={user} setPlanet={setPlanet} planet={planet} />
      ) : null}
    </div>
  )
}
export default ReviewTile
