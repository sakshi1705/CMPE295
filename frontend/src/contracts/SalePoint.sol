pragma solidity ^0.5.0;

contract SalePoint {
    string public name;

    mapping(uint256 => Post) public posts;

    uint public postCount = 0;

    struct Post {
        uint256 id;
        string content;
        uint256 tipAmount;
        address payable author;
    }

    event PostCreated(
        uint id,
        string content,
        uint tipAmount,
        address payable author
    );

    event PostTipped(
        uint id,
        string content,
        uint tipAmount,
        address payable author
    );

    constructor() public {
        name = "SalePoints Marketplace";
    }

    function createPost(string memory _content) public {
        //require: checks for true or false
        //require valid content
        require(
            bytes(_content).length > 0,
            "Content cannot be empty"
            );
        postCount++;
        //create post
        posts[postCount] = Post(postCount, _content, 0, msg.sender);
        //Trigger Event
        emit PostCreated(postCount, _content, 0, msg.sender);
    }

    function tipPost(uint _id) public payable {
        //Make sure id is valid
        require(
            _id > 0 && _id <= postCount,
            "Invalid ID");
        //Fetch the post
        Post memory _post = posts[_id];
        address payable _author = _post.author;

        address(_author).transfer(msg.value);
        _post.tipAmount = _post.tipAmount + msg.value;
        posts[_id] = _post;

        //emit PostCreated(postCount, _content, 0, msg.sender);
        emit PostTipped(postCount, _post.content, _post.tipAmount, _author);
    }
}
