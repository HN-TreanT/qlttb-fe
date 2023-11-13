import { AuthActions } from "./auth/action";
import { StateAction } from "./state/action";
import { CanboAction } from "./canbo/actions";
const useAction = () => {
   const actions = { AuthActions, StateAction , CanboAction};
  return actions;
};

export default useAction;
