import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Topbar from "./Topbar";
import styles from "./styles/Styles"

const tuiImage = require("../images/team-tui.jpg"); //make tui shrink with window?


class Main extends Component {
  state = {
    learnMoredialog: false,
    getStartedDialog: false,
    books: [],
    title: '',
    author: ''

  };

  componentDidMount() {
  }

  openDialog = event => {
    this.setState({ learnMoredialog: true });
  };

  dialogClose = event => {
    this.setState({ learnMoredialog: false });
  };

  openGetStartedDialog = event => {
    this.setState({ getStartedDialog: true });
  };

  closeGetStartedDialog = event => {
    this.setState({ getStartedDialog: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar />
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid
              spacing={4}
              alignItems="center"
              justify="center"
              container
              className={classes.grid}
            >
              <Grid container item xs={12}>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <div>
                      <div className={classes.box}>
                        <Typography color="secondary" gutterBottom>
                          Welcome
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          Welcome to the SEER Research Searching Tool
                          This is our Home page
                        </Typography>
                      </div>
                    </div>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <div>
                      <div className={classes.box}>
                        <img className={classes.img} src={tuiImage} alt={"Tui's are lit"} />
                      </div>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(Main));
