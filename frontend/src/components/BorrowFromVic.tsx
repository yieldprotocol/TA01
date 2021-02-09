import { ethers } from 'ethers';
import React, { useContext, useEffect, useState } from 'react';
import { CurrentAddressContext, TokenContext, SignerContext } from "../hardhat/SymfoniContext";

interface Props { }

export const BorrowFromVic: React.FC<Props> = () => {

    const [ vicsWallet, setVicsWallet ]=  useState<any>();
    const addressContext = useContext<any>(CurrentAddressContext);

    /* HINT: this is how to connect to an instance of the token contract - some usage examples below */
    const token = useContext<any>(TokenContext);
    /* HINT: this is how to bring in the signerContext */
    const [ signer ] = useContext(SignerContext)

    useEffect(() => {
        (async () => {

            /* 
            Bear in mind >> here we are SIMULATING interaction from a connection somewhere else, not via your metamask. This a dev environment backdoor.
            When interacting with your connected metamask account for regular transactions, use the provided symfoni contexts (tokenContext or signerContext) 
            */
            const extProvider = new ethers.providers.JsonRpcProvider();
            setVicsWallet( 
                ethers.Wallet.fromMnemonic("test test test test test test test test test test test junk")
                .connect(extProvider) 
            );
        })();
    }, [])

    const handleInit = async () => {        
        addressContext[0] &&

        console.log('Adding 1.5 eth ... ')
        const tx = await vicsWallet.sendTransaction({
            to:  addressContext[0],
            value: ethers.utils.parseEther('1.5')
        })
        await tx.wait()
        console.log('1.5 Eth added.');

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

    }

    return (
        <div >
            <p>To help you get started, borrow 1.5 ETH from the notorious loanshark, Vic 🦈 : </p>
            <div>
                <button onClick={(e) => handleInit()}>Borrow 1.5Eth from Vic</button>
            </div>
        </div>
    )
}