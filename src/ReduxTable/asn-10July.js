import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MuiAlert from "@material-ui/lab/Alert";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Content from "../Dashboard/Content";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Toolbar from "@material-ui/core/Toolbar";
import ASNDialog from "../ASN/ASNDialog";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import DeletePeopleDialog from "../People/DeletePeopleDialog";
import DeleteIcon from "@material-ui/icons/Delete";
import { SummaryCard } from "../ASN/AsnDetails";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import {useFetchAllAsnQuery} from "./apiSlice";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  return order === "desc"
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

const headCells = [
  { id: "asn_id", numeric: true, disablePadding: false, label: "ASN_ID" },
  { id: "asn_code", numeric: true, disablePadding: false, label: "ASN_CODE" },
  { id: "asn_type", numeric: true, disablePadding: false, label: "ASN_TYPE" },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
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
  grow: {
    flexGrow: 1,
  },
  deleteButton: {
    marginLeft: theme.spacing(1),
  },
}));

export default function Asn() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  //const asn = useSelector(selectAsn);
  //const loading = useSelector(loadAsn);
  //const error = useSelector(loadError);
  // todo with snacks
  const [snackOpen, setSnackOpen] = React.useState(false);
  //const dispatch = useDispatch();

/*
	useEffect(()=>{
		//if(loading_status === false)
			dispatch(useGetAllASN);
		//console.log("ASN inside hook",asn);
	},[]);
*/

  const records = useFetchAllAsnQuery('asn');
  console.log("records value is :",records);
  const asn = records.data;
  const loading = records.isLoading;
  const error = records.isError;

  let rows = asn.map(dataRow => {
    return {id : dataRow.asn_id,asn_id:dataRow.asn_id,asn_code:dataRow.asn_code,asn_type:dataRow.asn_type}
  }) ;

  let history = useHistory();
  if (loading) {
    return (
      <Content>
        <CircularProgress />
      </Content>
    );
  }

  if (error) return `Error! ${error.message}`;
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const selectTableRow = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;
  const snackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };

  return (
    <Content>
      <Snackbar open={snackOpen} autoHideDuration={2000} onClose={snackClose}>
        <Alert onClose={snackClose} severity="success">
          {snackOpen}
        </Alert>
      </Snackbar>
      <div className={classes.root}>
        <Toolbar>
          <div edge="start" className={classes.grow} />
          <ASNDialog
            edge="end"
            onSave={() => {
              setSnackOpen("ASN added");
            }}
            render={(open) => (
              <Button
                edge="end"
                color="primary"
                variant="contained"
                startIcon={<AddIcon />}
                onClick={open}
              >
                Add ASN
              </Button>
            )}
          />
          {selected.length > 0 && (
            <Tooltip title={"Delete"}>
              <DeletePeopleDialog
                ids={selected}
                onSave={() => {

                  setSnackOpen(
                    `${selected.length} Driver${
                      selected.length > 1 ? "s" : ""
                    } Deleted`
                  );
                  setSelected([]);
                }}
                render={(open) => (
                  <Button
                    className={classes.deleteButton}
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={open}
                  >
                    {" "}
                    Delete {selected.length} selected
                  </Button>
                )}
              />
            </Tooltip>
          )}
        </Toolbar>
        <SummaryCard
          title={"ASNs"}
          value={
            <>
              <TableContainer>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size={"small"}
                  aria-label="enhanced table"
                >
                  <EnhancedTableHead
                    classes={classes}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.id);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            onClick={(e) => {
                              if (
                                e.target.type === "checkbox" ||
                                e.target.className.indexOf("Checkbox") > 0
                              ) {
                                return;
                              }
                              history.push(`/asn/${row.id}`);
                            }}
                            key={`asn-${row.id}`}
                            selected={isItemSelected}
                            style={{ cursor: "pointer" }}
                          >
                            <TableCell
                              padding="checkbox"
                              onClick={(e) => {
                                selectTableRow(row.id);
                              }}
                            >
                              <Checkbox
                                checked={isItemSelected}
                                inputProps={{ "aria-labelledby": labelId }}
                                onChange={(e) => {
                                  selectTableRow(row.id);
                                }}
                              />
                            </TableCell>
                            <TableCell align="right">{row.asn_id}</TableCell>
                            <TableCell align="right">{row.asn_code}</TableCell>
                            <TableCell align="right">{row.asn_type}</TableCell>
                          </TableRow>
                        );
                      })}
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
            </>
          }
        />
      </div>
    </Content>
  );
}
