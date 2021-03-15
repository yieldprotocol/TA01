import React, { useContext, useReducer, Dispatch, createContext } from "react";
import { rootReducer } from "../reducers/root";

export interface StateContext {
  user: User;
  application: Application;
}

interface User {
  txPending: boolean;
  balances: any;
}

interface Application {
  vicsWallet: any;
}

export interface StateAction {
  type: string;
  payload: any;
}

export interface Store {
  state: StateContext;
  dispatch?: Dispatch<StateAction>;
}

const initialState: StateContext = {
  user: {
    txPending: false,
    balances: {},
  },

  application: { vicsWallet: "" },
};

const store = createContext<Store>({ state: initialState });
const { Provider } = store;

export const useStateContext = () => useContext(store);

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  return <Provider value={{ state, dispatch }} children={children} />;
};
