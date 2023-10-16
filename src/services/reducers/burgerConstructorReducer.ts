import {
    CONSTRUCTOR_ADD_INGREDIENT,
    CONSTRUCTOR_ADD_BUN,
    CONSTRUCTOR_DELETE,
    CONSTRUCTOR_MOVE,
    CONSTRUCTOR_RESET
} from '../actions/burgerConstructor'

import { TConstructorAction } from '../actions/burgerConstructor';

import { IIngredient } from '../../utils/types';

type TBurgerState = {
    ingredients: IIngredient[];
    bun: IIngredient | null;
}

const initialState: TBurgerState = {
    ingredients: [],
    bun: null
}

export const burgerConstructorReducer = (state = initialState, action: TConstructorAction):TBurgerState => {
    switch (action.type) {
        case CONSTRUCTOR_ADD_INGREDIENT: {
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }
        }
        case CONSTRUCTOR_ADD_BUN: {
            return {
                ...state,
                bun: action.payload
            }
        }
        case CONSTRUCTOR_DELETE: {
            return {
                ...state,
                ingredients: [...state.ingredients].filter(item => item.key !== action.payload)
            }
        }
        case CONSTRUCTOR_MOVE: {
            return {
                ...state,
                ingredients: action.payload
            }
        }
        case CONSTRUCTOR_RESET: {
            return {
                ...state,
                ingredients: [],
                bun: null
            }
        }
        default: {
            return state
        }
    }
}