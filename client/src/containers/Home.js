import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";

import { increment, decrement } from "../store/reducers/stepCounter";

const Home = (props) => {
  return (
    <div>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
      >
        <Grid item>
          <Card style={{ margin: "5px" }}>
            <CardContent>
              <Typography variant="headline" headlineMapping={"h1"}>
                Balance
              </Typography>
              <Typography
                align="center"
                variant="subheading"
                headlineMapping={"h1"}
              >
                You have $5 remaining
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card style={{ margin: "5px" }}>
            <CardContent>
              <Typography variant="headline" headlineMapping={"h1"}>
                Withdraw
              </Typography>
            </CardContent>
            <CardActions>
              <TextField
                style={{ width: "900px", margin: "5px" }}
                id="standard-basic"
                label="Public Address"
              />
              <Button color="primary" variant="contained">
                Send <SendIcon style={{ marginLeft: "5px" }} />
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    stepCounter: state.stepCounter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      increment: () => increment(),
      decrement: () => decrement(),
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
