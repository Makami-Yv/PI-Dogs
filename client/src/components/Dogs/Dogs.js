// Importamos las dependencias, actions y componentes
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
    getAllDogs,
    getAllTemperaments,
} from "../../redux/actions";

import { CardDogs } from "../CardDogs/CarDogs";
//import { Loader } from "../Loader/Loader";
//import { NavBar } from "../NavBar/NavBar"
//import styles from "./Pokemons.module.css";

export function Dogs() {
    let dispatch = useDispatch();
    let allDogs = useSelector(state => state.copy);
    let errorRender = useSelector(state => state.copy);

    let [counterDogs, setCounterDog] = useState(1);     // Pagina en la que estamos
    const [dogPerPage] = useState(12);                  // Cuantos perros tendremos por pagina

    let lastDog = counterDogs * dogPerPage;             // el indice mayor por pagina
    if(allDogs.length < 12) lastDog =  allDogs.length;

    let firstDog = lastDog - dogPerPage;                // el indice menor por pagina
    if(firstDog < 1) firstDog = 0;
    
    const indexPages = Math.ceil(allDogs.length / dogPerPage);   // Numero de paginas en total

    const dogData = useSelector((state) =>
        state.copy.length > 1 
            ? state.copy.slice(firstDog, lastDog) 
            : [state.copy]                                     // los perros de la pagina actual
    );

    useEffect(() => {
        dispatch(getAllDogs());
        dispatch(getAllTemperaments());
    }, [dispatch]);

    if (dogData.flat().length === 0) {
        if(errorRender.length === 0) {
            return (
                <div>Loader</div>
            );
        }
    } else {
        return (
        <div>
            <div>NavBar</div>
            <div className={styles.dogs_card}>
                {dogData.length === 0 ? (
                    <h1>Error</h1>
                ) : (
                    dogData.map((dog, index) => (
                        <Link key={index} to={"/dogs/" + dog.id} style={{ textDecoration: "none" }}>
                            <CardDogs
                            key={index}
                            id={dog.id}
                            name={dog.name}
                            temperaments={dog.temperaments}
                            image={dog.image}
                            weight={dog.weight}
                            height={dog.height}
                            />
                        </Link>
                    ))
                )}
            </div>
            <div className={styles.pagination}>
                <button onClick={() => setCounterDog(counterDogs = 1)}>
                    {"<<"}
                </button>
                <button onClick={() => setCounterDog(--counterDogs)}>
                    {"<"}
                </button>
                <p>
                    {counterDogs} of {indexPages}
                </p>
                <button onClick={() => setCounterDog(++counterDogs)}>
                    {">"}
                </button>
                <button onClick={() => setCounterDog(indexPages)}>
                    {">>"}
                </button>
            </div>
        </div>
        );
    }
}