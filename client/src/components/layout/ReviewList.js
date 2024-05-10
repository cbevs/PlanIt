import React from "react"
import ReviewTile from "./ReviewTile"

const ReviewList = ({reviews, user, setPlanet, planet }) => {
  const reviewListItems = reviews.map(review => {
    return (
      <ReviewTile review={review} key={review.id} user={user} planet={planet} setPlanet={setPlanet} />
    )
  })

  return (
    <>
      {reviewListItems}
    </>
  )
}
export default ReviewList