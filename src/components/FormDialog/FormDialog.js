import React from "react";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Radio from "@material-ui/core/Radio";
const styles = {
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  }
};

class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    if (this.props.role == "Add Company") {
      this.props.handleAddCompany();
    }
    if (this.props.role == "Add Cluster") {
      this.props.handleAddCluster();
    }
    if (this.props.role == "Add Sensor") {
      this.props.handleAddSensor();
    }
  };

  render() {
    const props = this.props;
    console.log(props, "props");
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
        >
          {this.props.name}
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.props.role}</DialogTitle>
          <DialogContent>
            <form noValidate autoComplete="off">
              {props.fieldName.map(function(item) {
                if (item != "checkbox") {
                  return (
                    <TextField
                      id="outlined-bare"
                      label={item}
                      variant="outlined"
                      onChange={e =>
                        props.handleFieldChange(
                          e.target.value,
                          item,
                          props.role
                        )
                      }
                    />
                  );
                } else
                  return (
                    <div
                      style={{
                        display: "flex",
                        "justify-content": "center",
                        "margin-top": "20px"
                      }}
                    >
                      Active
                      <input
                        type="radio"
                        name="radioButtonName"
                        value="radioButtonValue1"
                        style={{
                          "margin-right": "20px",
                          "margin-left": "10px"
                        }}
                        onChange={props.handleCheckActive}
                      />
                      Inactive
                      <input
                        type="radio"
                        name="radioButtonName"
                        value="radioButtonValue1"
                        style={{
                          "margin-right": "20px",
                          "margin-left": "10px"
                        }}
                        onChange={props.handleCheckInActive}
                      />
                    </div>
                  );
              })}
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              className={classNames(styles.root, this.props)}
              onClick={this.handleClose}
              color="primary"
            >
              {this.props.role}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default withStyles(styles)(FormDialog);
