const AuctionBox = artifacts.require("./AuctionBox.sol");
//import auction from '../src/contracts/auctionInstance';
//import auctionBox from '../src/contracts/auctionBoxInstance';

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('AuctionBox', ([deployer, author, tipper]) => {
    let auctionBox;
    before(async () => {
        auctionBox = await AuctionBox.deployed()
    })

    describe('deployment', async () => {
        it('deploys successfully', async () => {
            const address = await auctionBox.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)

        })

        // it('has a name', async () => {
        //     const name = await salePoint.name()
        //     assert.equal(name, "SalePoints Marketplace")

        // })
        let result, allAuctions;
        it('creates', async () => {
            //result = await auctionBox.createAuction('First Auction', 50, 'None', 100);
            //console.log(result);
            //postCount = await auctionBox.returnAllAuctions();
        })
        it('lists', async () => {
            var value = web3.utils.toWei('1', 'Ether');
            result = await auctionBox.createAuction('First Auction', value, 'None', 100);
            allAuctions = await auctionBox.returnAllAuctions();
            // const auctionInstance = auction(allAuctions[0]);
            // const lists = auctionInstance.methods.returnContents().call();
            console.log(allAuctions);
            //expect(allAuctions).to.have.deep.property('[0].title', 'First Auction');
            // assert.equal(post.id.toNumber(), postCount.toNumber(), 'id is corrent');
            // assert.equal(post.content, 'This is first', 'content is corrent');
            // assert.equal(post.tipAmount, '0', 'amount is corrent');
            // assert.equal(post.author, author, 'author is corrent');
        })
        // it('creates', async () => {

        //     //Success
        //     assert.equal(postCount,1);
        //     const event = result.logs[0].args

        //     assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is corrent');
        //     assert.equal(event.content, 'This is first', 'content is corrent');
        //     assert.equal(event.tipAmount, '0', 'amount is corrent');
        //     assert.equal(event.author, author, 'author is corrent');

        //     //Failure: Post must have content
        //     await salePoint.createPost('', {from:author }).should.be.rejected;

        // })


    })

    // describe('posts', async () => {
    //     let result, postCount;
    //     before(async () => {
    //         result = await salePoint.createPost('This is first', {from:author });
    //         postCount = await salePoint.postCount();
    //     })
    //     it('creates', async () => {

    //         //Success
    //         assert.equal(postCount,1);
    //         const event = result.logs[0].args

    //         assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is corrent');
    //         assert.equal(event.content, 'This is first', 'content is corrent');
    //         assert.equal(event.tipAmount, '0', 'amount is corrent');
    //         assert.equal(event.author, author, 'author is corrent');

    //         //Failure: Post must have content
    //         await salePoint.createPost('', {from:author }).should.be.rejected;

    //     })
    //     it('lists', async () => {
    //         const post = await salePoint.posts(postCount)
    //         assert.equal(post.id.toNumber(), postCount.toNumber(), 'id is corrent');
    //         assert.equal(post.content, 'This is first', 'content is corrent');
    //         assert.equal(post.tipAmount, '0', 'amount is corrent');
    //         assert.equal(post.author, author, 'author is corrent');
    //     })
    //     it('pay', async () => {
    //         // Track the author balance before purchase
    //   let oldAuthorBalance
    //   oldAuthorBalance = await web3.eth.getBalance(author)
    //   oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)

    //   result = await salePoint.tipPost(postCount, { from: tipper, value: web3.utils.toWei('1', 'Ether') })

    //   // SUCESS
    //   const event = result.logs[0].args
    //   assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
    //   assert.equal(event.content, 'This is first', 'content is correct')
    //   assert.equal(event.tipAmount, '1000000000000000000', 'tip amount is correct')
    //   assert.equal(event.author, author, 'author is correct')

    //   // Check that author received funds
    //   let newAuthorBalance
    //   newAuthorBalance = await web3.eth.getBalance(author)
    //   newAuthorBalance = new web3.utils.BN(newAuthorBalance)

    //   let tipAmount
    //   tipAmount = web3.utils.toWei('1', 'Ether')
    //   tipAmount = new web3.utils.BN(tipAmount)

    //   const exepectedBalance = oldAuthorBalance.add(tipAmount)

    //   assert.equal(newAuthorBalance.toString(), exepectedBalance.toString())

    //   // FAILURE: Tries to tip a post that does not exist
    //   await salePoint.tipPost(99, { from: tipper, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;


    //     })
    // })


})
