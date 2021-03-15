import React, { memo } from "react";
import { BigNumber, utils } from "ethers";

interface Props {
  balance: BigNumber;
  symbol: string;
  decimals: number;
}

const Balance: React.FC<Props> = ({ balance, symbol, decimals }) => {
  return (
    <div style={{ alignContent: "flex-end", border: "2px solid white" }}>
      {balance
        ? `${Number(utils.formatUnits(balance, decimals)).toFixed(2)} ${symbol}`
        : "0"}
    </div>
  );
};

export default memo(Balance);
