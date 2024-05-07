import React from "react"
import ReviewTile from "./ReviewTile"

const ReviewList = ({ reviews, user}) => {
  const reviewListItems = reviews.map(review => {
    return (
      <ReviewTile review={review} key={review.id} user={user}/>
    )
  })

  return (
    <>
      {reviewListItems}
    </>
  )
}
export default ReviewList