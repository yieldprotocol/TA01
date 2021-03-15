import React, { useContext, useState } from "react";
import { ethers } from "ethers";
import { TokenContext } from "../hardhat/SymfoniContext";
import { useStateContext } from "../stores/state";
import { sendToken, sendEth } from "../helpers/userHelpers";

interface Props {}
interface SendForm {
  toAddress: string;
  amount: string;
}

export const SendEthForm: React.FC<Props> = () => {
  const tokenContract = useContext(TokenContext);
  const {
    state: { user, application },
  } = useStateContext();

  const initialFormState = {
    toAddress: "",
    amount: "",
  };

  const [fData, setFData] = useState<SendForm>(initialFormState);

  const handleSendToken = async () => {
    if (!ethers.utils.isAddress(fData.toAddress))
      return alert("not a valid address!");

    if (Number(fData.amount) > user.ethBalance)
      return alert("insufficient TST funds!");

    try {
      await tokenContract.instance?.transfer(
        fData.toAddress,
        ethers.utils.parseUnits(
          fData.amount.toString(),
          user.balances["TST"].decimals
        )
      );

      alert(`you sent ${fData.amount} TST to ${fData.toAddress}`);

      setFData(initialFormState);
    } catch (error) {
      alert("make sure to input a valid address and amount");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  const handleUseSharkAddress = () => {
    setFData((fData) => ({
      ...fData,
      toAddress: application.vicsWallet.address,
    }));
  };

  return (
    <div className="SendTokenForm">
      <p>{`Send${user.txPending ? "ing" : ""} ${"TST"}`}</p>
      <div>
        <label htmlFor="toAddress">To (address): </label>
        <input
          name="toAddress"
          type="text"
          value={fData.toAddress}
          placeholder={`to address`}
          onChange={handleChange}
          required
        />
        <button onClick={handleUseSharkAddress}>Use Loan Shark Address</button>
      </div>
      <div>
        <label htmlFor="amount">Amount: </label>
        <input
          name="amount"
          type="number"
          value={fData.amount}
          placeholder={`amount`}
          onChange={handleChange}
          required
        />
      </div>
      <button onClick={handleSendToken}>Send</button>
    </div>
  );
};

export default SendEthForm;
