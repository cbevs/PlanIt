import React from "react"
import ReviewTile from "./ReviewTile"

const ReviewList = ({reviews, user, getPlanet }) => {
  const reviewListItems = reviews.map(review => {
    return (
      <ReviewTile review={review} key={review.id} user={user} getPlanet={getPlanet} />
    )
  })

  return (
    <>
      {reviewListItems}
    </>
  )
}
export default ReviewList