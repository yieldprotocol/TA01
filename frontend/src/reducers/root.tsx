import { StateContext, StateAction } from "../stores/state";

export enum ActionType {
  UPDATE_BALANCE = "UPDATE_BALANCE",
  INITIATE_TX = "INITATE_TX",
  RESOLVED_TX = "RESOLVED_TX",
  UPDATE_VIC_WALLET = "UPDATE_VIC_WALLET",
}

export const rootReducer = (state: StateContext, action: StateAction) => {
  switch (action.type) {
    case ActionType.UPDATE_BALANCE:
      return {
        ...state,
        user: {
          ...state.user,
          balances: {
            ...state.user.balances,
            ...action.payload,
          },
        },
      };
    // case ActionType.INITIATE_TX:
    //   return {
    //     ...state,
    //     user: { ...state.user, txPending: true },
    //   };
    // case ActionType.RESOLVED_TX:
    //   return {
    //     ...state,
    //     user: { ...state.user, txPending: false },
    //   };
    case ActionType.UPDATE_VIC_WALLET:
      return {
        ...state,
        application: {
          ...state.application,
          vicsWallet: action.payload,
        },
      };
    default:
      return state;
  }
};
