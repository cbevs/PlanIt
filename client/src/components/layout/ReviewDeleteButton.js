import React, { useState } from "react";

const ReviewDeleteButton = ({ user, review, getPlanet }) => {
  
  const deleteReview = async (event) => {
    event.preventDefault()
    const reviewBody = {
      reviewId: review.id,
    }
    try {
      const response = await fetch(`/api/v1/planets/${review.planetId}/reviews/delete-review`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(reviewBody),
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
      }
      getPlanet()
    } catch (error) {
      console.error(error)
    }
  }

  return(
    <>
      { user.id === review.userId ? <button className="delete-button" onClick={deleteReview}>Delete Review</button> : null }
    </>
  )
}

export default ReviewDeleteButton