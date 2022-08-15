// Importamos las actions
import {
    GET_DOGS, GET_DOG_BY_NAME,
    GET_DETAILS, GET_TEMPERAMENTS,
    CREATE_DOG, FILTER_BY_TEMPERAMENTS,
    FILTER_BY_SOURCE, ORDER_BY_NAME,
    ORDER_BY_WEIGHT, RESET,
    CLEAN_DETAILS
} from './actions'

const initialState= {
    dogs: [],
    copy: [],
    temperaments: [],
    details: {},
}

function rootReducer(state= initialState, action) {
    switch(action.type) {
        case GET_DOGS:
            return {
                ...state, 
                dogs: action.payload,
                copy: action.payload
            };
        case GET_DOG_BY_NAME:
            return {
                ...state,
                copy: action.payload
            };
        case GET_DETAILS:
            return {
                ...state,
                details: action.payload
            };
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            };
        case CREATE_DOG:
            return {
                ...state,
                copy: action.payload
            };
        case FILTER_BY_TEMPERAMENTS:
            const tempFiltered =
            action.payload === "ALL"
            ? state.dogs
            : state.copy.filter(dg => {
                if(typeof (dg.temperament) === 'string')
                    return dg.temperament.includes(action.payload)
                if(Array.isArray(dg.temperament)) {
                    let temp = dg.temperament.map(d => d.name)
                    return temp.includes(action.payload)
                }
                return true
            })  
            if(tempFiltered.length === 0) {
                alert("There's no Dogs with that temperament.")
                return {
                    ...state,
                    copy: dogs
                };
            }
            return {
                ...state,
                copy: tempFiltered
            };
        case FILTER_BY_SOURCE:
            const sourceFiltered = 
                action.payload === "AllSource"
                ? state.dogs
                : action.payload === "API"
                ? state.copy.filter(dg => isNaN(Number(dg.id)) === false)
                : state.copy.filter(dg => isNaN(Number(dg.id)) === true)
            if(sourceFiltered.length === 0) {
                alert("There's no Dogs with that Source.")
                return {
                    ...state,
                    copy: state.dogs
                }
            }
            return {
                ...state,
                copy: sourceFiltered
            };
        case ORDER_BY_NAME:
            const nameSort =
                action.payload === "ANY"
                ? state.dogs
                : action.payload === "A-Z"
                ? state.copy.sort(function (a, b) {
                    if (a.name > b.name) return 1;
                    if (b.name > a.name) return -1;
                    return 0;
                    })
                : state.copy.sort(function (a, b) {
                    if (a.name > b.name) return -1;
                    if (b.name > a.name) return 1;
                    return 0;
                    })
            return {
                ...state,
                copy: nameSort,
            };
        case ORDER_BY_WEIGHT:
            let weightSort =
                action.payload === "NONE"
                ? state.dogs
                : action.payload === "MIN-MAX"
                ? state.copy.sort(function (a, b) {
                    if (a.weight > b.weight) return 1;
                    if (b.weight > a.weight) return -1;
                    return 0;
                    })
                : state.copy.sort(function (a, b) {
                    if (a.weight > b.weight) return -1;
                    if (b.weight > a.weight) return 1;
                    return 0;
                    });
            return {
                ...state,
                copy: weightSort,
            };
        case RESET:
            return {
                ...state,
                copy: state.dogs
            };
        case CLEAN_DETAILS:
            return {
                ...state,
                details: {}
            };
        default:
            return state;
    }
}

export default rootReducer;