import { utils } from "ethers";

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
  const amountFormatted = utils.parseUnits(amount, tokenDecimals);
  try {
    const tx = await tokenContract.instance?.transfer(to, amountFormatted);
    const res = await tx.wait();
    return res;
  } catch (e) {
    console.error(e);
  }
}

export async function sendEth(signer: any, to: string, amount: string) {
  const gas = (await signer?.estimateGas()) * (await signer?.getGasPrice());
  const sendAmount = utils.parseEther(amount).sub(gas);

  const tx = await signer?.sendTransaction({
    to,
    value: sendAmount,
  });

  try {
    const res = await tx.wait();
    return res;
  } catch (e) {
    console.error(e);
  }
}
