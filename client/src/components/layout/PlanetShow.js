import React, { useState, useEffect } from "react"

const PlanetShow = (props) => {
  const [planet, setPlanet] = useState({})

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

  useEffect(() => {
    getPlanet()
  }, [])

  return (
    <div className="planet-show">
      <img src={planet.imageUrl} className="planet-image" alt="image of planet" />
      <h1>{planet.name}</h1>
      <h4>{planet.description}</h4>
    </div>
  )
}
export default PlanetShow