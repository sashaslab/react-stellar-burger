export const CONSTRUCTOR_ADD_INGREDIENT = 'CONSTRUCTOR_ADD_INGREDIENT';
export const CONSTRUCTOR_ADD_BUN = 'CONSTRUCTOR_ADD_BUN'
export const CONSTRUCTOR_DELETE = 'CONSTRUCTOR_DELETE';
export const CONSTRUCTOR_MOVE = 'CONSTRUCTOR_MOVE';
export const CONSTRUCTOR_RESET = 'CONSTRUCTOR_RESET';

export const addConstructorIngredient = (item) => {
    return {
        type: CONSTRUCTOR_ADD_INGREDIENT,
        payload: item
    }
}

export const addConstructorBun = (item) => {
    return {
        type: CONSTRUCTOR_ADD_BUN,
        payload: item
    }
}

export const deleteConstructorIngredient = (item) => {
   return {
        type: CONSTRUCTOR_DELETE,
        payload: item
    }
}

export const moveConstructorIngredient = (sorted) => {
    return {
        type: CONSTRUCTOR_MOVE,
        payload: sorted
    }
}

export const resetConstructor = () => {
    return {
        type: CONSTRUCTOR_RESET
    }
}