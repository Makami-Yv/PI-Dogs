// Importamos las dependencias
import axios from "axios";

// Exportamos los types de las actions
export  const 
    GET_DOGS = "GET_DOGS", GET_DOG_BY_NAME = "GET_DOG_BY_NAME",
    GET_DETAILS = "GET_DETAILS", GET_TEMPERAMENTS = "GET_TEMPERAMENTS",
    CREATE_DOG = "CREATE_DOG", FILTER_BY_TEMPERAMENTS = "FILTER_BY_TEMPERAMENTS",
    FILTER_BY_SOURCE = "FILTER_BY_SOURCE", ORDER_BY_NAME = "ORDER_BY_NAME",
    ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT", RESET = "RESET",
    CLEAN_DETAILS = "CLEAN_DETAILS"

// Rutas del Back
const
    URL_DOGS = "http://localhost:3001/dogs",
    URL_CREATE_DOGS = "http://localhost:3001/dogs/create",
    URL_TEMPERAMENTS = "http://localhost:3001/temperaments"

// Conseguimos todas las razas de perros
export function getAllDogs() {
    return async function(dispatch) {
        try {
            const dogs = await axios.get(URL_DOGS);             // Llamamos al backend
            return dispatch({
                type: GET_DOGS,
                payload: dogs.data                              // Mandamos los datos
            });
        } catch (e) {
            console.error(e)
            return alert("An error has occured. There's no Dogs to show right now")
        }
    }
}

// Conseguimos las razas por nombre
export function getDogByName(name) {
    return async function(dispatch) {
        try {
            const dogs = await axios.get(URL_DOGS + `?name=${name}`);   // Llamamos a la ruta buscando con un nombre
            return dispatch({
                type: GET_DOG_BY_NAME,
                payload: dogs.data                              // Mandamos los datos
            });
        } catch (e) {
            console.error(e)
            return alert("An error has occured. There's no Dogs whit that name")
        }
    }
}

// Conseguimos la raza por id para mostrar los detalles
export function getDogDetails(id) {
    return async function(dispatch) {
        try {
            const dog = await axios.get(URL_DOGS + `/${id}`);   // Llamamos a la ruta buscando con su id
            return dispatch({
                type: GET_DETAILS,
                payload: dog.data                              // Mandamos los datos
            });
        } catch (e) {
            console.error(e)
            return alert("An error has occured. There's no Dog whit that id")
        }
    }
}

// Conseguimos los temperamentos de los perros
export function getAllTemperaments() {
    return async function(dispatch) {
        try {
            const temperaments = await axios.get(URL_TEMPERAMENTS);   // Llamamos a la ruta de temperamentos
            return dispatch({
                type: GET_TEMPERAMENTS,
                payload: temperaments.data                              // Mandamos los datos
            });
        } catch (e) {
            console.error(e)
            return alert("An error has occured. There's no Temperaments to show right now")
        }
    }
}

// Creamos una nueva raza de perro
export function createDog(dog) {
    return async function(dispatch) {
        try {
            const createdDog = await axios.post(URL_CREATE_DOGS, dog);   // Mandamos los datos a la ruta
            return dispatch({
                type: CREATE_DOG,
                payload: createDog.data                              // Mandamos los datos obtenidos
            });
        } catch (e) {
            console.error(e)
            return alert("An error has occured. The new breed wasn't created, try again")
        }
    }
}

// Filtramos por temperamentos
export function filterByTemperament(temperament) {
    try {
        return {
            type: FILTER_BY_TEMPERAMENTS,
            payload: temperament
        }
    } catch (e) {
        console.error(e)
        return alert("An error has occured. Can't filter by temperament")
    }
}

// Filtramos entre las razas por su origen
export function filterBySource(source) {
    try {
        return {
            type: FILTER_BY_SOURCE,
            payload: source
        }
    } catch (e) {
        console.error(e)
        return alert("An error has occured. Can't filter by source")
    }
}

// Ordenamos por nombre
export function orderByName(order) {
    try {
        return {
            type: ORDER_BY_NAME,
            payload: order
        }
    } catch (e) {
        console.error(e)
        return alert("An error has occured. Can't order by name")
    }
}

// Ordenamos por peso
export function orderByWeight(order) {
    try {
        return {
            type: ORDER_BY_WEIGHT,
            payload: order
        }
    } catch (e) {
        console.error(e)
        return alert("An error has occured. Can't order by weight")
    }
}

// Reseteamos el state (filtros, ordenamiento)
export function reset() {
    try {
        return {
            type: RESET,
        }
    } catch (e) {
        console.error(e)
        return alert("An error has occured. Can't reset the state")
    }
}

// Limpiamos los detalles de la raza para que no se muestre el de una anterior
export function cleanDetails() {
    try {
        return {
            type: CLEAN_DETAILS,
        }
    } catch (e) {
        console.error(e)
        return alert("An error has occured. Can't clean the details")
    }
}