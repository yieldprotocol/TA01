import { useState, useContext, useCallback, useEffect, useRef } from "react";
import {
  SignerContext,
  ProviderContext,
  CurrentAddressContext,
} from "../hardhat/SymfoniContext";
import { updateBalance } from "../actions/user";
import { useStateContext } from "../stores/state";
import { BigNumber } from "ethers";

export default function useTokenBalance(tokenContract: any) {
  const [currentAddress] = useContext(CurrentAddressContext);
  const [signer] = useContext(SignerContext);
  const [provider] = useContext(ProviderContext);
  const { dispatch } = useStateContext();
  const [decimals, setDecimals] = useState<number>(0);
  const [symbol, setSymbol] = useState<string>("");
  const [balance, setBalance] = useState(BigNumber.from("0"));

  useEffect(() => {
    async function getTokenData() {
      if (tokenContract.instance) {
        const symbol = await tokenContract.instance.symbol();
        const decimals = await tokenContract.instance.decimals();
        setSymbol(symbol);
        setDecimals(decimals);
      }
    }
    getTokenData();
  }, [tokenContract.instance]);

  // Using React ref here to prevent component re-rendering when changing
  // previous balance value
  const prevBalanceRef = useRef(balance);

  const fetchBalance = useCallback(async () => {
    if (signer && tokenContract.instance && currentAddress && symbol) {
      const balance = await tokenContract.instance.balanceOf(currentAddress);

      // Optimization: check that user balance has actually changed before
      // updating state and triggering a re-render
      if (balance !== prevBalanceRef.current) {
        prevBalanceRef.current = balance;
        dispatch(updateBalance({ [symbol]: { balance, decimals } }));
        setBalance(balance);
      }
    }
  }, [
    dispatch,
    signer,
    tokenContract.instance,
    currentAddress,
    decimals,
    symbol,
  ]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  useEffect(() => {
    // Fetch user balance on each block
    provider && provider.on("block", fetchBalance);

    // Cleanup function is used to unsubscribe from 'block' event and prevent
    // a possible memory leak in application.
    return () => {
      provider && provider.off("block", fetchBalance);
    };
  }, [fetchBalance, provider]);

  return [balance, symbol, decimals];
}
