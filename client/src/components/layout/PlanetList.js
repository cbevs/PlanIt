import React, { useState, useEffect } from "react"
import PlanetTile from "./PlanetTile.js"
import NewPlanetForm from "./NewPlanetForm.js"

const PlanetList = (props) => {
    const [planets, setPlanets] = useState([])
    const getPlanetsData = async () => {
        try {
            const response = await fetch("/api/v1/planets")
            if(!response.ok){
                const newError = new Error("Error in the fetch!")
                throw(newError)
            }
            const responseBody = await response.json()
            setPlanets(responseBody.planets)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getPlanetsData()
    }, [])
   
    const planetsArray = planets.map((planet) => {
        return (
                    <PlanetTile 
                        key={planet.id} 
                        id={planet.id}
                        name={planet.name}
                        description={planet.description}
                        imageUrl={planet.imageUrl}
                    />
        )
    })

    return(
        <div className="grid-x align-center planet-list">
            {planetsArray}
            {props.user ? <NewPlanetForm setPlanets={setPlanets} planets={planets}/> : null }
        </div>
      )
}

export default PlanetList