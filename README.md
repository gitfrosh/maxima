# WORDLE on the BLOCK

This project was built by Team Maxima ([Afoma](https://github.com/Afoma), [Rike](https://github.com/gitfrosh), [Kristen](https://github.com/cuddleofdeath), [Brenda](https://github.com/mejia-b) and [Ana](https://github.com/mspuz) ) during the 2022 [web3con hackathon](https://www.web3con.dev/hackathon).

Deployed to [fleek](https://wordle-on-the-block.on.fleek.co/)!

## Get it started
### Frontend
This project is built with create-react-app and craco It stores Wordle NFTs on Fleek/Filecoin (REACT_APP_FLEEK_KEY, REACT_APP_FLEEK_SECRET).

#### `npm install`
Install dependencies.
#### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Backend
This application is built with Solidity/Hardhat on EVM. It uses Alchemy (MUMBAI_URL, RINKEBY_URL, ..) and needs your PRIVATE_KEY for deploying.
#### `npm install`
Install dependencies.

#### `npx hardhat run scripts/run.js`
Dry-run test functions on your smart contract.

#### `npx hardhat run scripts/deploy.js --network rinkeby`
Deploy your smart contract.
