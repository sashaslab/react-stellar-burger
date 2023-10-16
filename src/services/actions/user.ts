import { IUser } from "../../utils/types";

export const SET_AUTH_CHECKED: 'SET_AUTH_CHECKED' = 'SET_AUTH_CHECKED'
export const SET_USER: 'SET_USER' = 'SET_USER'
export const SET_ANSWER: 'SET_ANSWER' = 'SET_ANSWER'

export interface ISetAuthChecked {
    readonly type: typeof SET_AUTH_CHECKED;
    readonly payload: boolean

}

export interface ISetUser {
    readonly type: typeof SET_USER;
    readonly payload: IUser | null
}

export interface ISetAnswer {
    readonly type: typeof SET_ANSWER;
}

export type TUserAction =
    | ISetAuthChecked
    | ISetUser
    | ISetAnswer

export const setAuthChecked = (action: boolean): ISetAuthChecked => {
    return {
        type: SET_AUTH_CHECKED,
        payload: action
    }
}

export const setUser = (user: IUser | null): ISetUser => {
    return {
        type: SET_USER,
        payload: user
    }
}