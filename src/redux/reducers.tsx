// import MovieReducer from "./movie/reducer";
import AuthReducer from "./auth/reducer";
import StateReducer from "./state/reducer";
import CanboReducer from "./canbo/reducer";
import TrangThietBiReducer from "./trangthietbi/reducer";
import loaittbReducer from "./LoaiTTB/reducer";
import phonghocReducer from "./phonghoc/reducer";
const rootReducer = {
   movie: AuthReducer,
   state: StateReducer,
   canbo: CanboReducer,
   trangthietbi: TrangThietBiReducer,
   loaittb: loaittbReducer,
   phonghoc: phonghocReducer
};
export default rootReducer;
