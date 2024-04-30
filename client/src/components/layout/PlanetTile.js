import React from "react";

const PlanetTile = ({ id, name, imageUrl, description }) => {
    return(
        <div className="cell-small-4 planet-div" key={id}>
            <img src={imageUrl} width="50px"></img>
            {name}
            <h4>Description: </h4>
            {description}
            
        </div>
    )
}

export default PlanetTile