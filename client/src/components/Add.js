import React, { Component } from "react";
import API from '../utils/API';

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


class AddArticle extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeResults.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {


        title: "",
        author: "",
        date: "",
        results: "",
        url: "",
        status: {state : "SUBMITTED"}
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

   onChangeResults(e) {
    this.setState({
      results: e.target.value
    });
  } 

  onChangeAuthor(e) {
    this.setState({
      author: e.target.value
    });
  }

  onChangeDate(e) {
    this.setState({
      date: e.target.value
    });
  }

  onChangeUrl(e) {
    this.setState({
      url: e.target.value
    });
  }

  saveTutorial() {
    var data = {
      title: this.state.title,
      results: this.state.results,
      author: this.state.author,
      date: this.state.date,
      url: this.state.url,
      status: this.state.status
    };

    API.create(data)
      .then(response => {
        this.setState({
          title: response.data.title,
          author: response.data.author,
          results: response.data.results,
          date: response.data.date,
          url: response.data.title,
          status: response.data.status
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTutorial() {
    this.setState({
      title: "",
      results: "",
      author: "",
      date: "",
      url: "",
      status: "SUBMITTED"
    });
  }

  render() {
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


        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newTutorial}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                  name="title"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description (Result?)</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  name="description"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Author</label>
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  required
                  value={this.state.author}
                  onChange={this.onChangeAuthor}
                  name="author"
                />
              </div>

              <div className="form-group">
                <label htmlFor="date">Date of Publication</label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  required
                  value={this.state.date}
                  onChange={this.onChangeDate}
                  name="date"
                />
              </div>


              <div className="form-group">
                <label htmlFor="url">URL</label>
                <input
                  type="text"
                  className="form-control"
                  id="url"
                  required
                  value={this.state.url}
                  onChange={this.onChangeUrl}
                  name="url"
                />
              </div>

              <button onClick={this.saveTutorial} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
        </Grid>
              </Grid>
              </div>
        </React.Fragment>
      );     
    }
  }
  export default withRouter(withStyles(styles)(AddArticle));