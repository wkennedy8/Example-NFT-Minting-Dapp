# Basic NFT Minting Dapp

This project demonstrates a basic NFT Minting use case. It comes with a reveal feature that only the owner of the deployed contract can change. We also keep track of whitelisted users who are allowed to mint if added to the array.

Try running some of the following tasks:

```shell
yarn
yarn run dev
```

## Deploying Contract after changes

Please take a look at the `scripts/deploy.js` file to change \_NAME, \_SYMBOL, \_INITBASEURI, \_INITNOTREVELEADURI

To deploy contract after changes run:

```shell
npx hardhat run scripts/deploy.js
```
