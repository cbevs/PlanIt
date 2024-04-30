import React from "react";
import { Link } from "react-router-dom"

const PlanetTile = ({ id, name, imageUrl }) => {
    return(
        <Link to={`/${id}`}>
            <div className="cell-small-3 planet-div" key={id}>
                <img src={imageUrl} width="75px"></img>
                <p>{name}</p>
            </div>
        </Link>
    )
}

export default PlanetTile