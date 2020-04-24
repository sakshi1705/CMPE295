
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { withRouter } from "react-router-dom";
import styles from "./InfrastructureContainer.css";
import { Button } from "@material-ui/core";
import Navbar from "../../components/navbar";
import FormDialog from "./components/FormDialog/FormDialog";
import axios from "axios";

class InfrastructureContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addCompany: false,
      addTier: false,
      addAsset: false,
      Company: {
        CompanyID : "",
        CompanyName: "",
        Tier: ""
      },
      Tier: {
        Tierlevel: "",
        Company: "",
        Multiplier: ""
      },
      Asset: {
        AssetId: "",
        DenominationType: "",
        DenominationAmount: "",
      },
      role: ""
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleViewCompany = this.handleViewCompany.bind(this);
    this.handleViewTier = this.handleViewTier.bind(this);
    this.handleViewAsset = this.handleViewAsset.bind(this);
  }

  // This method is called when any industry is clicked
  async handleAddCompany() {
    const data = {
      CompanyID: this.state.Company.CompanyID,
      CompanyName: this.state.Company.CompanyName,
      Tier: this.state.Company.Tier
    };
    console.log( data);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/addCompany",
        data
      );
      console.log("👉 Returned data:", response);
    } catch (e) {
      console.log(`😱 Axios request failed: ${e}`);
    }
  }

  async handleAddTier() {
    console.log("Added tier", this.state.Tier);
    const data = {
      Tierlevel: this.state.Tier.Tierlevel,
      Company: this.state.Tier.Company,
      Multiplier: this.state.Tier. Multiplier
    };

    try {
      console.log(data);
      const response = await axios.post(
        "http://localhost:3001/api/addCluster",
        data
      );
      console.log("👉 Returned data:", response);
    } catch (e) {
      console.log(`😱 Axios request failed: ${e}`);
    }
  }

  async handleAddSensor() {
    console.log("Added Sensor", this.state.Sensor);
    const data = {
      clusterId: this.state.Sensor.ClusterId,
      status: this.state.Sensor.Status,
      regionName: this.state.Sensor.RegionName,
      type: this.state.Sensor.Type,
      longitude: this.state.Sensor.Latitude,
      latitude: this.state.Sensor.Latitude,
      IpAddress: this.state.Sensor.IpAddress
    };

    try {
      console.log(data);
      const response = await axios.post(
        "http://localhost:3001/api/addSensor",
        data
      );
      console.log("👉 Returned data:", response);
    } catch (e) {
      console.log(`😱 Axios request failed: ${e}`);
    }
  }

  handleFieldChange(value, item, role) {
    if (role == "Add Company") {
      this.handleCompanyChange(value, item);
    }
    if (role == "Add Tier") {
      this.handleTierChange(value, item);
    }
    if (role == "Add Asset") {
      this.handleAssetChange(value, item);
    }
  }

  async handleCompanyChange(value, propertyName) {
    const Company = this.state.Company;
    Company[propertyName] = value;
    this.setState({ Company: Company });
  }

  async handleTierChange(value, propertyName) {
    const Tier = this.state.Tier;
    Tier[propertyName] = value;
    this.setState({ Tier: Tier });
  }

  async handleAssetChange(value, propertyName) {
    const Asset = this.state.Asset;
    Asset[propertyName] = value;
    this.setState({ Asset: Asset});
  }

  handleViewCompany() {
    this.props.history.push("/company");
  }
  handleViewTier() {
    this.props.history.push("/tier");
  }
  handleViewAsset() {
    this.props.history.push("/asset");
  }

  // handleCheckActive() {
  //   const Sensor = this.state.Sensor;
  //   Sensor.Status = "active";
  //   this.setState({ Sensor: Sensor });
  // }
  // handleCheckInActive() {
  //   const Sensor = this.state.Sensor;
  //   Sensor.Status = "inactive";
  //   this.setState({ Sensor: Sensor });
  // }

  render() {
    return (
     <div className={"Logo3"}>
       
        <h2 style={{ "margin-top": "100px", "font-style": "italic" }}>
          Add Details for Salepoints 
        </h2>
        <h4 style={{ "margin-top": "30px", "font-style": "italic" }}>
          You can now add Company, Tier and Assets information .{" "}
        </h4>
        <h4 style={{ "margin-top": "10px", "font-style": "italic" }}>
        
        </h4>
       

        <div className={"addButtons"}>
          <FormDialog
            name={"Add Company"}
            role={"Add Company"}
            fieldName={["CompanyID", "CompanyName", "Tier"]}
            handleFieldChange={this.handleFieldChange.bind(this)}
            handleAddCompany={this.handleAddCompany.bind(this)}
          />
          <FormDialog
            name={"Add Tier"}
            role={"Add Tier"}
            fieldName={["Tierlevel", "company", "multiplier"]}
            fieldType={["number", "text"]}
            handleFieldChange={this.handleFieldChange.bind(this)}
            handleAddTier={this.handleAddTier.bind(this)}
            // handleCheckActive={this.handleCheckActive.bind(this)}
            // handleCheckInActive={this.handleCheckInActive.bind(this)}
          />
          <FormDialog
            name={"Add Asset"}
            role={"Add Asset"}
            fieldName={[
              "AssetID",
              "DenominationType",
              "DenominationAmount"
            ]}
            fieldType={["number", "text"]}
            handleFieldChange={this.handleFieldChange.bind(this)}
            handleAddSensor={this.handleAddSensor.bind(this)}
            // handleCheckActive={this.handleCheckActive.bind(this)}
            // handleCheckInActive={this.handleCheckInActive.bind(this)}
          />
        </div>
        <div className={"viewButtons"}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleViewCompany}
          >
            {"View Company"}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleViewTier}
          >
            {"View Tier"}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleViewAsset}
          >
            {"View Assets"}
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(InfrastructureContainer)
);
