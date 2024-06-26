import React from "react";
import { Link } from "react-router-dom"

const PlanetTile = ({ id, name, imageUrl, description }) => {
    return(
        <Link to={`/planets/${id}`}>
            <div className="cell-small-3 planet-div">
                <img src={imageUrl} className="planet-list-image"></img>
                <p>{name}</p>
            </div>
        </Link>
    )
}

export default PlanetTile