import React, { useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { abi as tokenAbi, address as tokenAddress } from '../hardhat/deployments/localhost/Token.json';
import { CurrentAddressContext } from "../hardhat/SymfoniContext";

interface Props { }

export const VicsClaim: React.FC<Props> = () => {
    
    const [vicsWallet, setVicsWallet] = useState<any>();
    const [errorMsg, setErrorMsg] = useState<any>();
    const [userAddress] = useContext(CurrentAddressContext);
    
    useEffect(() => {
        (async () => {
        /* 
        Bear in  mind >> here we are SIMULATING interaction from a connection somewhere else, not via your metamask. This a dev environment backdoor.
        When interacting with your connected metamask account for regular transactions, use the provided symfoni contexts (tokenContext or signerContext) 
        */
            const provider = new ethers.providers.JsonRpcProvider();
            setVicsWallet( 
                ethers.Wallet.fromMnemonic("test test test test test test test test test test test junk")
                .connect(provider) 
            );
            if (!tokenAddress) return
            console.log("Token is deployed at ", tokenAddress)
        })();
    }, [])

    const handleRepay = async () => {
        
        /* Bear in  mind >> here we are SIMULATING interaction from a connection somewhere else, not via your metamask. This a dev environment backdoor.
        When interacting with your connected metamask account for regular transactions, use the provided symfoni contexts (tokenContext or signerContext) 
        */
        const provider = new ethers.providers.JsonRpcProvider();
        const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);
        const contractWithSigner = tokenContract.connect(vicsWallet);

        const balance = await tokenContract.balanceOf(userAddress);
        const allowance = await tokenContract.allowance(userAddress, vicsWallet.address );

        !allowance.gt('0') && setErrorMsg('You still need to allow Vic to take from your Tokens');
        !balance.gt('0') && setErrorMsg('You gots no TST yet... steal some first!');

        if ( balance.gt('0') && allowance.gt('0'))  {
            try {
            const tx = await contractWithSigner.transferFrom(userAddress, vicsWallet.address, '10' ); 
            console.log( await tx.wait() )
            } catch (e) {
                console.log(e);
            }
        };
    }
    return (
        <div>
            <p>Click when you are ready for Vic to try take some TST back:</p>
            <button onClick={(e) => handleRepay()}>Vic is claiming back!</button>
            <p>{errorMsg}</p>
        </div>
    )
}