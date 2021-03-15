import { BigNumber } from "ethers";
import { ActionType } from "../reducers/root";

type balanceData = {
  [symbol: string]: {
    balance: BigNumber;
    decimals: number;
  };
};

export function updateBalance(balanceData: balanceData) {
  return {
    type: ActionType.UPDATE_BALANCE,
    payload: balanceData,
  };
}

export function initiateTx() {
  return {
    type: ActionType.INITIATE_TX,
  };
}

export function txResolved() {
  return {
    type: ActionType.RESOLVED_TX,
  };
}
