import { AppState } from "../utils/types";

export const getBurgerIngredients = (state:AppState) => state.burgerIngredients;
export const getBurgerConstructor = (state:AppState) => state.burgerConstructor;
export const getIngredientDetails = (state:AppState) => state.ingredientDetails;
export const getOrderDetails = (state:AppState) => state.orderDetails;
export const getUserState = (state:AppState) => state.user;
export const getOrders = (state:AppState) => state.orders;