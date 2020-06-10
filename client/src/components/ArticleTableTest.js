import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import MUIDataTable from "mui-datatables";
import { createMuiTheme } from "@material-ui/core/styles";

const columns = [
  {
    name: "Type",
    options: {
      setCellHeaderProps: (value) => ({
        style: { color: "#3f51b5", fontSize: "15px" },
      }),
    },
  },
  {
    name: "Title",
    options: {
      setCellHeaderProps: (value) => ({
        style: { color: "#3f51b5", fontSize: "15px" },
      }),
    },
  },
  {
    name: "Result",
    options: {
      setCellHeaderProps: (value) => ({
        style: { color: "#3f51b5", fontSize: "15px" },
      }),
    },
  },
  {
    name: "Author",
    options: {
      setCellHeaderProps: (value) => ({
        style: { color: "#3f51b5", fontSize: "15px" },
      }),
    },
  },
  {
    name: "Year",
    options: {
      setCellHeaderProps: (value) => ({
        style: { color: "#3f51b5", fontSize: "15px" },
      }),
    },
  },
  {
    name: "URL",
    options: {
      sort: false,
      filter: false,
      setCellHeaderProps: (value) => ({
        style: { color: "#3f51b5", fontSize: "15px" },
      }),
    },
  },
  {
    name: "Info",
    options: {
      sort: false,
      filter: false,
      setCellHeaderProps: (value) => ({
        style: { color: "#3f51b5", fontSize: "15px" },
      }),
    },
  },
  {
    name: "Status",
    options: {
      setCellHeaderProps: (value) => ({
        style: { color: "#3f51b5", fontSize: "15px" },
      }),
    },
  },
];

const options = {
  filter: true,
  filterType: "checkbox",
  responsive: "scroll",
  selectableRows: false,
  resizeableColumns: true,
  pagination: false,
  print: false,
  download: false,
  setTableProps: () => {
    return {
      size: "small",
    };
  },
};

createMuiTheme({
  overrides: {
    MUIDataTable: {
      root: {
        backgroundColor: "#FFFFFF",
      },
      paper: {
        boxShadow: "none",
      },
    },
    MUIDataTableBodyCell: {
      root: {
        backgroundColor: "#FFFFFF",
      },
    },
  },
});

makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  //fixing table height allows for vertical scroll bar and sticky headers
  container: {
    maxHeight: 600,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function ArticleTableTest(props) {
  const rows = props.ArticlesArray;
  const array = [];
  rows.map((row) =>
    row.results.split(";").map((result) =>
      array.push([
        row.type,
        row.title,
        result,
        row.author,
        new Date(row.date).getFullYear(),
        <Button
          color="secondary" //variant="contained"
          onClick={() => window.open(row.url, "_blank")}
        >
          {" "}
          Link
        </Button>,
        <Button
          color="primary" //variant="contained"
          onClick={() => window.open(row.url, "_blank")}
        >
          {" "}
          Info
        </Button>,
        row.status.state,
      ])
    )
  );

  return (
    /* <MuiThemeProvider theme={useStyles}> */
    <MUIDataTable
      title={"Articles"}
      data={array}
      columns={columns}
      options={options}
    />
    /* </MuiThemeProvider>  */
  );
}
