import React, { useState, useEffect } from "react"
import ReviewList from "./ReviewList"
import NewPlanetForm from "./NewPlanetForm"
import NewReviewForm from "./NewReviewForm"

const PlanetShow = (props) => {
  const [planet, setPlanet] = useState({
    name: "",
    reviews: []
  })

  const planetId = props.match.params.id
  const getPlanet = async () => {
    try {
      const response = await fetch(`/api/v1/planets/${planetId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
      }
      const responseBody = await response.json()
      setPlanet(responseBody.planet)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const postReview = async (newReviewData) => {
    try {
      const response = await fetch(`/api/v1/planets/${planetId}/reviews`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(newReviewData)
      })
      const responseBody = await response.json()
      const newReview = responseBody.review
      setPlanet({ ...planet, reviews: [...planet.reviews, newReview] })
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }

  }

  useEffect(() => {
    getPlanet()
  }, [])

  return (
    <div className="planet-show">
      <img src={planet.imageUrl} className="planet-image" alt="image of planet" />
      <h1>{planet.name}</h1>
      <h4>{planet.description}</h4>
      <ReviewList reviews={planet.reviews} id={planet.id} />
      <NewReviewForm postReview={postReview} />
    </div>
  )
}
export default PlanetShow