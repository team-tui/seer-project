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
import { withRouter, Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Topbar from "./Topbar";
import styles from "./styles/Styles"
import 'react-day-picker/lib/style.css';
import SearchForm from './Forms/SearchForm';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import DatePicker from './Forms/DatePicker';



class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveArticles = this.retrieveArticles.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      articles: [],
      searchTitle: "",
      name: '',
      args: [{ nameOfFeild: "", operator: "", value: "" }],
      dateFrom: "",
      dateTo: "",
      searchAuthor: "",
      userDesctiption: '',
      test: ''
    };
  }

  componentDidMount() {
    this.retrieveArticles();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e;

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
    API.findByTitle2(this.state.searchTitle, this.state.searchAuthor, this.state.dateFrom, this.state.dateTo)
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
    let { args } = this.state


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
                    <Typography color="secondary" gutterBottom align='center'>
                      SEARCH
                        </Typography>

                    <TextField
                      id="descr_search"
                      type="search"
                      style={{ margin: 8 }}
                      placeholder="Enter description here..."
                      fullWidth
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                    />

                    <DatePicker></DatePicker>

                    <SearchForm
                      input={args}
                      onClick={''/* this.getbook() */} >
                    </SearchForm>

                  </Paper>
                </Grid>
                {/* Table */}
                <ArticleTable ArticlesArray={articles} />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}
export default withRouter(withStyles(styles)(SearchPage));