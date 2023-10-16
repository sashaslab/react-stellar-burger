import { IIngredient } from "../../utils/types";

export const CONSTRUCTOR_ADD_INGREDIENT: 'CONSTRUCTOR_ADD_INGREDIENT' = 'CONSTRUCTOR_ADD_INGREDIENT';
export const CONSTRUCTOR_ADD_BUN: 'CONSTRUCTOR_ADD_BUN' = 'CONSTRUCTOR_ADD_BUN';
export const CONSTRUCTOR_DELETE: 'CONSTRUCTOR_DELETE' = 'CONSTRUCTOR_DELETE';
export const CONSTRUCTOR_MOVE: 'CONSTRUCTOR_MOVE' = 'CONSTRUCTOR_MOVE';
export const CONSTRUCTOR_RESET: 'CONSTRUCTOR_RESET' = 'CONSTRUCTOR_RESET';

export interface IConstructorAddIngredient {
    readonly type: typeof CONSTRUCTOR_ADD_INGREDIENT;
    readonly payload: IIngredient
}

export interface IConstructorAddBun {
    readonly type: typeof CONSTRUCTOR_ADD_BUN;
    readonly payload: IIngredient
}

export interface IConstructorDeleteIngredient {
    readonly type: typeof CONSTRUCTOR_DELETE;
    readonly payload: number;
}

export interface IConstructorMoveIngredient {
    readonly type: typeof CONSTRUCTOR_MOVE;
    readonly payload: IIngredient[]
}

export interface IConstructorReset {
    readonly type: typeof CONSTRUCTOR_RESET
}

export type TConstructorAction =
    | IConstructorAddIngredient
    | IConstructorAddBun
    | IConstructorDeleteIngredient
    | IConstructorMoveIngredient
    | IConstructorReset

export const addConstructorIngredient = (item: IIngredient): IConstructorAddIngredient => {
    return {
        type: CONSTRUCTOR_ADD_INGREDIENT,
        payload: item
    }
}

export const addConstructorBun = (item: IIngredient): IConstructorAddBun => {
    return {
        type: CONSTRUCTOR_ADD_BUN,
        payload: item
    }
}

export const deleteConstructorIngredient = (item: number): IConstructorDeleteIngredient => {
    return {
        type: CONSTRUCTOR_DELETE,
        payload: item
    }
}

export const moveConstructorIngredient = (sorted: IIngredient[]): IConstructorMoveIngredient => {
    return {
        type: CONSTRUCTOR_MOVE,
        payload: sorted
    }
}

export const resetConstructor = (): IConstructorReset => {
    return {
        type: CONSTRUCTOR_RESET
    }
}