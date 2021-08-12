import React, { useContext } from 'react';
import { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));


export default function ChildTable(data) {
  const classes = useStyles();
  //const { data } = useContext(DataContext);



  const rows = Object.values(data);
  const header_keys = Object.keys(rows[0]);
  //console.log("Expense Table data :",data);
  //console.log("Expense Table rows :",rows);
  //console.log("Expense Table keys:",header_keys);
  return (
    <React.Fragment>
      <Title>ASN Details</Title>
      <TableContainer style={{ width: 850 }}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          {header_keys.map((key,index) => {
              return <TableCell>{key.toUpperCase()}</TableCell>})}
          </TableRow>
        </TableHead>
        <TableBody>
          {
            rows.map(item => {
              return(<TableRow key = {rows.indexOf(item)}>
                {
                  Object.entries(item).map(([key,value],index) => {
                    return (<TableCell>{value}</TableCell>)
                  })
                }
              </TableRow>)
            })
          }
        </TableBody>
      </Table>
      </TableContainer>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
