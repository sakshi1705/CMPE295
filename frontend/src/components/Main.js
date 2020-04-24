import React, { Component } from 'react';
import Identicon from 'identicon.js';
import moment from 'moment';
import Web3 from 'web3';

class Main extends Component {
    constructor(props) {
        super(props);
        this.goToDashboard = this.goToDashboard.bind(this);
    }
    goToDashboard() {
        this.props.viewDashboard();
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
    }
    render() {
        return (
            <div className="container-fluid mt-5">
                <div className="row">
                    <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
                        <div className="content mr-auto ml-auto">
                            <p>&nbsp;</p>
                            <form onSubmit={(event) => {
                                event.preventDefault();
                                let unixTime =  moment().unix(); 
                                console.log(unixTime);
                                unixTime = unixTime + 60*(parseInt(this.duration.value, 10));
                                console.log(unixTime);
                                let priceEther = window.web3.utils.fromWei(this.startPrice.value.toString(), 'Ether')
                                
                                const content = {
                                    title: this.title.value,
                                    description: this.description.value,
                                    startPrice: priceEther,
                                    duration: unixTime,
                                }
                                //this.props.createPost(content)
                                this.props.createAuction(content);
                            }}>
                                <div className="form-group mr-sm-2">
                                    <input
                                        id="title"
                                        type="text"
                                        ref={(input) => { this.title = input }}
                                        className="form-control"
                                        placeholder="Title"
                                        required />
                                    <input
                                        id="description"
                                        type="text"
                                        ref={(input) => { this.description = input }}
                                        className="form-control"
                                        placeholder="Description"
                                        required />
                                    <input
                                        id="startPrice"
                                        type="text"
                                        ref={(input) => { this.startPrice = input }}
                                        className="form-control"
                                        placeholder="Starting Price"
                                        required />
                                    <input
                                        id="duration"
                                        type="text"
                                        ref={(input) => { this.duration = input }}
                                        className="form-control"
                                        placeholder="Duration"
                                        required />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Create</button>
                            </form>
                            <p>&nbsp;</p>
                            <button className="btn btn-primary btn-block" onClick={this.goToDashboard}>Dashboard</button>

                            {/* {this.props.posts.map((post, key) => {
                                return (
                                    <div className="card mb-4" key={key} >
                                        <div className="card-header">
                                            <img
                                                className='mr-2'
                                                width='30'
                                                height='30'
                                                src={`data:image/png;base64,${new Identicon(post.author, 30).toString()}`}
                                            />
                                            <small className="text-muted">{post.author}</small>
                                        </div>
                                        <ul id="postList" className="list-group list-group-flush">
                                            <li className="list-group-item">
                                                <p>{post.content}</p>
                                            </li>
                                            <li key={key} className="list-group-item py-2">
                                                <small className="float-left mt-1 text-muted">
                                                    TIPS: {window.web3.utils.fromWei(post.tipAmount.toString(), 'Ether')} ETH
                                                </small>
                                                <button
                                                    className="btn btn-link btn-sm float-right pt-0"
                                                    name={post.id}
                                                    onClick={(event) => {
                                                        let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
                                                        console.log(event.target.name, tipAmount)
                                                        this.props.tipPost(event.target.name, tipAmount)
                                                    }}
                                                >
                                                    TIP 0.1 ETH
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )
                            })} */}
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default Main;