/* This component contains the search function, 
and passes the result of search as an array to ArticleTable.
Todo:
  Change search to use material UI
  Expand search to all columns - currently just title
  
Issues:
*/

import React, { Component, useState } from "react";
import API from '../utils/API';
import { Link } from "react-router-dom";
import ArticleTable from "./ArticleTable";

//import {Input, Table, TableBody, TableCell } from '@material-ui/core';

import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Topbar from "./Topbar";
import Button from "@material-ui/core/Button";
import styles from "./styles/Styles"
import InstructionDialog from "./dialogs/InstructionDialog";


class ArticlesList extends Component {
    constructor(props) {
      super(props);
      this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
      this.retrieveArticles = this.retrieveArticles.bind(this);
      this.refreshList = this.refreshList.bind(this);
      this.setActiveTutorial = this.setActiveTutorial.bind(this);
      this.removeAllTutorials = this.removeAllTutorials.bind(this);
      this.searchTitle = this.searchTitle.bind(this);
  
      this.state = {
        tutorials: [],
        currentTutorial: null,
        tutorialDialog: false,
        currentIndex: -1,
        //tutorialDate: "",
        showInfo: false,
        searchTitle: ""
      };
    }
  

    componentDidMount() {
      this.retrieveArticles();
    }
  
    onChangeSearchTitle(e) {
      const searchTitle = e.target.value;
  
      this.setState({
        searchTitle: searchTitle
      });
    }
  
  
    toggleShow() {
      this.setState({showInfo: !this.state.showInfo});
  };
  
  showInfo() {
    this.setState({showInfo: true});
  };
  
  hideInfo = e => {
    this.setState({showInfo: false});
  };
  
  
    retrieveArticles() {
      API.getBooks()
        .then(response => {
          this.setState({
            tutorials: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  
    refreshList() {
      this.retrieveArticles();
      this.setState({
        currentTutorial: null,
        currentIndex: -1
      });
    }
  
    openTutorialDialog = event => {
      this.setState({ tutorialDialog: true });
    };
  
    closeTutorialDialog = event => {
      this.setState({ tutorialDialog: false });
    };
  
    setActiveTutorial(tutorial, index) {
      //var tempDate = new Date(tutorial.date);
  
      this.setState({
        currentTutorial: tutorial,
        currentIndex: index,
       // tutorialDate: tempDate
      });
    }
  
    removeAllTutorials() {
      API.deleteAllBooks()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    }
  
    searchTitle() {
      API.findByTitle(this.state.searchTitle)
        .then(response => {
          this.setState({
            tutorials: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

    createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }
    
    


    render() {
        const { searchTitle, tutorials, currentTutorial, currentIndex, 
          tutorialDate} = this.state;
        const { classes, onRequestSort} = this.props;
        const currentPath = this.props.location.pathname;

    
        return (
            <React.Fragment>
            <CssBaseline />
            {/* Menu */}
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
               {/* Search */}
                    <Grid container item xs={12}>
                    <Grid item xs={12}>
                      <Paper className={classes.paper}>
                        <div>
                          <div className={classes.box}>
                            <Typography color="secondary" gutterBottom>
                              Search
                            </Typography>
    
                            
                            <input
                  type="text"
                  className="form-control"
                  placeholder="Search by title"
                  value={searchTitle}
                  onChange={this.onChangeSearchTitle}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={this.searchTitle}
                  >
                    Search
                  </button> </div>
    
    
                            <Typography variant="body1" gutterBottom>
                              Change this to material UI Input
                            </Typography>
                          </div>
                        </div>
                      </Paper>
                    </Grid>
    {/* Table */}
    <ArticleTable ArticlesArray={tutorials}/>
     </Grid>
              </Grid>
              </Grid>
              </div>
    </React.Fragment>
        );
                }}
    export default withRouter(withStyles(styles)(ArticlesList));