import React, { useState, useEffect } from "react"
import ReviewList from "./ReviewList"
import NewReviewForm from "./NewReviewForm"
import { useParams } from "react-router-dom"
import ErrorList from "./ErrorList"
import translateServerErrors from "../../services/translateServerErrors"

const PlanetShow = (props) => {
  const [planet, setPlanet] = useState({
    name: "",
    reviews: [
    ]
  })
  const [errors, setErrors] = useState([])
  const params = useParams()
  const planetId = params.id
  const getPlanet = async () => {
    try {
      const response = await fetch(`/api/v1/planets/${planetId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      setPlanet(responseBody.planet)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const postReview = async (newReviewData) => {
    newReviewData.userId = props.user.id
    try {
      const response = await fetch(`/api/v1/planets/${planetId}/reviews`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newReviewData),
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
      const responseBody = await response.json()
      const newReview = responseBody.review
      setPlanet({ ...planet, reviews: [...planet.reviews, newReview] })
      setErrors([])
    } catch (error) {
      console.log(error)
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
      <ReviewList reviews={planet.reviews} user={props.user} planet={planet} setPlanet={setPlanet} />
      { props.user ? <NewReviewForm postReview={postReview} /> : null }
      <ErrorList errors={errors} />
    </div>
  )
}
export default PlanetShow