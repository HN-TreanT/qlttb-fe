// import MovieReducer from "./movie/reducer";
import AuthReducer from "./auth/reducer";
import StateReducer from "./state/reducer";
import CanboReducer from "./canbo/reducer";
const rootReducer = {
   movie: AuthReducer,
   state: StateReducer,
   canbo: CanboReducer
};
export default rootReducer;
