import { IIngredient } from '../../utils/types';
import {DETAILS_OPEN, DETAILS_CLOSE, TDetailsAction} from '../actions/ingredientDetails';

export type TIngredientDetailsState = { 
    ingredient: IIngredient[]
}

const initialState: TIngredientDetailsState = {
    ingredient: [],
}

export const ingredientDetailsReducer = (state = initialState, action: TDetailsAction): TIngredientDetailsState => {
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
                ingredient: [],
            }
        }
        default: {
            return state
        }
    }
}