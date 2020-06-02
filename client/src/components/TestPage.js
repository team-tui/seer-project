import React, { Component, useState } from "react";
import API from '../utils/API';
import { Link } from "react-router-dom";


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Input from '@material-ui/core/Input';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import PropTypes from 'prop-types';

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





//export default 
    class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      tutorials: [],
      currentTutorial: null,
      tutorialDialog: false,
      currentIndex: -1,
      tutorialDate: "",
      showInfo: false,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveTutorials();
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


  retrieveTutorials() {
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
    this.retrieveTutorials();
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
    var tempDate = new Date(tutorial.date);

    this.setState({
      currentTutorial: tutorial,
      currentIndex: index,
      tutorialDate: tempDate
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
  
  descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => this.descendingComparator(a, b, orderBy)
      : (a, b) => -this.descendingComparator(a, b, orderBy);
  }

  stableSort(array, comparator) {
      
      
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  EnhancedTableHead(props) {
    const headCells = [
        {id:'title', color: 'secondary', align: 'center', label:  'Title'},
        {id:'result', color: 'secondary', align: 'center', label:  'Result'},
        {id:'author', color: 'secondary', align: 'center', label:  'Author'},
        {id:'year', color: 'secondary', align: 'center', label:  'Year'},
        {id:'url', color: 'secondary', align: 'center', label:  'URL'},
        {id:'info', color: 'secondary', align: 'center', label:  'Info'},
        {id:'edit', color: 'secondary', align: 'center', label:  'Edit'}
    ]

    const { classes, onSelectAllClick, order, orderBy, numSelected, 
            rowCount, onRequestSort} = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
    <TableHead >
    <TableRow>
        {headCells.map((headCell) => (
            <TableCell align={headCell.align} key={headCell.id}
                    sortDirection={orderBy === headCell.id ? order : false}> 
                <TableSortLabel active={orderBy === headCell.id}
                                direction={orderBy === headCell.id? order : 'asc'}
                                /* onClick={createSortHandler(headCell.id)} */>
                <Typography color={headCell.color}>
                    {headCell.label}
                   
                    {/* {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span> ) : null} */}
                    </Typography>
                </TableSortLabel>


            </TableCell>
        ))}


    </TableRow>
    </TableHead>);
    }
 
/*   EnhancedTable() {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
      };
      
  } */


  render() {
    const { searchTitle, tutorials, currentTutorial, currentIndex, 
      tutorialDate} = this.state;
    const { classes, onRequestSort} = this.props;
    const currentPath = this.props.location.pathname;

 /*    const classes = useStyles(); */
    //const [order, setOrder] ='asc';
    const order='asc';
    //const [orderBy, setOrderBy] ='title';
    const orderBy='title';
    //const [selected, setSelected] = React.useState([]);
   // const [page, setPage] = React.useState(0);
    //const [dense, setDense] = React.useState(false);
    //const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const {orderBy, order} = this.state;
        const isAsc = orderBy === property && order === 'asc';
        this.setState( {order: isAsc ? 'desc' : 'asc', orderBy: property })
        //setOrder(isAsc ? 'desc' : 'asc');
       // setOrderBy(property);
      };
    
    
/*     const headCells = [
        {id:'title', color: 'secondary', align: 'center', label:  'Title'},
        {id:'result', color: 'secondary', align: 'center', label:  'Result'},
        {id:'author', color: 'secondary', align: 'center', label:  'Author'},
        {id:'year', color: 'secondary', align: 'center', label:  'Year'},
        {id:'url', color: 'secondary', align: 'center', label:  'URL'},
        {id:'info', color: 'secondary', align: 'center', label:  'Info'},
        {id:'edit', color: 'secondary', align: 'center', label:  'Edit'}
    ] */

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
      <TableContainer component={Paper}>  
    <Table className={classes.table} size="small" aria-label="simple table">
       {/*  Table Head */}
     {/*   {this.EnhancedTableHead(props)} */}
        <this.EnhancedTableHead
              classes={classes}
              //numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              //onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
             // rowCount={rows.length}
            /> 


{/* {        <TableHead >
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell align={headCell.align}> 
                        <TableSortLabel active={orderBy === headCell.id}
                                        direction={orderBy === headCell.id? order: 'asc'}
                                        onClick={createSortHandler(headCell.id)}>
                        <Typography color={headCell.color}>
                            {headCell.label}
                            </Typography>
                        </TableSortLabel>
                    </TableCell>
                ))}
   <TableCell align="center"><Typography color="secondary">Title</Typography></TableCell>
    <TableCell align="center"><Typography color="secondary">Result</Typography></TableCell>
    <TableCell align="center"><Typography color="secondary">Author</Typography></TableCell>
    <TableCell align="center"><Typography color="secondary">Year</Typography></TableCell>
    <TableCell align="center"><Typography color="secondary">URL</Typography></TableCell>
    <TableCell align="center"><Typography color="secondary">Info</Typography></TableCell>
    <TableCell align="center"><Typography color="secondary">Edit</Typography></TableCell>  
            </TableRow>
        </TableHead>} */}
       {/*  Table Body */}
        <TableBody>
            {tutorials &&
        this.stableSort(tutorials, this.getComparator(order, orderBy)).map((tutorial, index) => (
   /*          tutorials.map((tutorial, index) => ( */
                <TableRow hover key={tutorial.name}>
                    <TableCell>{tutorial.title}</TableCell>
                    <TableCell>{tutorial.description}</TableCell>
                    <TableCell>{tutorial.author}</TableCell>
                    <TableCell>{new Date(tutorial.date).getFullYear()}</TableCell>
                    <TableCell>{tutorial.url}</TableCell>
                    <TableCell>ButtonLink</TableCell>

                </TableRow>
            ))}
        </TableBody>


    </Table>

</TableContainer> 
{/* </Paper> */}
</Grid>
          </Grid>
          </Grid>
          </div>
</React.Fragment>
    );
            }}
export default withRouter(withStyles(styles)(TutorialsList));