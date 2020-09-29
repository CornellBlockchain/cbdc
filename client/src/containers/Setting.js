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

import TextField from "@material-ui/core/TextField";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { toggleThemeMode, swapThemeColors } from "../store/reducers/settings";
import { Button } from "@material-ui/core";

const Settings = (props) => (
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
                onChange={(e, checked) => props.toggleThemeMode(checked)}
                checked={props.settings.darkMode}
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
                onChange={(e, checked) => props.swapThemeColors(checked)}
                checked={props.settings.colorsSwaped}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <Button variant="contained" color="primary">
          Update
        </Button>
      </CardContent>
    </Card>
  </div>
);

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
