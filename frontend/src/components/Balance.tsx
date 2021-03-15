import { BigNumber, utils } from "ethers";
import React from "react";

interface Props {
  balance: BigNumber;
  symbol: string;
  decimals: number;
}

export const Balance: React.FC<Props> = ({ balance, symbol, decimals }) => {
  return (
    <div style={{ alignContent: "flex-end", border: "2px solid white" }}>
      {balance &&
        `${Number(utils.formatUnits(balance, decimals)).toFixed(2)} ${symbol}`}
    </div>
  );
};

export default Balance;
