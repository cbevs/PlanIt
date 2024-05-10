import React, { useState, useEffect } from "react"
import translateServerErrors from "../../services/translateServerErrors.js"
import ErrorList from "./ErrorList.js"
import Dropzone from "react-dropzone"

const NewPlanetForm = ({ planets, setPlanets }) => {
  const [newPlanet, setNewPlanet] = useState({ name: "", description: "", imageUrl: {} })
  const[errors, setErrors] = useState([])

  const handleInputChange = (event) => {
    setNewPlanet({
      ...newPlanet,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newPlanetBody = new FormData()
    newPlanetBody.append("name", newPlanet.name)
    newPlanetBody.append("description", newPlanet.description)
    newPlanetBody.append("imageUrl", newPlanet.imageUrl)
    postPlanet(newPlanetBody)
    setNewPlanet({
      name: "",
      description: "",
      imageUrl: {}
    })
  }

  const handleProfileImageUpload = (acceptedImage) => {
    setNewPlanet({
      ...newPlanet,
      imageUrl: acceptedImage[0]
    })
  }

  const postPlanet = async (newPlanetData) => {
    try {
      const response = await fetch(`/api/v1/planets`, {
        method: "POST",
        headers: new Headers({
          "Accept": "image/jpeg",
        }),
        body: newPlanetData
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
        setPlanets([...planets, newPlanetEntry])
        setErrors([])
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h4>Add a New Planet to Review</h4>
      <ErrorList errors={errors} />
      <form onSubmit={handleSubmit} className="new-planet-form">
        <label>Name:
          <input 
            className="form-input"
            type="text" 
            name="name" 
            onChange={handleInputChange} 
            value={newPlanet.name} 
          />
        </label>
        <label>Description:
          <input
            className="form-input"
            type="text"
            name="description"
            onChange={handleInputChange}
            value={newPlanet.description}
          />
        </label>
        <Dropzone onDrop={handleProfileImageUpload}>
          {({getRootProps, getInputProps}) => (
            <section className="drag-and-drop">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Upload New Planet Image Here - drag and drop or click to upload</p>
              </div>
            </section>
          )}
        </Dropzone>
        <input type="submit" className="submit-form-button" />
      </form>
    </div>
  )
}

export default NewPlanetForm
