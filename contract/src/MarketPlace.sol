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
    }

    struct Files {
        //string _name;
        bytes32 id;
        uint256 reward /**bond */;
        // uint256 lockperiod;
        uint256 bond;
    }

    struct UserPosition {
        uint256 amount;
        uint256 lockEndTime;
        bytes32[] Files;
        uint256 bond;
        bool exists;
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
            totalDeposits: 0
        });

        emit MarketCreated(marketCount, _duration, _reward);
    }

    function getFiles(
        uint256 _marketId
    ) external view returns (Files[] memory) {
        return files[_marketId];
    }

    //erc20 payment
    //see the file
    // buys, pays the bond
    // they get the access code then they view or whatever
    //should triger a tx for the older of the id, when theoner signs it he receives the moeny , sim the buyer gets the acces code
    function buy(uint256 _marketId, uint256 id) external {
        //   Market storage _market = market[_marketId];
        //   _market.duration;
        uint256 _amount = files[_marketId][id].bond;
        quoteAsset.transferFrom(msg.sender, address(this), _amount);
    }

    function participateAsCreator(uint256 _marketId) external view {
        Market storage _market = market[_marketId];
        UserPosition storage position = userPositions[_marketId][msg.sender];
    }

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
        uint256 _bond //   bytes32 accessCode;
    ) external {
        UserPosition storage position = userPositions[_marketId][msg.sender];
        if (position.exists) {
            files[_marketId].push(
                Files({id: _id, reward: _amount, bond: _bond})
            );
        } else {
            userPositions[_marketId][msg.sender] = UserPosition(
                _amount,
                0,
                new bytes32[](1),
                _bond,
                true
            );
            files[_marketId].push(
                Files({id: _id, reward: _amount, bond: _bond})
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
    ) external view returns (string memory, uint256, uint256, uint256) {
        Market storage _market = market[marketId];
        return (
            // _market.quoteAsset,
            _market.marketName,
            _market.duration,
            _market.reward,
            _market.totalDeposits
        );
    }

    //  function
}