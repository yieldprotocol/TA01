import React, { useContext } from "react";
import {
  CurrentAddressContext,
  TokenContext,
} from "./../hardhat/SymfoniContext";
import Balance from "./Balance";
import useTokenBalance from "../hooks/useTokenBalance";

interface Props {}

export const TSTBalance: React.FC<Props> = () => {
  const [currentAddress] = useContext(CurrentAddressContext);
  const tokenContract = useContext(TokenContext);
  const [balance, symbol, decimals] = useTokenBalance(tokenContract);

  return (
    <div>
      <div>{symbol && <p> {`${symbol} token balance:`}</p>}</div>
      {currentAddress && balance && (
        <Balance balance={balance} symbol={symbol} decimals={decimals} />
      )}
    </div>
  );
};

export default TSTBalance;
