import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import axios from 'axios';

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";

import { increment, decrement } from "../store/reducers/stepCounter";

import TransactionList from "./TransactionList.js";

class Home extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      balance: 0,
    };
    axios
    .get(`http://localhost:3001/getBalance?privateKey=${localStorage.getItem("privateKey")}`, {
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((result) => {
      this.setState({balance: parseFloat(result.data)});
    }, (error) => {
      this.setState({balance: 0});
    });
  }

  render(){
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
                <Typography variant="h5">Balance</Typography>
                <Typography align="center" variant="subtitle1">
                  You have ${this.state.balance} remaining
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card style={{ margin: "5px" }}>
              <CardContent>
                <Typography variant="h5">Withdraw</Typography>
              </CardContent>
              <CardActions>
                <TextField
                  style={{ width: "900px", margin: "5px", marginTop: -50 }}
                  id="standard-basic"
                  label="Public Address"
                  />
                <TextField
                  style= {{ width: "900px",
                          margin: "5px",
                          marginTop: 50,
                          marginLeft: -905}}
                  id="standard-basic"
                  label="Amount"
                />
                <Button color="primary" variant="contained"
                        style = {{marginTop: 40, marginLeft: 50 }}>
                  Send <SendIcon style={{ marginLeft: "5px"}} />
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item>
            <Card style={{ margin: "5px" }}>
              <CardContent>
                <Typography variant="h5">Transactions</Typography>
              </CardContent>
              <TransactionList />
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

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
