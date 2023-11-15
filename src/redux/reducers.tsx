// import MovieReducer from "./movie/reducer";
import AuthReducer from "./auth/reducer";
import StateReducer from "./state/reducer";
import CanboReducer from "./canbo/reducer";
import TrangThietBiReducer from "./trangthietbi/reducer";
import loaittbReducer from "./LoaiTTB/reducer";
import phonghocReducer from "./phonghoc/reducer";
import LichLamViecReducer from "./lichlamviec/reducer";
const rootReducer = {
   movie: AuthReducer,
   state: StateReducer,
   canbo: CanboReducer,
   trangthietbi: TrangThietBiReducer,
   loaittb: loaittbReducer,
   phonghoc: phonghocReducer,
   lichlamviec: LichLamViecReducer
};
export default rootReducer;
