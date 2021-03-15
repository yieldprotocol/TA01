import React, { memo, useContext, useState } from "react";
import { utils } from "ethers";
import { SignerContext, TokenContext } from "../hardhat/SymfoniContext";
import { useStateContext } from "../stores/state";
import { sendToken, sendEth } from "../helpers/userHelpers";

interface Props {
  symbol: string;
}

interface Form {
  toAddress: string;
  amount: string;
}

const SendForm: React.FC<Props> = ({ symbol }) => {
  const {
    state: { user, application },
  } = useStateContext();
  const [signer] = useContext(SignerContext);
  const tokenContract = useContext(TokenContext);
  const currBalanceItem = user.balances[symbol];

  const initialFormState = {
    toAddress: "",
    amount: "",
  };

  const [fData, setFData] = useState<Form>(initialFormState);

  const handleSend = async () => {
    if (!utils.isAddress(fData.toAddress)) return alert("not a valid address!");
    if (utils.parseUnits(fData.amount, currBalanceItem.decimals).lte("0"))
      return alert("must be a valid amount");

    if (
      utils
        .parseUnits(fData.amount, currBalanceItem.decimals)
        .gt(currBalanceItem.balance)
    )
      return alert(`insufficient ${symbol} funds!`);

    try {
      if (symbol === "ETH") {
        sendEth(signer, fData.toAddress, fData.amount);
      } else {
        sendToken(
          tokenContract,
          fData.toAddress,
          fData.amount,
          currBalanceItem.decimals
        );
      }

      alert(`sending ${fData.amount} ${symbol} to ${fData.toAddress}`);

      setFData(initialFormState);
    } catch (e) {
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

  const handleUseMaxBalance = () => {
    setFData((fData) => ({
      ...fData,
      amount: utils.formatUnits(
        currBalanceItem.balance,
        currBalanceItem.decimals
      ),
    }));
  };

  if (!currBalanceItem) return null;

  return (
    <div className="SendEthForm">
      <p>{`Send${user.txPending ? "ing" : ""} ${symbol}`}</p>
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
        <button onClick={handleUseMaxBalance}>Max</button>
      </div>
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default memo(SendForm);
