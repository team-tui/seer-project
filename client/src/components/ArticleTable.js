/* This Component takes an array of Articles and 
displays them in a table with sortable rows.
Todo:
  Remove sort from URL and INFO columns
  Probably remove dense option from bottom TODO@s-ward
  Probably remove page function 
  Change id 'description' to 'result' 
  Something about displaying Articles with multiple results on different rows?
  Make table span more width of page?

  **PO priority 4. To be able to select what info (columns?) to display***
  on a seperate note why what's the point?

Issues:
  Atm sort does alphabetically capital letter, then lowercase letter?
    -Easy fix ensure format is the same ie. Author always starts with capital
  Sort on Results column will sort based on the FIRST result in string only
    -not sure if this is good or bad? sorting all results of same article will 
      spread that same article through the table which will look messy*/


import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from "@material-ui/core/Button";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

/* Hard coded column headers */
const headCells = [
  { id: 'type', color: 'secondary', align: 'center', disablePadding: true, label: 'Type' },
  { id: 'title', color: 'secondary', align: 'center', disablePadding: true, label: 'Title' },
  { id: 'results', color: 'secondary', align: 'center', disablePadding: false, label: 'Result' },
  { id: 'author', color: 'secondary', align: 'center', disablePadding: false, label: 'Author' },
  { id: 'date', color: 'secondary', align: 'center', disablePadding: false, label: 'Year' },
  { id: 'url', color: 'secondary', align: 'center', disablePadding: false, label: 'URL' },
  { id: 'info', color: 'secondary', align: 'center', disablePadding: false, label: 'Info' }
];

function ArticleTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography color={headCell.color}>
                {headCell.label}
              </Typography>
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

ArticleTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  //fixing table height allows for vertical scroll bar and sticky headers 
  container : {
    maxHeight: 600,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function ArticleTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

 /*  The array of articles to display */
  const rows = props.ArticlesArray;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer className={classes.container}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="article table"
            stickyHeader
          >
            <ArticleTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {

                  return (
                    row.results.split(";").map((result, index) => (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.name}
                    >
                      <TableCell align="left">{row.type}</TableCell>
                      <TableCell align="left">{row.title}</TableCell>
                      <TableCell style={{whiteSpace: "pre"}} align="right">{result}</TableCell>
                      <TableCell align="right">{row.author}</TableCell>
                      <TableCell align="right">{new Date(row.date).getFullYear()}</TableCell> 
                      <TableCell align="center">
                        <Button color="secondary" //variant="contained"
                        onClick={() => window.open(row.url, "_blank")}> Link
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button color="primary" //variant="contained"
                            onClick={() => window.open(row.url, "_blank")}> Info
                        </Button>
                      </TableCell>
                    </TableRow>
                  )));
                })}

              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}
