import { BigNumber, utils } from "ethers";

export function formatAddress(addr: string) {
  return (
    addr &&
    addr.substring(0, 6) + "..." + addr.substring(addr.length - 4, addr.length)
  );
}

export async function sendToken(
  tokenContract: any,
  to: string,
  amount: string,
  tokenDecimals: number
) {
  const amountFormmated = utils.parseUnits(amount, tokenDecimals);
  await tokenContract.instance?.transfer(to, amountFormmated);
}

export async function sendEth(signer: any, to: string, amount: string) {
  const gas = (await signer?.estimateGas()) * (await signer?.getGasPrice());
  const sendAmount = utils.parseEther(amount).sub(gas);

  console.log(gas);
  console.log(utils.formatEther(sendAmount));
  await signer?.sendTransaction({
    to,
    value: sendAmount,
  });
}
