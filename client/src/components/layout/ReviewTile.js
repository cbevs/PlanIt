import React, { useState, useEffect } from "react"

const ReviewTile = ({ review, user }) => {
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

  return (
    <>
      <li>{review.body}</li>
      <li>Rating: {review.rating}</li>
      <li onClick={voteClick} value="1">
        Up votes: {upVotes}
      </li>
      <li onClick={voteClick} value="2">
        Down votes: {downVotes}
      </li>
    </>
  )
}

export default ReviewTile
