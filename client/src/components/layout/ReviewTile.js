import React, { useState, useEffect } from "react"
import ReviewEditButton from "./ReviewEditButton";
import ReviewDeleteButton from "./ReviewDeleteButton"

const ReviewTile = ({ review, user, setPlanet, planet }) => {

  const [upVotes, setUpVotes] = useState(0)
  const [downVotes, setDownVotes] = useState(0)

  const getVotes = () => {
    if (review.votes !== undefined) {
      review.votes.forEach((vote) => {
        if (vote.voteValue === 1) {
          setUpVotes(upVotes + 1)
        } else if (vote.voteValue === -1) {
          setDownVotes(downVotes + 1)
        }
      })
    }
  }

  const voteClick = async (event) => {
    let voteDirection = 0
    if (event.currentTarget.value === 1) {
      voteDirection = 1
    }
    if (event.currentTarget.value === 2) {
      voteDirection = -1
    }

    const reviewBody = {
      currentReviewId: review.id,
      currentUserId: user.id,
      voteDirection: voteDirection,
    }

    const response = await fetch("/api/v1/votes", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(reviewBody),
    })

    const responseBody = await response.json()
  }

  useEffect(() => {
    getVotes()
  }, [])

  return(
    <div className="review">
    <li>{review.body}</li>
    <li>Rating: {review.rating}</li>
    <li onClick={voteClick} value="1">
        Up votes: {upVotes}
      </li>
      <li onClick={voteClick} value="2">
        Down votes: {downVotes}
      </li>
      { user ? <ReviewEditButton review={review} user={user} /> : null }
      { user ? <ReviewDeleteButton review={review} user={user} setPlanet={setPlanet} planet={planet}  /> : null }
    </div>
  )
}

export default ReviewTile
