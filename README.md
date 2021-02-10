# Get started

1. Clone the repo.
2. Install deps with yarn `yarn` or npm `npm install`
3. Start hardhat `npx hardhat node --watch`

```text
It runs up a Hardhat node, compile contracts, generates typescript interfaces, creates React context and instantiates your contract instances and factories with frontend provider.
```

4. Open up a new terminal
5. `cd frontend`
6. Install deps with yarn `yarn` or npm `npm install`


8. Ensure Metamask RPC is set to `http://localhost:8545` and chainID `31337`.
9. Start React app with yarn `yarn start` or npm `npm start`. The frontend should start up at http://localhost:3000/.

Because of this default hardhat.config.ts it will first try to connect with an injected provider like Metamask (web3modal package does this).

If nothing found it will try to connect with your hardhat node. On localhost and hardhat nodes it will inject your mnemonic into the frontend so you have a "browser wallet" that can both call and send transactions. NB! Dont ever put a mnemonic with actual value here.

In hardhat.config.ts there is example on how to instruct your hardhat-network to use mnemonic or privatekey.

```ts
const config: HardhatUserConfig = {
  react: {
    providerPriority: ["web3modal", "hardhat"],
  },
};
```

Ensure you are using RPC to http://localhost:8545.

You may also need to set the chainID to 31337 if you are using Hardhat blockchain development node.

## Invalid nonce.

```bash
eth_sendRawTransaction
  Invalid nonce. Expected X but got X.
```

Reset your account in Metamask.