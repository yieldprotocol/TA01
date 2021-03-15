import { useState, useContext, useCallback, useEffect, useRef } from "react";
import { SignerContext, ProviderContext } from "../hardhat/SymfoniContext";
import { updateBalance } from "../actions/user";
import { useStateContext } from "../stores/state";
import { BigNumber } from "ethers";

export default function useEthBalance() {
  const [signer] = useContext(SignerContext);
  const [provider] = useContext(ProviderContext);
  const { dispatch } = useStateContext();
  const [balance, setBalance] = useState(BigNumber.from("0"));

  // Using React ref here to prevent component re-rendering when changing
  // previous balance value
  const prevBalanceRef = useRef(balance);

  const fetchBalance = useCallback(async () => {
    if (signer) {
      const balance = await signer.getBalance();

      // Optimization: check that user balance has actually changed before
      // updating state and triggering a re-render
      if (balance !== prevBalanceRef.current) {
        prevBalanceRef.current = balance;
        dispatch(updateBalance({ ETH: { balance, decimals: 18 } }));
        setBalance(balance);
      }
    }
  }, [signer]);

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

  return balance;
}
