import React, { memo, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  abi as tokenAbi,
  address as tokenAddress,
} from "../hardhat/deployments/localhost/Token.json";
import { CurrentAddressContext, TokenContext } from "../hardhat/SymfoniContext";
import { useStateContext } from "../stores/state";

interface Props {}

const VicsClaim: React.FC<Props> = () => {
  const [vicsWallet, setVicsWallet] = useState<any>();
  const [errorMsg, setErrorMsg] = useState<any>();
  const [userAddress] = useContext(CurrentAddressContext);
  const {
    state: {
      user: { balances },
    },
  } = useStateContext();
  const tokenContract = useContext(TokenContext);
  const [hasApprovedMax, setHasApprovedMax] = useState(false);

  useEffect(() => {
    (async () => {
      /* 
        Bear in  mind >> here we are SIMULATING interaction from a connection somewhere else, not via your metamask. This a dev environment backdoor.
        When interacting with your connected metamask account for regular transactions, use the provided symfoni contexts (tokenContext or signerContext) 
        */
      const provider = new ethers.providers.JsonRpcProvider();
      setVicsWallet(
        ethers.Wallet.fromMnemonic(
          "test test test test test test test test test test test junk"
        ).connect(provider)
      );
      if (!tokenAddress) return;
      console.log("Token is deployed at ", tokenAddress);
    })();
  }, []);

  const approveMax = async () => {
    // allow vic to take max number of tokens; using tokencontract instance
    try {
      const tx = await tokenContract.instance?.approve(
        vicsWallet.address,
        ethers.constants.MaxUint256
      );
      await tx?.wait();
      setHasApprovedMax(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRepay = async () => {
    /* Bear in  mind >> here we are SIMULATING interaction from a connection somewhere else, not via your metamask. This a dev environment backdoor.
        When interacting with your connected metamask account for regular transactions, use the provided symfoni contexts (tokenContext or signerContext) 
        */
    const provider = new ethers.providers.JsonRpcProvider();
    const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);
    const contractWithSigner = tokenContract.connect(vicsWallet);

    const balance = await tokenContract.balanceOf(userAddress);
    const allowance = await tokenContract.allowance(
      userAddress,
      vicsWallet.address
    );

    !allowance.gt("0") &&
      setErrorMsg("You still need to allow Vic to take from your Tokens");
    !balance.gt("0") && setErrorMsg("You gots no TST yet... steal some first!");

    // vic is taking an abritrary 10 TST
    const sendAmount = "10";
    const sendAmountFormatted = ethers.utils.parseUnits(
      "10",
      balances["TST"].decimals
    );

    if (balance.lt(sendAmountFormatted)) {
      setErrorMsg(
        "Vic didn't take any of your tokens, since you don't have a lot"
      );
      return;
    }

    if (allowance.lt(sendAmountFormatted)) {
      setErrorMsg(
        "Please let Vic spend all your tokens by hitting the approve max button"
      );
    }

    if (balance.gt("0") && allowance.gt("0")) {
      try {
        const tx = await contractWithSigner.transferFrom(
          userAddress,
          vicsWallet.address,
          sendAmountFormatted
        );

        alert(`Sending ${sendAmount} TST to Vic!`);
        console.log(await tx.wait());
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    async function checkUserAllowedMax() {
      if (userAddress && vicsWallet) {
        const allowance = await tokenContract.instance?.allowance(
          userAddress,
          vicsWallet.address
        );
        allowance?.eq(ethers.constants.MaxUint256) && setHasApprovedMax(true);
      }
    }

    checkUserAllowedMax();
  }, [userAddress, vicsWallet, tokenContract.instance]);

  return (
    <div>
      <p>Click when you are ready for Vic to try take some TST back:</p>
      <button onClick={(e) => handleRepay()}>Vic is claiming back!</button>
      <button onClick={(e) => approveMax()} disabled={hasApprovedMax}>
        Approve Max Spend!
      </button>
      <p>{errorMsg}</p>
    </div>
  );
};

export default memo(VicsClaim);
