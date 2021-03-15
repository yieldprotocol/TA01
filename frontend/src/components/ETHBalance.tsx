import React, { memo, useContext } from "react";
import { CurrentAddressContext } from "./../hardhat/SymfoniContext";
import { formatAddress } from "../helpers/userHelpers";
import Balance from "./Balance";
import useEthBalance from "../hooks/useEthBalance";

interface Props {}

const ETHBalance: React.FC<Props> = () => {
  const [currentAddress] = useContext(CurrentAddressContext);
  const ethBalance = useEthBalance();

  return (
    <div>
      <p>Address: {currentAddress && formatAddress(currentAddress)}</p>
      {currentAddress && (
        <Balance balance={ethBalance} symbol={"ETH"} decimals={18} />
      )}
    </div>
  );
};

export default memo(ETHBalance);
