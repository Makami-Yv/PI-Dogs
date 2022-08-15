import React from "react";
//import style from "./CardDogs.module.css";

export function CardDogs({ id, image, name, temperaments, weight }) {
    return (
    <div className={style.card_container} key={id}>
        <div>
            <img className={style.sprite} 
            src={image
                || "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/MissingNo.png/320px-MissingNo.png"} 
            alt="dog_image"/>
        </div>
        <h3 className={style.name}>{name}</h3>
        <div>
            <h4 className={style.temperaments}>
                {temperaments ? temperaments.map((e) => e.name).join(", ") : temperaments}
            </h4>
            <h4>{`Peso: ${weight}`}</h4>
        </div>
    </div>
    );
}