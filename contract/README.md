### Gameplan

## onchange DAta storage

spanning over memories, historical data, (reprogrammable data),
Access control - Monetization and source <- data mapping.

q: how do we store the data?? swarm
q: how can we map and attach metadata ? through smartcontract?
q:
(EVERYTHING HERE IS ACCESS CONTROL.) - getting hash from the contract with the right access.

content creators -------- traveler ---- friends teens --- ONlyfans --- rearchers

their data> swarm --> upload to the ebbeeees ---> hash ---hash && signature of user ----- thvalue ID ()user ----(s()encrypt encrypt
user --> adds a bond needed to access

interestedviewerorreprogrammer----> value ID(user) --> bond ---> user(approves the transctaion) --> access granted , can see this person vault stuff .

reprogrammerable ---- >

**AccessControl**

**DataSHaring**

user ---> platoform ----> createstorage(uinique stoage, upload and group a)ll ------

## swarm

1. data encryption
   https://docs.ethswarm.org/docs/develop/access-the-swarm/store-with-encryption/

2. erasure coding
   https://docs.ethswarm.org/docs/develop/introduction/ - - - - -

3. upload && download
   **/bytes** - Used for uploading raw data, lacks convenience features present in the /bzz endpoint but allows for greater customization for advanced use cases.
   **/bzz** - Used for general download and uploads of files or collections of files.
   **/chunks** - Used for downloading and uploading individual chunks, and also for uploading streams of chunks.

-- upload on swarm require a fee
sdai - sbzz ---- postage swarm 20.... 10 picture --- over time 10 values dcreseas ==== 0
**postage swarm**
Batch buckets

upkeeping the popularity of your content......

1...posts a picture --- nah ugly , i dont wanan see that version of me for long term ....

## this we will need to implement Swarm(https://docs.ethswarm.org/docs/develop/introduction/)

-- api -- swarm features .https://docs.ethswarm.org/api/

-- proxies --- https://docs.ethswarm.org/docs/develop/tools-and-features/gateway-proxy

## swarm contract (work with the swarm)

## vault factory

## vault --- cloned

- createVault() //multiple vaults
- upload()
- download()
- ListVaults() onlyOwner() ---- getter function
- getData(vaultId, dataId, accesscode)
- getFolder(vaulId, dataId[], accesscode);
- removeVault
- removeData
- removefolder
- generateAccessCodes(vaultId,data/data[], user);
-

## userConfig&& Connect(public && private)

- connect
- updateUserProfile(can change from public to private)
- getProfiles
- requestAccessToProfile
- acceptRequest
- removeFromProfileAccess
- addprofilepicture
- updateProfilepicture
- createGroup

## nftProfilePicture

-erc721 stuff

## Monetize

- data -> assigne access fee.
- data (partial) -> assign particial fee.
- monetize(vaultId, dataId, accessCode)

//- reprogrammed chunks -> fee paid to the data owner according to chunk size.(!mvp)

## reprogammable data (!mvp)

## What our contract will do

- Monetization - being able to make from data.
- upload / Download - metadata, store decryption (locking user in),
- Access control
- reprogrammable data.
