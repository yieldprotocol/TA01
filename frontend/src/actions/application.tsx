import { ActionType } from "../reducers/root";

export function updateVicWallet(wallet: any) {
  return {
    type: ActionType.UPDATE_VIC_WALLET,
    payload: wallet,
  };
}
