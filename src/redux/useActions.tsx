import { AuthActions } from "./auth/action";
import { StateAction } from "./state/action";
import { CanboAction } from "./canbo/actions";
import { LichLamViecAction } from "./lichlamviec/actions";
const useAction = () => {
   const actions = { AuthActions, StateAction , CanboAction, LichLamViecAction};
  return actions;
};

export default useAction;
