import { getData } from '../../utils/burger-api'
import { AppDispatch, IIngredient } from '../../utils/types';
export const GET_INGREDIENTS_DATA: 'GET_INGREDIENTS_DATA' = 'GET_INGREDIENTS_DATA';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';

export interface IGetIngredientData {
    readonly type: typeof GET_INGREDIENTS_DATA
}

export interface IGetIngredientFailed {
    readonly type: typeof GET_INGREDIENTS_FAILED
}

export interface IGetIngredientSuccess {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly payload: IIngredient[]
}

export type TIngredientsAction =
    | IGetIngredientData
    | IGetIngredientFailed
    | IGetIngredientSuccess

export const getIngredients = () => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_INGREDIENTS_DATA
        })
        getData()
            .then((res) => {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    payload: res.data,
                })
            })
            .catch(err => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                })
            })
    }
}
