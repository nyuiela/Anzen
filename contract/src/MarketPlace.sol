// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract MarketPlace is Ownable, ReentrancyGuard {
    IERC20 quoteAsset;
    IERC20 rewardToken;
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
        uint256 duration;
        uint256 bond;
        string des;
        address owner;
        bytes32 witnessHash;
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
        address quoteAssetAddress
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

    function requestMarketCreation(
        string memory _marketName,
        uint256 _duration,
        uint256 _rewards
    ) external {
        // make sure the martket does not exist
        bytes32 rId = keccak256(abi.encodePacked(_marketName));
        uint256 id = uint256(rId);
        // MarketRequest storage request = marketRequests[msg.sender];
        marketRequests[id] = MarketRequest({
            marketName: _marketName,
            duration: _duration,
            reward: _rewards,
            creator: msg.sender,
            totalDeposits: 0,
            exists: true
        });
    }

    function getRequests(
        uint256 _requestId
    )
        public
        view
        returns (string memory, uint256, uint256, address, uint256, bool)
    {
        MarketRequest memory request = marketRequests[_requestId];

        return (
            request.marketName,
            request.duration,
            request.reward,
            request.creator,
            request.totalDeposits,
            request.exists
        );
    }

    function createMarket(
        string memory _marketName,
        uint256 _duration,
        uint256 _rewards
    ) public onlyOwner {
        marketCount++;
        market[marketCount] = Market({
            marketName: _marketName,
            duration: _duration,
            reward: _rewards,
            totalDeposits: 0,
            files: new bytes32[](0),
            vaults: new address[](0)
        });

        emit MarketCreated(marketCount, _duration, _rewards);
    }

    function createRequestedMarket(uint256 _requestId) external {
        (
            string memory _marketName,
            uint256 _duration,
            uint256 _rewards,
            ,
            ,

        ) = getRequests(_requestId);

        marketRequests[_requestId].exists = false;
        delete marketRequests[_requestId]; // delete?

        createMarket(_marketName, _duration, _rewards);
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
        require(
            files[_marketId][id].duration > block.timestamp,
            "MarketPlace: File is no longer available"
        );
        Market storage _market = market[_marketId];

        uint256 _amount = files[_marketId][id].bond;

        uint256 fee = calculateProtocolFees(_amount);

        uint256 amountToadd = _amount - fee;
        accumulatedFees += fee;
        _market.totalDeposits += amountToadd;
        //   _market.duration;
        address owner = getOwnerOf(_marketId, id);
        UserPosition storage position = userPositions[_marketId][owner];
        uint256 previousamount = position.amount;
        position.amount = previousamount + amountToadd;

        quoteAsset.transferFrom(msg.sender, address(this), _amount);

        // after buying each buyer gets a unique access code, they enter it and view or download or whatever it  is

        // generate uinque hash aka access code
        // create something like the signature digest or a root to break the has and get the req and give user //
        //aggreed on emitting eent and backend listening in to autorize msg.sender
        emit Bought(msg.sender, owner, _amount, _marketId);
    }

    event Bought(
        address indexed person,
        address indexed owner,
        uint256 amount,
        uint256 marketId
    );

    function calculateProtocolFees(
        uint256 amount
    ) public view returns (uint256 fee) {
        // leftamount = amount.mulDiv()
        fee = (amount * feerange) / BIPS;

        fee == 0 ? WAD : fee;
    }

    uint256 public constant WAD = 1e18;

    function getOwnerOf(
        uint256 _marketId,
        uint256 id
    ) public view returns (address) {
        return files[_marketId][id].owner;
    }

    function EnterMarket(
        bytes32 _id,
        uint256 _marketId,
        uint256 _amount,
        uint256 _duration,
        uint256 _bond,
        string memory _description,
        bytes32 _witnessHash
    ) external {
        activity();
        Market storage _market = market[_marketId];
        UserPosition storage position = userPositions[_marketId][msg.sender];
        addTomarket(
            _id,
            _marketId,
            _amount,
            _duration,
            _bond,
            _description,
            _witnessHash
        ); // why not call it directly?
    }

    function addVaultToMarket(uint256 _marketId, address _vault) external {
        Market storage _market = market[_marketId];
        _market.vaults.push(_vault);
    }

    function withdrawShare(
        uint256 _amountTowithdraw,
        uint256 _marketId
    ) external {
        UserPosition storage position = userPositions[_marketId][msg.sender];

        uint256 amountmade = position.amount;

        require(_amountTowithdraw <= amountmade, "MarketPlace_NOt_EnoughFunds");

        onWithdraw(_amountTowithdraw, _marketId);

        quoteAsset.transferFrom(address(this), msg.sender, _amountTowithdraw);
    }

    function ensureLiquidity(uint256 _amountTowithdraw) internal view {
        require(
            address(this).balance > _amountTowithdraw,
            "MarketPlace__contact_doest_have_enough_balance"
        );
    }

    function onWithdraw(uint256 amount, uint256 _marketId) internal {
        ensureLiquidity(amount);
        Market storage _market = market[_marketId];
        _market.totalDeposits -= amount;
    }

    uint256 private nonce;

    mapping(address => uint256) private activityCount;

    function activity() internal returns (uint256 count) {
        count = nonce++;

        activityCount[msg.sender];
    }

    function getActivityCount() public view returns (uint256 _count) {
        _count = activityCount[msg.sender];
    }

    struct Reward {
        uint256 rewardamount;
        uint40 startTime;
        // uint256 totalReward;
    }
    mapping(bytes32 => Reward) public _reward;
    struct UserRewardInfo {
        uint256 totalReward;
        uint256 claimedReward;
        uint256 lastClaimedTime;
    }
    mapping(address => UserRewardInfo) private userRewardInfo;
    //mapping(address => uint256) private userTorReward;
    uint256 private accumlatedRewards;

    function addReward(
        uint256 _rewardamount,
        uint40 startTime
    ) external onlyOwner {
        require(
            startTime > block.timestamp,
            "MarketPlace__Startime_cannot_be_in_the_past"
        );
        bytes32 rewardId = keccak256(
            abi.encodePacked("_rewardamont,startTime")
        );
        _reward[rewardId] = Reward({
            rewardamount: _rewardamount,
            startTime: startTime
            // totalReward : _rewardamount
        });
        accumlatedRewards += _rewardamount;
        rewardToken.transferFrom(msg.sender, address(this), _rewardamount);
    }

    function calculateReward() internal view returns (uint256 reward) {
        uint256 _count = getActivityCount();
        require(_count > 0, "MarketPlace__No_Activity");
        return _count / BIPS;
    }

    function claimReward(bytes32 rewardId) external {
        _claim(rewardId);
    }

    function getTotalRewards() public view returns (uint256) {
        return accumlatedRewards;
    }

    function _claim(bytes32 rewardId) internal {
        _updateReward(rewardId);
        UserRewardInfo storage _userRewardInfo = userRewardInfo[msg.sender];
        uint256 _rewards = _userRewardInfo.totalReward;

        accumlatedRewards -= _rewards;
        rewardToken.transferFrom(address(this), msg.sender, _rewards);
    }

    function _updateReward(bytes32 rewardId) internal {
        Reward storage reward = _reward[rewardId];
        UserRewardInfo storage _userRewardInfo = userRewardInfo[msg.sender];
        require(
            reward.startTime >= block.timestamp,
            "MarketPlace__Reward_not_yet_started"
        );

        uint256 _nreward = calculateReward(); // renamed from _nreward
        _userRewardInfo.totalReward += _nreward; // renamed
        _userRewardInfo.claimedReward = 0;
        _userRewardInfo.lastClaimedTime = block.timestamp;
    }

    function withdrawProtocolFees(uint256 _amount) external {
        uint256 profit = accumulatedFees;

        require(profit >= _amount, "MarketPlace__Not_enough_profit");

        accumulatedFees = profit - _amount;

        require(
            address(this).balance > _amount,
            "MarketPlace__contact_doest_have_enough_balance"
        );

        quoteAsset.transferFrom(address(this), feeReceiver, _amount);
    }

    uint256 public constant BIPS = 10_000;

    uint256 public constant FeeLimit = 2000;
    uint256 public feerange;

    function setFeeRange(uint256 _newRange) external {
        require(_newRange < FeeLimit, "MarketPLace_canNot_Be_more_Than_limit");
        feerange = _newRange;
    }

    address public feeReceiver;

    function setFeeReceiver(address _newFeeReceiver) external {
        feeReceiver = _newFeeReceiver;
        emit FeeReceiverUpdated(feeReceiver, _newFeeReceiver);
    }

    event FeeReceiverUpdated(
        address indexed oldAddress,
        address indexed newAddress
    );

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
        uint256 _duration,
        uint256 _bond,
        string memory description, //   bytes32 accessCode;
        bytes32 _witnessHash
    ) internal {
        UserPosition storage position = userPositions[_marketId][msg.sender];
        require(_witnessHash != 0, "MarketPlace__WitnessHash_cannot_be_empty");

        if (position.exists) {
            files[_marketId].push(
                Files({
                    id: _id,
                    reward: _amount,
                    duration: _duration,
                    bond: _bond,
                    des: description,
                    owner: msg.sender,
                    witnessHash: _witnessHash
                })
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
                Files({
                    id: _id,
                    reward: _amount,
                    duration: _duration,
                    bond: _bond,
                    des: description,
                    owner: msg.sender,
                    witnessHash: _witnessHash
                })
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
    )
        external
        view
        returns (string memory, uint256, uint256, uint256, address[] memory)
    {
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
