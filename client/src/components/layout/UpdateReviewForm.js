import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import ErrorList from "./ErrorList.js"
import translateServerErrors from "../../services/translateServerErrors.js"

const updateReviewForm = (props) => {
  const [updatedReview, setUpdatedReview] = useState({
    body: "",
    rating: ""
  })

  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const review = props.location.state.review
  
  const handleInputChange = event => {
    setUpdatedReview({
      ...updatedReview,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    updatedReview.reviewId = review.id

    try {
      const response = await fetch(`/api/v1/planets/${review.planetId}/reviews/edit-review`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(updatedReview),
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
      }
      setShouldRedirect(true)
    } catch (error) {
      console.error(error)
    }
  }

  const clearForm = () => {
    setUpdatedReview({
      body: "",
      rating: ""
    })
  }

  if(shouldRedirect){
    return <Redirect push to={`/planets/${review.planetId}`} />
  }

  return (
    <div className="edit-planet-page">
      <h1>Update your review</h1>
      <ErrorList errors={errors} />
      <form onSubmit={handleSubmit} className="new-review-form">
        <label>
          Review:
          <input
            type="text"
            name="body"
            onChange={handleInputChange}
            value={updatedReview.body}
            className="form-input"
            placeholder={review.body}
          />
        </label>
        <label>
          Rating:
          <select name="rating" 
          value={updatedReview.rating}
          onChange={handleInputChange} 
          placeholder={review.rating}
          className="form-input"
          >
            <option value="">Select Rating</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <input type="submit" className="submit-form-button" value="Submit Review" />
      </form>
      <button className="clear-button" onClick={clearForm}>Clear Form</button>
    </div>
  )
}

export default updateReviewForm