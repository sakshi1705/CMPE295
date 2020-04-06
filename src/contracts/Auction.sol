pragma solidity ^0.5.0;

contract AuctionBox {
    Auction[] public auctions;
    function createAuction(
        string memory _title,
        uint256 _startingPrice,
        string memory _description,
        uint256 _auctionLength
    ) public {
        require(_startingPrice > 0);
        Auction newAuction = new Auction(
            msg.sender,
            _auctionLength,
            _title,
            _description,
            _startingPrice
        );
        auctions.push(newAuction);
    }

    function returnAllAuctions() public view returns (Auction[] memory) {
        return auctions;
    }
}
contract Auction {
    address payable public beneficiary;
    uint256 public auctionStart;
    uint256 public biddingTime;
    uint256 public startingPrice;
    string title;
    string description;
    //Current state of the auction.
    //Determine the state of the auction.
    enum AuctionState {IN_PROGRESS, CALCULATING, COMPLETED}
    AuctionState public state;
    address public highestBidder;
    uint256 public highestBid;

    mapping(address => uint256) pendingReturns;

    bool ended;

    event HighestBidIncreased(address bidder, uint256 amount);
    event AuctionEnded(address winner, uint256 amount);

    constructor(
        address payable _beneficiary,
        uint256 _auctionLength,
        string memory _title,
        string memory _description,
        uint256 _startingPrice
    ) public {
        title = _title;
        description = _description;
        beneficiary = _beneficiary;
        auctionStart = now;
        biddingTime = _auctionLength;
        startingPrice = _startingPrice;
    }

    function bid() public payable {
        if (now > auctionStart + biddingTime) {
            revert();
        }
        if (msg.value <= highestBid) {
            revert();
        }
        if (highestBidder != address(0)) {
            pendingReturns[highestBidder] += highestBid;
        }
        highestBidder = msg.sender;
        highestBid = msg.value;
        emit HighestBidIncreased(msg.sender, msg.value);
    }

    function withdraw() public returns (bool) {
        uint256 amount = pendingReturns[msg.sender];
        if (amount > 0) {
            pendingReturns[msg.sender] = 0;

            if (!msg.sender.send(amount)) {
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

    function auctionEnd() public {
        if (now <= auctionStart + biddingTime) revert();
        if (ended) revert();

        ended = true;
        emit AuctionEnded(highestBidder, highestBid);

        beneficiary.transfer(highestBid);
    }

    function returnContents() public view returns(
        string memory,
        uint256,
        string memory,
        uint256,
        uint256
        ) {
        return (
            title,
            startingPrice,
            description,
            auctionStart,
            biddingTime
        );
    }
     function getHighestBidder(
        address[] memory _bidders,
        uint256[] memory _bidAmounts,
        uint256[] memory _stakeAmounts
    ) public pure returns (address, uint256) {
        address highestBidder;
        uint256 highestBidAmount;
        for (uint256 i = 0; i < _bidders.length; i++) {
            if (
                (_bidAmounts[i] > highestBidAmount) &&
                (_bidAmounts[i] <= _stakeAmounts[i])
            ) {
                highestBidAmount = _bidAmounts[i];
                highestBidder = _bidders[i];
            }
        }
        return (highestBidder, highestBidAmount);
    }
}