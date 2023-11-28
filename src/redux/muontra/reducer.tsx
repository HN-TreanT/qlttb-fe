import actions from "./actions";
const initState = {
    muontras: {
        count: 0,
        data: []
    },
    params: {}
};
const muontraReducer = (state: any = initState, action: any) => {
    switch (action.type) {
        case actions.types.lOAD_DATA:
            return {
                ...state,
                params: action.payload.params
            };
        case actions.types.LOAD_DATA_SUCCESS:
            return {
                ...state,
                muontras: action.payload.data
            }

        default:
            return state;
    }
};

export default muontraReducer;
