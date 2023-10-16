import { IIngredient } from '../../utils/types'
import {
    GET_INGREDIENTS_DATA,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
    TIngredientsAction
} from '../actions/burgerIngredients'

type TIngredientState = {
    ingredients: IIngredient[];
    request: boolean;
    failed: boolean;
}

const initialState: TIngredientState = {
    ingredients: [],
    request: false,
    failed: false
}

export const burgerIngredientsReducer = (state = initialState, action: TIngredientsAction): TIngredientState => {
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