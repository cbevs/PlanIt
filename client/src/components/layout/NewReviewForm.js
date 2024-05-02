import React, { useState } from "react"

const NewReviewForm = ({ postReview }) => {
  const [newReview, setNewReview] = useState({
    reviewText: ""
  })

  const handleInputChange = event => {
    setNewReview({
      ...newReview,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    postReview(newReview)
    clearForm()
  }

  const clearForm = () => {
    setNewReview({
      reviewText: ""
    })
  }

  return (
    <div>
      <h1>Add a Review to this Planet</h1>
      <form onSubmit={handleSubmit} className="new-review-form">
        <label>
          Review:
          <input
            type="text"
            name="reviewText"
            onChange={handleInputChange}
            value={newReview.reviewText}
            className="form-input"
          />
        </label>
        <input type="submit" value="Submit Review" />
      </form>
    </div>
  )
}

export default NewReviewForm
