import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Navbar from './Navbar';
import Countdown from './Countdown';
import "./dashboard.css";
import Web3 from 'web3';
import Auction from '../abis/Auction.json';
import moment from 'moment';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allAuctions: [],
            account: '',
            salePoint: '',
            auctionInstances: [],
            auctionContents: []
        }
        this.populateInstances = this.populateInstances.bind(this)
    }
    async componentWillMount() {
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

        this.setState({
            allAuctions: this.props.location.state.allAuctions,
            account: this.props.location.state.account,
            salePoint: this.props.location.state.salePoint
        });
        this.populateInstances();
    }

    async populateInstances() {
        const { allAuctions } = this.state;
        console.log(allAuctions[0]);
        const web3 = window.web3;
        var auctionContents = [];
        for (var i = 0; i < allAuctions.length; i++) {
            const auctionInstance = new web3.eth.Contract(Auction.abi, allAuctions[i]);
            const auctionContent = await auctionInstance.methods.returnContents().call();
            auctionContents.push(auctionContent);
        }
        this.setState({
            auctionContents
        });

    }
    render() {
        const { auctionContents } = this.state;
        console.log(auctionContents);
        let detail;
        let UnixTime;
        let time;
        if (this.state.auctionContents[0]) {
            detail = this.state.auctionContents.map((result, i) => {
                UnixTime = result["4"].toString();
                console.log(UnixTime);
                time = moment.unix(UnixTime).format('MM DD YYYY, h:mm a')
                console.log(time);
                return (
                    // <div key={i}>
                    //     <div>
                    //         <h3><a href="#" title="">{result["0"]}</a></h3>
                    //         <p>{result["2"]}</p>
                    //     </div>
                    //     <span className="clearfix"></span>

                    // </div>
                    <div class="col-md-8 card-body " key={i}>
                    <h2 className="title">{result["0"]}</h2>
                    <h3 className="description">{result["2"]}</h3>
                    <h5 className="timeLeft">Time left :</h5>
                    <Countdown timeTillDate={time} timeFormat="MM DD YYYY, h:mm a" />
                    <ul class="list-inline">
                        <li class="list-inline-item">{result["1"].toString()}</li>
                        <li class="list-inline-item">{result["3"].toString()}</li>
                    </ul>
                    <button type="button" class="btn btn-outline-primary">Place Bid</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="button" class="btn btn-outline-danger">Finalize Auction</button>
                    <span className="clearfix"></span>
                    
                    <hr style={{ width: '850px' }}/>
                </div>

                )
            })
        }


        return (
            
            <div className="container-fluid mt-5">
                <Navbar account={this.state.account} />
                
                <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1200px' }}>
                <h1>Live Auctions</h1>
                    <div class="row">
                        <div class="col-md-9">
                            <div class="row mt-3 border">
                            {detail}

                            </div>


                        </div>
                    </div>

                </main>
            </div>
        );
    }
}
export default Dashboard;