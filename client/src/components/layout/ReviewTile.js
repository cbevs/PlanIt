import React from "react";

const ReviewTile = ({review}) => {

  return(
    <>
    <li>{review.body}</li>
    <li>Rating: {review.rating}</li>
    </>
  )
}

export default ReviewTile