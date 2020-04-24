import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { withRouter } from "react-router-dom";
import styles from "./HomeContainer.css";
import { Button } from "@material-ui/core";
import Navbar from "../../components/navbar";
import FormDialog from "../../components/FormDialog/FormDialog";
import axios from "axios";
import smartCloud from "../../media/smartCloud.png";

class HomeContainer extends React.Component {
  render() {
    return (
      <div className={"Logo2"}>
        {/* <Navbar title={"SalePoint"} /> */}
        
        />
        <div className={"textBack1"}>
          <h2 style={{ color: "#3b3234", "font-size":"80px",  padding: "1%", "margin-top":"100px" }}>
          Welcome to SalePoint
          </h2>
        </div>
        {/* <div style={{ display: "flex" }}>
          <div className={"textBack2"}>
            <h4
              style={{
                "margin-top": "30px",
                color: "#3b3234",
                padding: "2%"
              }}
            >
              SalePoint is a Secure and Real-time Reward Auction Marketplace in Blockchain{" "}
            </h4>
            <h4 style={{ "margin-top": "10px", transform: "scale(2)" }}></h4>
          </div>
          <div className={"textBack3"}>
            <h4
              style={{
                "margin-top": "20px",
                color: "#3b3234",
                padding: "3%"
              }}
            >
              Once the SmartAlert app is loaded onto the user’s machine the
              service works just like a traditional ialert system to help users
              stay savvy of surroundings
            </h4>
            <h4 style={{ "margin-top": "-12px", transform: "scale(2)" }}></h4>
          </div>
          <div className={"textBack4"}>
            <h4
              style={{
                "margin-top": "20px",
                color: "#3b3234",
                padding: "3%"
              }}
            >
              Once the SmartAlert app is loaded onto the user’s machine the
              service works just like a traditional ialert system to help users
              stay savvy of surroundings
            </h4>
            <h4 style={{ "margin-top": "-12px", transform: "scale(2)" }}></h4>
          </div>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(HomeContainer)
);
