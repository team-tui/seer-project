/* This component contains the search function, 
and passes the result of search as an array to ArticleTable.
Todo:
  Change search to use material UI
  Expand search to all columns - currently just title
  Make search on pressing enter key?

  **Possibly looking at breaking the search box into another componenet and 
    importing to this page for modularity (similar to article table)
  
Issues:

*/

import React, { Component, useState } from "react";
import API from '../utils/API';
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


class SearchPage extends Component {
    constructor(props) {
      super(props);
      this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
      this.retrieveArticles = this.retrieveArticles.bind(this);
      this.searchTitle = this.searchTitle.bind(this);
  
      this.state = {
        articles: [],
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
  
    retrieveArticles() {
      API.getBooks()
        .then(response => {
          this.setState({
            articles: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
    
    searchTitle() {
      API.findByTitle(this.state.searchTitle)
        .then(response => {
          this.setState({
            articles: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

    render() {
        const { searchTitle, articles } = this.state;
        const { classes } = this.props;
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
    <ArticleTable ArticlesArray={articles}/>
     </Grid>
              </Grid>
              </Grid>
              </div>
    </React.Fragment>
        );
                }}
    export default withRouter(withStyles(styles)(SearchPage));