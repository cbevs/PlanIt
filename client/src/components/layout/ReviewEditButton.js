import React from "react";
import { Link } from "react-router-dom"

const ReviewEditButton = ({ user, review }) => {
  return(
    <>
      { user.id === review.userId ? <Link to={`/reviews/${review.id}/edit`} className="edit-button">Edit Review</Link> : null}
    </>
  )
}

export default ReviewEditButton