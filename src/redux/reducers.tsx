// import MovieReducer from "./movie/reducer";
import AuthReducer from "./auth/reducer";
import StateReducer from "./state/reducer";
import CanboReducer from "./canbo/reducer";
import LichLamViecReducer from "./lichlamviec/reducer";
const rootReducer = {
   movie: AuthReducer,
   state: StateReducer,
   canbo: CanboReducer,
   lichlamviec: LichLamViecReducer
};
export default rootReducer;
