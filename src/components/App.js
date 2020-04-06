import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Web3 from 'web3';
import './App.css';
import SalePoint from '../abis/AuctionBox.json';
import Auction from '../abis/Auction.json';
import Navbar from './Navbar';
import Main from './Main';
//import auction from '../contracts/auctionInstance';
//import auctionBox from '../contracts/auctionBoxInstance';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      salePoint: null,
      auctionInstance: null,
      postCount: 0,
      posts: [],
      loading: false,
      allAuctions: []

    }
    this.createPost = this.createPost.bind(this)
    this.tipPost = this.tipPost.bind(this)
    this.createAuction = this.createAuction.bind(this);
    this.viewDashboard = this.viewDashboard.bind(this);
  }
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }
  viewDashboard() {
    this.props.history.push({
      pathname: "/dashboard",
      state: {
        allAuctions: this.state.allAuctions,
        account: this.state.account,
        salePoint: this.state.salePoint
      }
    });
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async createAuction(content) {
    // get accounts
    const web3 = window.web3;
    const startPrice = web3.utils.toWei(content.startPrice, 'ether');
    const duration = content.duration;
    const title = content.title
    const description = content.description;
    console.log(this.state.account);

    //const allAuctions = await this.state.salePoint.methods.returnAllAuctions().call();
    //console.log("fucker");
    //console.log(allAuctions);
    // const index = allAuctions.length -1;
    // const auctionInstance = web3.eth.Contract(Auction.abi, allAuctions[index]);
    // const auctionContents = await auctionInstance.methods.returnContents().call();
    // console.log(auctionContents);
    // this.setState({
    //   allAuctions
    // })
    await this.state.salePoint.methods.createAuction(title, startPrice, description, duration)
      .send({ from: this.state.account });
    // console.log("here");
    // const allAuctions = await this.state.salePoint.methods.returnAllAuctions().call();
    // console.log("there");
    // console.log(allAuctions[0]);

    // web3.eth.getAccounts().then(async (accounts) => {
    //   // convert 'ether' to 'wei'
    //   const startPrice = web3.utils.toWei("10", 'ether');
    //   // createAuction in AuctionBox contract
    //   const duration = "1000";
    //   console.log(this.state.account);
    //   //this.isLoad = true;
    //   return await this.state.salePoint.methods.createAuction("First Contract", startPrice, "Description", duration)
    //     .send({ from: this.state.account });
    // })
    //   .then(async () => {
    //     // initialize forms
    //     // this.isLoad = false;
    //     // this.title = '';
    //     // this.startPrice = '';
    //     // this.description = '';
    //     // get the previous auction
    //     console.log("here");
    //     const auctionsawait this.state.salePoint.methods.returnAllAuctions().call();
    //   })
    //   .then(async (auctions) => {
    //     console.log("there");
    //     const index = auctions.length - 1;
    //     console.log(auctions[index]);
    //     // get the contract address of the previous auction
    //     //this.auctionAddress = auctions[index];
    //     // set the address as the parameter
    //     // const auction = this.state.auctionInstance(auctions[index]);
    //     // return auction.methods.returnContents().call();
    //   })
    // .then(() => {
    //     // initialize forms
    //     // this.isLoad = false;
    //     // this.title = '';
    //     // this.startPrice = '';
    //     // this.description = '';
    //     // get the previous auction
    //     const allAuctions = this.state.salePoint.methods.returnAllAuctions().call();
    //     console.log(allAuctions);
    //   });
    // web3.eth.getAccounts().then((accounts) => {
    //   // convert 'ether' to 'wei'
    //   const startPrice = web3.utils.toWei(this.startPrice, 'ether');
    //   // createAuction in AuctionBox contract
    //   this.isLoad = true;
    //   return auctionBox.methods.createAuction(this.title, startPrice, this.description)
    //     .send({ from: accounts[0] });
    // })
    // .then(() => {
    //   // initialize forms
    //   this.isLoad = false;
    //   this.title = '';
    //   this.startPrice = '';
    //   this.description = '';
    //   // get the previous auction
    //   return auctionBox.methods.returnAllAuctions().call();
    // })
    // .then((auctions) => {
    //   const index = auctions.length - 1;
    //   console.log(auctions[index]);
    //   // get the contract address of the previous auction
    //   this.auctionAddress = auctions[index];
    //   // set the address as the parameter
    //   const auctionInstance = auction(auctions[index]);
    //   return auctionInstance.methods.returnContents().call();
    // })
    // .then((lists) => {
    //   console.log(lists);
    //   const auctionlists = lists;
    //   // convert 'wei' to 'ether'
    //   auctionlists[1] = web3.utils.fromWei(auctionlists[1], 'ether');
    //   this.auctionCard = auctionlists;
    //   // show up the auction at the bottom of the page
    //   this.isShow = true;
    //   this.amount += 1;
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    //Load account
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    this.setState({
      account: accounts[0]
    })
    //NETWORK ID
    const networkId = await web3.eth.net.getId();

    //console.log(networkId);
    //Address
    const networkData = SalePoint.networks[networkId];
    //const networkData2 = Auction.networks[networkId];
    //console.log(networkData);
    if (networkData) {
      const salePoint = web3.eth.Contract(SalePoint.abi, networkData.address);
      const allAuctions = await salePoint.methods.returnAllAuctions().call();
      console.log(allAuctions);
      //const auctionInstance = web3.eth.Contract(Auction.abi, networkData2.address);
      //console.log(salePoint);
      this.setState({ salePoint , allAuctions })
      //const postCount = await salePoint.met hods.postCount().call()
      //console.log(postCount);
      //this.setState({ postCount })
      // Load Posts
      // for (var i = 1; i <= postCount; i++) {
      //   const post = await salePoint.methods.posts(i).call()
      //   this.setState({
      //     posts: [...this.state.posts, post]//creates a new array and adds the new value to it at the end
      //   })
      // }
      //console.log({posts: this.state.posts})

      //Sort posts. Show highest tipped posts first
      // this.setState({
      //   posts: this.state.posts.sort((a,b) => b.tipAmount - a.tipAmount )
      // })
      // this.setState({ loading: false})
    } else {
      window.alert('salePoint contract not deployed to detected network.')
    }
    //ABI
  }

  createPost(content) {
    //this.setState({ loading: true })
    this.state.salePoint.methods.createPost(content).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })
  }

  tipPost(id, tipAmount) {
    //this.setState({ loading: true });
    this.state.salePoint.methods.tipPost(id).send({ from: this.state.account, value: tipAmount }).once('receipt', (receipt) => {
      this.setState({ loading: false })
    });
    this.setState({ loading: false });
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        {this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          :

          <Main
            account={this.state.account}
            viewDashboard={this.viewDashboard}
            state={this.state}
            // posts={this.state.posts}
            createAuction={this.createAuction}
          // tipPost={this.tipPost}
          />
        }
      </div>
    );
  }
}

// export default withRouter(App);
export default App;
