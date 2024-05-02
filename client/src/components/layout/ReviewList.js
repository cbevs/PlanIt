import React from "react"

const ReviewList = ({reviews, id}) => {
  const reviewListItems = reviews.map(review => {
    return (
      <li key={id}>
        {review.reviewText}
      </li>
    )
  })

  return (
    <div>
      {reviewListItems}
    </div>
  )
}
export default ReviewList