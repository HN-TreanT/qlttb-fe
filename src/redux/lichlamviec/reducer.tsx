import actions from "./actions";
const initState = {
  lichlamviecs: {
    count: 0,
    data: []
  },
  params: {}
};
const LichLamViecReducer = (state: any = initState, action: any) => {
  switch (action.type) {
    case actions.types.lOAD_DATA:
      return {
        ...state,
        params : action.payload.params
      };
    case actions.types.LOAD_DATA_SUCCESS:
        return {
            ...state, 
            lichlamviecs : action.payload.data
        }
   
    default:
      return state;
  }
};

export default LichLamViecReducer;
