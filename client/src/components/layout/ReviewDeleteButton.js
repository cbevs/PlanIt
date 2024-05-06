import React, { useState } from "react";

const ReviewDeleteButton = ({ user, review, setPlanet, planet }) => {
  const deleteReview = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch(`/api/v1/reviews/${review.id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
        })
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
      }

      const newReviewArray = planet.reviews.filter(reviewObject => {
        if (review.id !== reviewObject.id ) {
          return reviewObject
        }
      })

      setPlanet({ ...planet, reviews: newReviewArray })
      
    
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