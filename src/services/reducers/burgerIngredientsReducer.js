import {
    GET_INGREDIENTS_DATA,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS
} from '../actions/burgerIngredients'

const initialState = {
    ingredients: [],
    request: false,
    failed: false
}

export const burgerIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_DATA: {
            return {
                ...state,
                request: true,
            }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.payload,
                request: false
            }
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                failed: true,
            }
        }
        default: {
            return state;
        }
    }
}