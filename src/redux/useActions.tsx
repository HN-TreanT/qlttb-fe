import { AuthActions } from "./auth/action";
import { StateAction } from "./state/action";
import { CanboAction } from "./canbo/actions";
import { trangthietbiAction } from "./trangthietbi/actions"
import { loaittbAction } from "./LoaiTTB/actions";
import { phonghocAction } from "./phonghoc/actions";
import { LichLamViecAction } from "./lichlamviec/actions";
import { lichhoctapAction } from "./lichhoctap/actions";
import { tinhtrangTTBActions } from "./tinhtragnTTB/actions";
import { muontraAction } from "./muontra/actions";
const useAction = () => {
  const actions = { AuthActions, StateAction, CanboAction, trangthietbiAction, loaittbAction, phonghocAction, LichLamViecAction, lichhoctapAction, tinhtrangTTBActions, muontraAction };
  return actions;
};

export default useAction;
