import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter, Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import API from '../utils/API';
import InstructionDialog from "./dialogs/InstructionDialog";
import Topbar from "./Topbar";

const backgroundShape = require("../images/shape.svg");

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey["100"],
    overflow: "hidden",
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
    paddingBottom: 200
  },
  grid: {
    width: 1200,
    margin: `0 ${theme.spacing(2)}px`,
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 20px)"
    }
  },
  loadingState: {
    opacity: 0.05
  },
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary
  },
  rangeLabel: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing(2)
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  outlinedButtom: {
    textTransform: "uppercase",
    margin: theme.spacing(1)
  },
  actionButtom: {
    textTransform: "uppercase",
    margin: theme.spacing(1),
    width: 152,
    height: 36
  },
  blockCenter: {
    padding: theme.spacing(2),
    textAlign: "center"
  },
  block: {
    padding: theme.spacing(2)
  },
  loanAvatar: {
    display: "inline-block",
    verticalAlign: "center",
    width: 16,
    height: 16,
    marginRight: 10,
    marginBottom: -2,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main
  },
  interestAvatar: {
    display: "inline-block",
    verticalAlign: "center",
    width: 16,
    height: 16,
    marginRight: 10,
    marginBottom: -2,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light
  },
  inlining: {
    display: "inline-block",
    marginRight: 10
  },
  buttonBar: {
    display: "flex"
  },
  noBorder: {
    borderBottomStyle: "hidden"
  },
  mainBadge: {
    textAlign: "center",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  }
});

class Dashboard extends Component {
  state = {
    loading: true,
    bookDialog: false,
    books: [],
    title: '',
    author: ''
  };


  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: '', author: '' })
      )
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.loadBooks();
  }

  openBookDialog = event => {
    this.setState({ bookDialog: true });
  };

  closeBookDialog = event => {
    this.setState({ bookDialog: false });
  };

  render() {
    const { classes } = this.props;
    const currentPath = this.props.location.pathname;

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid
              spacing={10}
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
                          Dashboard
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          This is where the Searching Facility will be located
                        </Typography>
                      </div>
                    </div>
                  </Paper>
                </Grid>
                {this.state.books.length ? (
                  this.state.books.map(book => (
                    <Grid item xs={6}>
                      <Paper className={classes.paper}>
                        <div className={classes.box}>
                          <Typography
                            style={{ textTransform: "uppercase" }}
                            color="secondary"
                            gutterBottom
                          >
                            {book.title}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Author: {book.author}
                          </Typography>
                        </div>
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                          <Button
                            onClick={this.openBookDialog}
                            color="primary"
                            variant="contained"
                            className={classes.actionButtom}
                          >
                            Learn more
                    </Button>
                        </div>
                      </Paper>
                    </Grid>
                  ))
                ) : (
                    <Typography color="body1" gutterBottom>
                      No Results to Display
                    </Typography>
                  )}
              </Grid>

            </Grid>
          </Grid>
          <InstructionDialog
            open={this.state.bookDialog}
            onClose={this.closeBookDialog}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(Dashboard));
