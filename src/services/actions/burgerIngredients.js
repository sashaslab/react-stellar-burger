import { getData } from '../../utils/burger-api'
export const GET_INGREDIENTS_DATA = 'GET_INGREDIENTS_DATA';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';

export const getIngredients = () => {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS_DATA
        })
        getData().then((res) => {
            if (res && res.success) {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    payload: res.data,
                })
            } else {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                })
            }
        })
            .catch(err => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                })
            })
    }
}
