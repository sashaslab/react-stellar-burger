import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { rootReducer } from "../services/reducers";
import { TConstructorAction } from "../services/actions/burgerConstructor";
import { TIngredientsAction } from "../services/actions/burgerIngredients";
import { TDetailsAction } from "../services/actions/ingredientDetails";
import { TOrderDetailsAction } from "../services/actions/orderDetails";
import { TUserAction } from "../services/actions/user";
import { TWsAction } from "../services/actions/ws";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  key?: number;
}

export interface IOrder {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
}

export interface IOrders {
  success: boolean,
  orders: Array<IOrder>,
  total: number,
  totalToday: number,
}

export interface IUser {
  name: string;
  email: string;
  password: string
}

export interface IWsActions {
  wsConnect: string;
  wsDisconnect: string;
  wsOnOpen: string;
  wsOnError: string;
  wsOnClose: string;
  wsOnMessage: string;
  wsSendMessage: string;
}

export type AppState = ReturnType<typeof rootReducer>;

type AppActions =
  | TConstructorAction
  | TIngredientsAction
  | TDetailsAction
  | TOrderDetailsAction
  | TUserAction
  | TWsAction

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, AppActions>

export type AppDispatch = ThunkDispatch<AppState, never, AppActions>;

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
