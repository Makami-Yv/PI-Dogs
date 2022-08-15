import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { 
    getDogDetails, 
    cleanDetails 
} from "../../redux/actions";

//import { Loader } from "../Loader/Loader";
//import { NavBar } from "../NavBar/NavBar";
//import styles from "./Details.module.css";

export function Details() {
    const dispatch = useDispatch();
    const params = useParams();             // desde aqui obtenemos el id del perro
    const dog = useSelector((state) => state.details);
    let prevdoggo = 0;

    dog.id !== 1
        ? prevdoggo = dog.id - 1
        : prevdoggo = dog.id

    useEffect(() => {
        dispatch(cleanDetails());
        dispatch(getDogDetails(params.id));
    }, [dispatch, params.id]);

    console.log(dog)

    if (!dog.name) {
        return (
        <div>
            <div>
                <div>Loader</div>
            </div>
        </div>
        );
    } else if (dog.length !== 0) {
        return (
        <div className={styles.background}>
            <div>NavBar</div>
            <div className={styles.frame}>
                <div className={styles.dogbox}>
                    <div className={styles.name}>
                        <h3>
                            {`#${dog.id}`} {dog.name}
                        </h3>
                    </div>
                    <div className={styles.data_container}>
                        <div className={styles.stats_container}>
                            <h4>{`Weight: ${dog.weight}`}</h4>
                            <h4>{`Height: ${dog.height}`}</h4>
                        </div>
                        <div className={styles.dog_container}>
                            <img src={dog.image} alt={dog.name} />
                            <p>
                            {dog.temperaments
                                ? dog.temperaments.map((e) => e.name).join(", ")
                                : dog.temperaments}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.button_container}>
                <button>
                    <Link to={"/dogs/" + (prevdoggo)} style={{ textDecoration: "none"}}>
                        Raza anterior
                    </Link>
                </button>
                <button>
                    <Link to="/home" style={{ textDecoration: "none"}}>
                        Volver a Home
                    </Link>
                </button>
                <button>
                    <Link to={"/dogs/" + (dog.id + 1)} style={{ textDecoration: "none"}}>
                        Raza siguiente
                    </Link>
                </button>
            </div>
        </div>
        );
    } else if (!dog.length) {
        return (
        <div>
            <div>NavBar</div>
            <div>
                Error
            </div>
        </div>
        );
    }
}