import { IIngredient } from "../../utils/types";

export const DETAILS_OPEN: 'DETAILS_OPEN' = 'DETAILS_OPEN';
export const DETAILS_CLOSE: 'DETAILS_CLOSE' = 'DETAILS_CLOSE';

export interface IDetailsOpen {
    readonly type: typeof DETAILS_OPEN;
    readonly payload: IIngredient[];
}
export interface IDetailsClose {
    readonly type: typeof DETAILS_CLOSE;
}

export type TDetailsAction =
    | IDetailsOpen
    | IDetailsClose

export const detailsOpen = (item: IIngredient[]): IDetailsOpen => {
    return {
        type: DETAILS_OPEN,
        payload: item
    }
}

export const detailsClose = (): IDetailsClose => {
    return {
        type: DETAILS_CLOSE
    }
}