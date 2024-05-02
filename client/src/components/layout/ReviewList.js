import React from "react"
import ReviewTile from "./ReviewTile"

const ReviewList = ({reviews, id}) => {
  const reviewListItems = reviews.map(review => {
    return (
      <ReviewTile review={review} key={review.id}/>
    )
  })

  return (
    <>
      {reviewListItems}
    </>
  )
}
export default ReviewList