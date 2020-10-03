import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Switch from "@material-ui/core/Switch";
import PaletteIcon from "@material-ui/icons/Palette";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

import TextField from "@material-ui/core/TextField";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import axios from "axios";

import { toggleThemeMode, swapThemeColors } from "../store/reducers/settings";
import { Button } from "@material-ui/core";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      publicKey: localStorage.getItem("publicKey"),
      privateKey: localStorage.getItem("privateKey"),
    };
  }

  componentDidMount() {}

  createNewWallet(event) {
    event.preventDefault();
    axios
      .get("http://localhost:3001/generateWallet", {
        headers: {
          "Content-Type": "application/json",
          Accepts: "application/json",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((result) => {
        const keyPair = result.data;
        console.log(keyPair.privateKey);
        this.setState({
          publicKey: keyPair.publicKey,
          privateKey: keyPair.privateKey,
        });

        localStorage.setItem("publicKey", keyPair.publicKey);
        localStorage.setItem("privateKey", keyPair.privateKey);
      });
  }

  render() {
    return (
      <div>
        <Typography variant="headline">Settings</Typography>
        <Card>
          <CardContent>
            <List>
              <ListItem>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Account Address" />
                <ListItemSecondaryAction>
                  <TextField
                    style={{ width: "1000px" }}
                    id="standard-basic"
                    label="Public Address"
                    value={this.state.publicKey}
                    onChange={(event) => {
                      event.preventDefault();
                      this.setState({ publicKey: event.target.value });
                    }}
                  />
                </ListItemSecondaryAction>
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <VpnKeyIcon />
                </ListItemIcon>
                <ListItemText primary="Private Key" />
                <ListItemSecondaryAction>
                  <TextField
                    style={{ width: "1000px" }}
                    id="standard-basic"
                    label="Private Key"
                    value={this.state.privateKey}
                    onChange={(event) => {
                      event.preventDefault();
                      this.setState({ privateKey: event.target.value });
                    }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PaletteIcon />
                </ListItemIcon>
                <ListItemText primary="Dark Mode" />
                <ListItemSecondaryAction>
                  <Switch
                    onChange={(e, checked) =>
                      this.props.toggleThemeMode(checked)
                    }
                    checked={this.props.settings.darkMode}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CompareArrowsIcon />
                </ListItemIcon>
                <ListItemText primary="Swap Colors" />
                <ListItemSecondaryAction>
                  <Switch
                    onChange={(e, checked) =>
                      this.props.swapThemeColors(checked)
                    }
                    checked={this.props.settings.colorsSwaped}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
            <Button
              style={{ margin: "2px" }}
              variant="contained"
              color="primary"
              onClick={() => {
                localStorage.setItem("publicKey", this.state.publicKey);
                localStorage.setItem("privateKey", this.state.privateKey);
              }}
            >
              Update
            </Button>

            <Button
              style={{ margin: "2px" }}
              variant="contained"
              color="secondary"
              onClick={(event) => {
                this.createNewWallet(event);
              }}
            >
              Create New Wallet
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    settings: state.settings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      toggleThemeMode: (checked) => toggleThemeMode(checked),
      swapThemeColors: (checked) => swapThemeColors(checked),
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
