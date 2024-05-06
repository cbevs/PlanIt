import React from "react";
import ReviewEditButton from "./ReviewEditButton";
import ReviewDeleteButton from "./ReviewDeleteButton"

const ReviewTile = ({ review, user, setPlanet, planet }) => {

  return(
    <div className="review">
    <li>{review.body}</li>
    <li>Rating: {review.rating}</li>
      { user ? <ReviewEditButton review={review} user={user} /> : null }
      { user ? <ReviewDeleteButton review={review} user={user} setPlanet={setPlanet} planet={planet}  /> : null }
    </div>
  )
}

export default ReviewTile