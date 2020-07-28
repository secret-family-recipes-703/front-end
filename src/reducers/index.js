export const intialState = {
    username: "",
    recipes: "",
    errorMessage: "",
};

export const recipesReducer = (state = intialState, action) => {
    switch (action.type) {
        case 'UPDATE_USER':
            return {
                ...state,
                username: action.payload
            };
        default:
            return state;
    };
};