
![auzen](https://github.com/user-attachments/assets/684a61d1-d0cc-4a33-8155-87a89aedaddb)

### Auzen

*About Auzen*
Auzen is a decentralized data storage and management platform designed to give users full control over their digital assets. 
Built on Swarm and Ethereum, it enables secure, censorship-resistant, and on-chain storage, allowing individuals and organizations to store,
organize, share, and monetize their data without relying on centralized platforms.

Tired of having your personal data stolen, exploited, or put at risk by centralized platforms? Auzen is here to change that! Store your data securely on a decentralized network, control who accesses it, and monetize it on your terms. Share with ZK-verified companies while ensuring authenticity and security. Contribute without fear—your input is immutable and protected. 

*Video Demo link*
```
```
*Vercel link*
```
```

## Goals
In a world where personal data is constantly exploited, leaked, or controlled by corporations, Auzen puts power back into the hands of users. 
By leveraging decentralized storage, cryptographic security, and smart contract-based permissions, Auzen ensures that data remains secure, private, and fully owned by its creators—no third parties involved.
Auzen's goal is to onboard users on web3 while keeping their data secured. 

## Flow work


## Features

**Registering:** 
uses resgister their account (account can be public or Private)-- Privacy status can be updated

**Groups:**
user can create group(can be public or private) anyone can join public groups since its permissionless, user needs to add people to private group.(Group vault is accessible by all members, members can also add their vaults in group) user can create as many vaults as they want.

**Uploading:**
users upload their data to swarm.

**Creation (creating Vault):**
user can create as many vault as they want
vault is customizable 
files and folders can be sorted 

**Autorization:**
vault owner can autorize anyone to view files in vault. By directing adding the persson to access list.

**Downloading:**
accessable vault content can be downlaoded 

**Reprogramability:**
This is a feature that allows users to buy parts of a user data and use to to make a new data.
Tis feature hasnt been implemented yet and is one of the many future implematation features.

**MarketPlace:**
Creation of market is ownable(onlyAdmin) so has to prevent duplicate markets in the system.
users can request creation of markets.

buy - buying from market is keyless -- thhis means you dont have to be a registered user to purchase data from the market. (zk keyless login). After a purchase has been made and event is emitted and the backend listen to that even to include msg.sender to the authorization to that file or data purchced. 

entermaket - data seller can entermarket, add files and vault . they are require to indicate the data duration in the market and the bond(amount required to buy). Note: bond can be 0 (meaning that data is free). User is require to submit a witnessHash to prove existance of data. (zk proof)

activity count -- whenever a user makes a buy or adds data to the market, their activity count incease. Activity count enables users to earn rewards.

**Reward:**
Rewards are added by adnin and distributed.
Only users with activity count can claim reward.

**Fee**
fee is charged on every buy. for now  we add fee to just the buy function but maybe over time it might apply to the entermarket function.
Fee cannot be more that 20% of bond(amount). Fee is in percentage (2000, 1500).

## Tech used

*ZK verification*

*XRPL*

*swarm*


## Future improvement

### Getting started

```
git clone https://github.com/nyuiela/Anzen
cd Anzen
cd contract
make
```

*run test*
```
forge test
```

