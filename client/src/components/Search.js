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
import makeAnimated from "react-select/animated";
import styles from "./styles/Styles"
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import { Helmet } from "react-helmet"
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from 'react-day-picker/moment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';


class Search extends Component {
  constructor(props) {
    super(props);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.state = {
      loading: true,
      bookDialog: false,
      books: [],
      title: '',
      author: '',
    };
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: '', author: '' })
      )
      .catch(err => console.log(err));
  };

  SimpleSelect() {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };
  }

  LayoutTextFields() {
    const classes = this.useStyles();
  }

  componentDidMount() {
    this.loadBooks();
  }

  openBookDialog = event => {
    this.setState({ bookDialog: true });
  };

  closeBookDialog = event => {
    this.setState({ bookDialog: false });
  };

  showFromMonth() {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  }

  handleFromChange(from) {
    this.setState({ from });
  }

  handleToChange(to) {
    this.setState({ to }, this.showFromMonth);
  }

  render() {
    const { classes } = this.props;
    const currentPath = this.props.location.pathname;
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };

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
                          Search
                        </Typography>
                      </div>
                      <div>
                        <TextField
                          id="descr_search"
                          type="search"
                          style={{ margin: 8 }}
                          placeholder="Enter description here here..."
                          fullWidth
                          margin="normal"
                          InputLabelProps={{ shrink: true, }}
                        />
                      </div>
                      <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}>
                        <DayPickerInput
                          value={from}
                          placeholder="From"
                          format="LL"
                          formatDate={formatDate}
                          parseDate={parseDate}
                          dayPickerProps={{
                            selectedDays: [from, { from, to }],
                            disabledDays: { after: to },
                            toMonth: to,
                            modifiers,
                            numberOfMonths: 2,
                            onDayClick: () => this.to.getInput().focus(),
                          }}
                          onDayChange={this.handleFromChange}
                        />{' '}
        —{' '}
                        <span className="InputFromTo-to">
                          <DayPickerInput
                            ref={el => (this.to = el)}
                            value={to}
                            placeholder="To"
                            format="LL"
                            formatDate={formatDate}
                            parseDate={parseDate}
                            dayPickerProps={{
                              selectedDays: [from, { from, to }],
                              disabledDays: { before: from },
                              modifiers,
                              month: from,
                              fromMonth: from,
                              numberOfMonths: 2,
                            }}
                            onDayChange={this.handleToChange}
                          />
                        </span>
                        <Helmet>
                          <style>{`
  .InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .InputFromTo .DayPicker-Day {
    border-radius: 10 !important;
  }
  .InputFromTo .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .InputFromTo .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
  .InputFromTo .DayPickerInput-Overlay {
    width: 300px;
  }
  .InputFromTo-to .DayPickerInput-Overlay {
    margin-left: -198px;
  }
`}</style>
                        </Helmet>

                      </div>


                      <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}>
                        

                        <FormControl className={classes.formControl}>
                          <Select
                            value="{this.age}"
                            onChange={this.handleChange}
                            displayEmpty
                            className={classes.selectEmpty}
                            inputProps={{ 'aria-label': 'Without label' }}
                          >
                            <MenuItem value="" disabled>
                              Name of Field
          </MenuItem>
                            <MenuItem value={10}>Test1</MenuItem>
                            <MenuItem value={20}>Test2</MenuItem>
                            <MenuItem value={30}>Test3</MenuItem>
                          </Select>
                          <FormHelperText>Name of Field</FormHelperText>
                        </FormControl>

                        <FormControl className={classes.formControl}>
                          <Select
                            value="{this.age}"
                            onChange={this.handleChange}
                            displayEmpty
                            className={classes.selectEmpty}
                            inputProps={{ 'aria-label': 'Without label' }}
                          >
                            <MenuItem value="" disabled>
                              Name of Field
          </MenuItem>
                            <MenuItem value={1}>contains</MenuItem>
                            <MenuItem value={2}>does not contain</MenuItem>
                            <MenuItem value={3}>begins with</MenuItem>
                            <MenuItem value={4}>ends with</MenuItem>
                            <MenuItem value={5}>is equal to</MenuItem>
                          </Select>
                          <FormHelperText>Operator</FormHelperText>
                        </FormControl>

                        <FormControl className={classes.formControl}>
                          <Select
                            value="{this.age}"
                            onChange={this.handleChange}
                            displayEmpty
                            className={classes.selectEmpty}
                            inputProps={{ 'aria-label': 'Without label' }}
                          >
                            <MenuItem value="" disabled>
                              Name of Field
          </MenuItem>
                            <MenuItem value={10}>Test1</MenuItem>
                            <MenuItem value={20}>Test2</MenuItem>
                            <MenuItem value={30}>Test3</MenuItem>
                          </Select>
                          <FormHelperText>Value</FormHelperText>
                        </FormControl>


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

export default withRouter(withStyles(styles)(Search));
