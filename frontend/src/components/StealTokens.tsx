import React, { useContext, useState } from "react";
import { ethers } from "ethers";
import {
  CurrentAddressContext,
  TokenContext,
} from "./../hardhat/SymfoniContext";
import { useStateContext } from "../stores/state";

interface Props {}

export const ETHBalance: React.FC<Props> = () => {
  const [currentAddress] = useContext(CurrentAddressContext);
  const tokenContract = useContext<any>(TokenContext);
  const {
    state: {
      application: { vicsWallet },
    },
  } = useStateContext();
  const [inputAmount, setInputAmount] = useState<string>("");

  const handleStealTST = async () => {
    const decimals = await tokenContract.instance.decimals();
    const formattedInput = ethers.utils
      .parseUnits(inputAmount, decimals)
      .toString();

    const contractWithVicSigner = tokenContract.instance.connect(vicsWallet);

    const tx = await contractWithVicSigner.transfer(
      currentAddress,
      formattedInput
    );

    alert(`${inputAmount} TST incoming!`);

    await tx.wait();

    setInputAmount("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAmount(e.target.value);
  };

  return (
    <div className="StealTokens">
      <div>
        <p> Get some TST (Test Tokens) </p>
      </div>
      <div>
        <p style={{ fontSize: "14px" }}>
          <strong>I know a someone who has loads,... 🦈 ! </strong>
        </p>
        <p style={{ fontSize: "14px" }}>
          Vic's account holds a lot of TST. Help yourself to it - she left her
          key under the mat.
        </p>
        <input
          name="input-amount"
          value={inputAmount}
          placeholder="amount to steal"
          type="number"
          onChange={handleInputChange}
        />
        <button onClick={handleStealTST}>Steal TST!</button>
      </div>
    </div>
  );
};

export default ETHBalance;
