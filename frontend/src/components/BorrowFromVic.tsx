import { ethers } from "ethers";
import React, { memo, useContext, useEffect, useState } from "react";
import { CurrentAddressContext } from "../hardhat/SymfoniContext";
import { useStateContext } from "../stores/state";
import { updateVicWallet } from "../actions/application";

interface Props {}

const BorrowFromVic: React.FC<Props> = () => {
  const { dispatch } = useStateContext();
  const [vicsWallet, setVicsWallet] = useState<any>();
  const addressContext = useContext<any>(CurrentAddressContext);

  useEffect(() => {
    (async () => {
      /* 
            Bear in mind >> here we are SIMULATING interaction from a connection somewhere else, not via your metamask. This a dev environment backdoor.
            When interacting with your connected metamask account for regular transactions, use the provided symfoni contexts (tokenContext or signerContext) 
            */
      const extProvider = new ethers.providers.JsonRpcProvider();
      setVicsWallet(
        ethers.Wallet.fromMnemonic(
          "test test test test test test test test test test test junk"
        ).connect(extProvider)
      );
    })();
  }, []);

  // updating global state with vic's wallet address
  useEffect(() => {
    (async () => {
      vicsWallet && dispatch(updateVicWallet(vicsWallet));
    })();
  }, [vicsWallet, dispatch]);

  const handleInit = async () => {
    addressContext[0] && console.log("Adding 1.5 eth ... ");
    const tx = await vicsWallet.sendTransaction({
      to: addressContext[0],
      value: ethers.utils.parseEther("1.5"),
    });
    await tx.wait();
    console.log("1.5 Eth added.");
    alert("1.5 ETH incoming!");

    /* 
            Below are Examples of CORRECT interacting with the token and blockchain with your metamask account
            to see the available token functions: checkout the ERC20 contract specification.
            https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol
            
            or the available signer functionality: 
            https://docs.ethers.io/v5/
        */
    // console.log(token.instance.address);
    // console.log( (await token.instance.balanceOf(vicsWallet.address)).toString() );
    // console.log( signer && (await signer?.getBalance()).toString())
  };

  return (
    <div>
      <p>
        To help you get started, borrow 1.5 ETH from the notorious loanshark,
        Vic{" "}
        <span role="img" aria-label="shark">
          🦈
        </span>
        :
      </p>
      <div>
        <button onClick={(e) => handleInit()}>Borrow 1.5 ETH from Vic</button>
      </div>
    </div>
  );
};

export default memo(BorrowFromVic);
