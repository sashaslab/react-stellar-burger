export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED'
export const SET_USER = 'SET_USER'
export const SET_ANSWER = 'SET_ANSWER'

export const setAuthChecked = (action) => {
    return {
        type: SET_AUTH_CHECKED,
        payload: action
    }
}

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
}