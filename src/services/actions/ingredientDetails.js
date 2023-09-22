export const DETAILS_OPEN = 'DETAILS_OPEN';
export const DETAILS_CLOSE = 'DETAILS_CLOSE';

export const detailsOpen = (item) => {
    return {
        type: DETAILS_OPEN,
        payload: item
    }
}

export const detailsClose = () => {
    return {
        type: DETAILS_CLOSE
    }
}