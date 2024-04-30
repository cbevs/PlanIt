import React, { useState, useEffect } from "react";
import PlanetTile from "./PlanetTile.js";
import NewPlanetForm from "./NewPlanetForm.js";

const PlanetList = () => {
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
        <div className="grid-x">
            <img className={"logo"} src="https://i.imgur.com/ANjRDVK.png" />
            {planetsArray}
            <NewPlanetForm setPlanets={setPlanets} planets={planets}/>
        </div>
    )
}

export default PlanetList