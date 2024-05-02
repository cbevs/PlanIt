import React, { useState, useEffect } from "react"
import translateServerErrors from "../../services/translateServerErrors.js"

const NewPlanetForm = ({ planets, setPlanets }) => {
  const [newPlanet, setNewPlanet] = useState({ name: "", description: "" })

  const handleInputChange = (event) => {
    setNewPlanet({
      ...newPlanet,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    postPlanet(newPlanet)
    setNewPlanet({
      name: "",
      description: "",
    })
  }

  const postPlanet = async (newPlanetData) => {
    try {
      const response = await fetch(`/api/v1/planets`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newPlanetData),
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
      } else {
        const body = await response.json()
        const newPlanetEntry = body.planet
        console.log(newPlanetEntry)
        setPlanets([...planets, newPlanetEntry])
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input type="text" name="name" onChange={handleInputChange} value={newPlanet.name} />
        <label>Description:</label>
        <input
          type="text"
          name="description"
          onChange={handleInputChange}
          value={newPlanet.description}
        />
        <input type="submit" />
      </form>
    </div>
  )
}

export default NewPlanetForm
