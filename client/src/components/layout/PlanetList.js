import React, { useState, useEffect } from "react";

const PlanetList = () => {

    const [planets, setPlanets] = useState([])
    const getPlanetsData = async () => {
        try{
            const response = await fetch("/api/v1/planets")
            if(!response.ok){
                const newError = new Error("Error in the fetch!")
                throw(newError)
            }
            const responseBody = await response.json()
            setPlanets(responseBody.planets)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        getPlanetsData()
    }, [])

    const planetsArray = planets.map((planet) => {
        return <div className="cell-small-4 planet-div" key={planet.id}>
            {planet.name}
            <img src={planet.imageUrl} width="50px"></img>
        </div>
    })

    return(
        <div className="grid-x">
        {planetsArray}
        </div>
    )
}

export default PlanetList