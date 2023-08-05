import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burgerIngredientsReducer';
import { ingredientDetailsReducer } from './ingredientDetailsReducer';
import { burgerConstructorReducer } from './burgerConstructorReducer';
import { orderDetailsReducer } from './orderDetailsReducer';

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    burgerConstructor: burgerConstructorReducer,
    orderDetails: orderDetailsReducer

})