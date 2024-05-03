import React, { useState } from "react"

const NewReviewForm = ({ postReview }) => {
  const [newReview, setNewReview] = useState({
    body: "",
    rating: 0
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
      body: "",
      rating: 0
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
        <label>
          Rating:
          <select name="rating" value={newReview.rating}
           onChange={handleInputChange}
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <input type="submit" value="Submit Review" />
      </form>
    </>
  )
}

export default NewReviewForm