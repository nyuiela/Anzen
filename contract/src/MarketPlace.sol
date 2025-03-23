// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract MArketPlace is Ownable, ReentrancyGuard {
    IERC20 quoteAsset;
    uint256 public marketCount;
    mapping(uint256 => mapping(address => UserPosition)) public userPositions;
    event MarketCreated(
        uint256 indexed marketId,
        uint256 lockDuration,
        uint256 reward
    );

    struct Market {
        string marketName;
        uint256 duration;
        uint256 reward; // 2% fee
        uint256 totalDeposits;
        bytes32[] files;
        address[] vaults;
    }

    struct Files {
        //string _name;
        bytes32 id;
        uint256 reward /**bond */;
        // uint256 lockperiod;
        uint256 bond;
        string des;
        address owner;
    }

    struct UserPosition {
        uint256 amount;
        uint256 lockEndTime;
        bytes32[] Files;
        uint256 bond;
        bool exists;
        string description;
    }
    mapping(uint256 => Market) public market;
    //  Files[] private files;
    mapping(uint256 => Files[]) private files;

    constructor(
        address initialOwner,
        address quoteAssetAddress,
        address
    ) Ownable(initialOwner) {
        //raacToken = IERC20(_raacToken);
        // decrvUSDToken = IERC20(_decrvUSDToken);
        quoteAsset = IERC20(quoteAssetAddress);
    }

struct MarketRequest {
    string marketName;
    uint256 duration;
    uint256 reward;
    address creator;
    uint256 totalDeposits;
    bool exists;
}
mapping(uint256 => MarketRequest) public marketRequests;

function requestMarketCreation( string memory _marketName,
        uint256 _duration,
        uint256 _reward) external {
            // make sure the martket does not exist
            uint256 RId = keccak256(abi.encodePacked(_marketName));

       // MarketRequest storage request = marketRequests[msg.sender];   
        marketRequests[RId] = MarketRequest({
            marketName: _marketName,
            duration: _duration,
            reward: _reward,
            creator: msg.sender,
            totalDeposits: 0,
            exists: true
        }); 

}

function getRequestion(uint256 _requestId) external view returns (string memory, uint256, uint256, address, uint256, bool) {
MarketRequest memory request = marketRequests[_requestId];

return (request.marketName, request.duration, request.reward, request.creator, request.totalDeposits, request.exists);
}

function createRequestedMarket(uint256 _requestId) external onlyOwner {
   (string memory _marketName, uint256 _duration, uint256 _reward) = getRequestion(_requestId);
    
    marketRequests[_requestId].exists = false;
    marketRequests[_requestId].delete;

    createMarket(_marketName, _duration, _reward);
}

    function createMarket(
        string memory _marketName,
        uint256 _duration,
        uint256 _reward
    ) external onlyOwner {
        marketCount++;
        market[marketCount] = Market({
            marketName: _marketName,
            duration: _duration,
            reward: _reward,
            totalDeposits: 0,
            vaults: new address[](0)
        });

        emit MarketCreated(marketCount, _duration, _reward);
    }

    function getFiles(
        uint256 _marketId
    ) external view returns (Files[] memory) {
        return files[_marketId];
    }

uint256 private accumulatedFees;
    //erc20 payment
    //see the file
    // buys, pays the bond
    // they get the access code then they view or whatever
    //should triger a tx for the older of the id, when theoner signs it he receives the moeny , sim the buyer gets the acces code
    function buy(uint256 _marketId, uint256 id) external {
        activity();
     require ( files[_marketId][id].duration > block.timestamp, "MarketPlace: File is no longer available");
     Market storage _market = market[_marketId];

         uint256 _amount = files[_marketId][id].bond;

        (uint256 fee )= calculateProtocolFee(_amount);

        uint256 amountToadd = _amount - fee;
       accumulatedFee += fee; 
    _market.totalDeposits += amountToadd;
        //   _market.duration;
    (address owner)= getOwnerOf(_marketId, id);
    UserPosition storage position = userPositions[_marketId][msg.sender];
    uint256 previousamount = position.amount;  
    position.amount = previousamount + amountToadd;


        
     quoteAsset.transferFrom(msg.sender, address(this), _amount);

        // after buying each buyer gets a unique access code, they enter it and view or download or whatever it  is

        // generate uinque hash aka access code
        // create something like the signature digest or a root to break the has and get the req and give user //
        //aggreed on emitting eent and backend listening in to autorize msg.sender
    }


function getOwnerOf(uint256 _marketId, uint256 id) external view returns (address) {
    return files[_marketId][id].owner;
 
    }
    function EnterMarket(bytes32 _id, uint256 _marketId, uint256 _amount, uint256 bond, string memory description) external view {
        activity();
        Market storage _market = market[_marketId];
        UserPosition storage position = userPositions[_marketId][msg.sender];
        addTomarket(_id, _marketId, _amount, bond, description);
    }

function addVaultToMarket(uint256 _marketId, address _vault) external {
     Market storage _market = market[_marketId];
     _market.vaults.push(_vault);

}


function withdrawShare(uint256 _amountTowithdraw, uint256 _marketId) external {
      UserPosition storage position = userPositions[_marketId][msg.sender];

      uint256 amountmade = position.amount;

      require(_amountTowithdraw <= amountmade , "MarketPlace_NOt_EnoughFunds");
      
 
     onWithdraw(_amountTowithdraw, _marketId);

      quote.transferFrom(address(this), msg.sender , _amount);
       
}

function ensureLiquidity(uint256 _amountTowithdraw) internal {
     require(address(this).balance > _amountTowithdraw,"MarketPlace__contact_doest_have_enough_balance");
}

function onWithdraw(uint256 amount, _marketId) internal {
    ensureLiquidity(amount);
Market storage _market = market[_marketId];
    _market.totalDeposits -= _amount;

}

uint256 private nonce;

mapping(address => uint256) private activityCount; 
function activity() internal returns(uint256 count){

    count = nonce++;

    activityCount[msg.sender][count];
}


function getActivityCount() public view returns(uint256 _count) {
 _count = activityCount[msg.sender][count];

}

function addReward()external onlyOwner {}

function calculateReward() internal return(uint256 reward){}

function claimRward() public {}

function calculateProtocolFees(uint256 amount) external view returns(uint256 fee){

   // leftamount = amount.mulDiv()
  fee  = (amount * feerange) / BIPS;
  
  fee == 0 ? WAD : fee ; 

}

function withdrawProtocolFees(uint256 _amount)external {
    uint256 profit = accumlatedFee;
    
    require(profit >= _amount, "MarketPlace__Not_enough_profit");

    accumlatedFee = profit - _amount;

    require(address(this).balance > _amount,"MarketPlace__contact_doest_have_enough_balance");

    quote.transferFrom(address(this), feeREceiver, _amount);
 
}

uint256 public constant BIPS = 10_000;

uint256 public constant FeeLimit = 2000;
uint256 public feerange;
function setFeeRange(uint256 _newRange) external {
    require(_newRanger < FeeLimit, "MarketPLace_canNot_Be_more_Than_limit");
    feerange = _newRange;
}

address public feeREceiver = keccak256(abi.encode("feeReceiver"));
function setFeeReceiver(address _newFeeReceiver) external {
    feeREceiver = _newFeeReceiver;
    emit FeeReceiverUpdated(feeReceiver, _newFeeReceiver);
}

event FeeReceiverUpdated(address indexed oldAddress, address indexed newAddress)




    //  function participateAsConsumer(uint256 _marketId, address _user) external {
    //    Market storage market = market[_marketId];
    // () = getMarketInfo(_marketId);
    // UserPosition storage position = userPositions[_marketId][msg.sender];

    //  (uint256, uint256, bool) = getUserPosition(_marketId, _user);
    //   }

    //  function buyviewDownload(uint256 _marketId, address _user) external{
    //    (,,)  = getUserPosition(_marketId, _user)
    //  }

    function addTomarket(
        bytes32 _id,
        uint256 _marketId,
        uint256 _amount,
        uint256 _bond,
        string memory description //   bytes32 accessCode;
    ) internal {
        UserPosition storage position = userPositions[_marketId][msg.sender];
        if (position.exists) {
            files[_marketId].push(
                Files({id: _id, reward: _amount, bond: _bond, des: description, owner: msg.sender})
            );
        } else {
            userPositions[_marketId][msg.sender] = UserPosition(
                _amount,
                0,
                new bytes32[](1),
                _bond,
                true,
                description
            );
            files[_marketId].push(
                Files({id: _id, reward: _amount, bond: _bond, des: description, owner: msg.sender})
            );
        }
    }

    function getUserPosition(
        uint256 _marketId,
        address user
    ) public view returns (uint256, uint256, bool) {
        UserPosition storage position = userPositions[_marketId][user];
        return (position.amount, position.lockEndTime, position.exists);
    }

    function getMarketInfo(
        uint256 marketId
    ) external view returns (string memory, uint256, uint256, uint256, address) {
        Market storage _market = market[marketId];
        return (
            // _market.quoteAsset,
            _market.marketName,
            _market.duration,
            _market.reward,
            _market.totalDeposits,
            _market.vaults
        );
    }

    //  function
}