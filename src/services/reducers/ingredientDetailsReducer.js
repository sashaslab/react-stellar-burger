import {DETAILS_OPEN, DETAILS_CLOSE} from '../actions/ingredientDetails';

const initialState = {
    ingredient: null,
}

export const ingredientDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case DETAILS_OPEN: {
            return {
                ...state,
                ingredient: action.payload,
                
            }
        }
        case DETAILS_CLOSE: {
            return {
                ...state,
                ingredient: null,
            }
        }
        default: {
            return state
        }
    }
}