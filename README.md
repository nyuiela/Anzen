# ![Auzen](https://github.com/user-attachments/assets/684a61d1-d0cc-4a33-8155-87a89aedaddb)

## **Auzen**

### **About Auzen**  
Auzen is a **decentralized data storage and management platform** designed to give users **full control** over their digital assets.  
Built on **Swarm and Ethereum**, it enables **secure, censorship-resistant, and on-chain storage**, allowing individuals and organizations to **store, organize, share, and monetize** their data without relying on centralized platforms.  

Tired of having your personal data **stolen, exploited, or put at risk** by centralized platforms? **Auzen is here to change that!**  
- **Store your data securely** on a decentralized network.  
- **Control who accesses it.**  
- **Monetize your data on your terms.**  
- **Share with ZK-verified companies** while ensuring authenticity and security.  
- **Contribute without fear—your input is immutable and protected.**  

### **Video Demo link**
```
```


### **Vercel link**
```
```


---

## **Goals**
In a world where personal data is constantly **exploited, leaked, or controlled** by corporations, Auzen puts power back into the hands of users.  
By leveraging **decentralized storage, cryptographic security, and smart contract-based permissions**, Auzen ensures that data remains **secure, private, and fully owned by its creators—no third parties involved.**  

**Auzen's goal is to onboard users onto Web3 while keeping their data secure.**  

---

## **Flow Work**
- **User → Registers → Creates Vault → Uploads Data and Stores in Vault → Authorization Whitelist.**  
- **Creates Group → Joins Group → Adds Vault to Group.**  
- **User Joins Market → ZK Verification of Data → Adds Data or Vaults with Important Info (Description) → Earns.**  
- **Company (AI Company Buying People’s Data) → ZK Verification → Buys.**  
- **Company (AI Company Buying People’s Data) → Keyless Login → Buys.**  
- **Buyer → Keyless Login → Buys.**  

---

## **Features**

### **Registering**
- Users register their account (**public or private**).  
- Privacy status can be updated anytime.  

### **Groups**
- Users can create groups (**public or private**).  
- Anyone can join **public groups** since they are permissionless.  
- Private groups require an **invite from the creator**.  
- Group vaults are **accessible to all members**, and members can **add their own vaults** to the group.  

### **Uploading**
- Users upload their **data to Swarm** securely.  

### **Vault Creation**
- Users can create **multiple vaults** with **customizable settings**.  
- Files and folders can be **sorted and organized**.  

### **Authorization**
- Vault owners can **authorize specific users** to access files.  

### **Downloading**
- Accessible vault content can be **downloaded securely**.  

### **Reprogrammability (Future Feature)**
- This feature will allow users to **sell parts of their data** for new data creations.  
- **Still under development**.  

### **Marketplace**
- Marketplace creation is **admin-controlled** to prevent duplicates.  
- Users can **request marketplace creation**.  
- **Buying Data:**  
  - **Keyless buying** (ZK keyless login) means **users don’t need an account** to purchase data.  
  - After a purchase, an **event is emitted**, and the backend listens to **add msg.sender to the access list** of the purchased file or data.  
- **Entering the Marketplace:**  
  - Sellers **submit data** for sale.  
  - Sellers must **set data duration** and **bond price** (which can be **0 for free data**).  
  - Sellers submit a **witnessHash** for **ZK proof of data existence**.  
- **Activity Count:**  
  - Users’ activity count **increases with every buy or marketplace contribution**.  
  - Activity count helps users **earn rewards**.  

### **Rewards**
- **Admin distributes rewards** to **active users**.  
- **Only users with activity counts** can **claim rewards**.  

### **Fees**
- **Fees are charged on every buy** (currently only on purchases).  
- **Fee cannot exceed 20% of the bond price**.  
- **Fees are in percentage format (e.g., 2000, 1500).**  

---

## **Tech Used**
- **ZK Verification**
   - gets ref Id
   - has the file -- send it to the zk circute -- hash is attestation that the user owns the file
   - generate a witness file, which is stored on the contracct, where users provides witnessHash to verify ownership of data 
- **XRPL**
  -

  
- **Swarm**
  - run a bee node --> generates an acc to sign transaction and contribute -- send funds to account buzz token/ sDai / gnosis (seeting up)
  - interact with the local node (port 1633), backend interacts with swarm to uplad user data to swarm network
  - before you upload a file --- postage batch --- upload -- ref in return used to retrive data.

---

## **Future Improvements**
- Further **enhancements and additional features** will be implemented.
- Keyless login
- company verification model 

---

## **Getting Started**

### **Clone the Repository**
```bash
git clone https://github.com/nyuiela/Anzen
cd Anzen
cd contract
make
```


