import React from "react";

const PlanetTile = ({ id, name, imageUrl }) => {
    return(
        <div className="cell-small-4 planet-div" key={id}>
            {name}
            <img src={imageUrl} width="50px"></img>
        </div>
    )
}

export default PlanetTile