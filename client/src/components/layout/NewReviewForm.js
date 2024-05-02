import React, { useState } from "react"

const NewReviewForm = ({ postReview }) => {
  const [newReview, setNewReview] = useState({
    body: ""
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
      body: ""
    })
  }

  return (
    <>
      <h1>Add a Review to this Planet</h1>
      <form onSubmit={handleSubmit} className="new-review-form">
        <label>
          Review:
          <input
            type="text"
            name="body"
            onChange={handleInputChange}
            value={newReview.body}
            className="form-input"
          />
        </label>
        <input type="submit" value="Submit Review" />
      </form>
    </>
  )
}

export default NewReviewForm