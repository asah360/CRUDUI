import { ListItemAvatar } from '@material-ui/core';
import React from 'react';
import {useFetchAllRecordsQuery} from './TestSlice';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
    seeMore: {
      marginTop: theme.spacing(3),
    },
  }));
  const [componentValue, setComponentValue] = React.useState("<h1></h1>");
export default function TestComp(){
    const classes = useStyles();
    const records = useFetchAllRecordsQuery('page');
    let status = records.status;
    let dataRow =[];
    let error = null;
    if(status === 'fulfilled')
      dataRow = records.data.records
    let isError = records.isError;
    if(isError)
      error = records.error.data.message;
    if(status === 'pending'){
      setComponentValue(
        <React.Fragment>
            <h1>Loading</h1>
        </React.Fragment>
     )
    }

    if(isError){
      setComponentValue(
         <React.Fragment>
             <h2>{error}</h2>
         </React.Fragment>
      )
     }

    const rows = Object.values(dataRow);
    const header_keys = Object.keys(rows[0]);
    const dataArray = Object.entries(rows).map(([key,value],index) => value);
    let validPageIndex = [];
    dataArray.map(row => {
      if(row.page_url !== null && row.page_url !== '')
        validPageIndex.push(dataArray.indexOf(row));
    })
    console.log(`validPageIndex ${validPageIndex}`);
    let validPageIndexFor = [];
    for (const row of dataArray){
      if(row.page_url !== null && row.page_url !== ''){
        validPageIndexFor.push(dataArray.indexOf(row));
      }
    }
    console.log(`validPageIndexFor ${validPageIndexFor}`);

    function addFunction(){
      console.log("Button function called");
      return (
        <div> <h1>This is Add button</h1></div>
      )
    }


    //return(
      setComponentValue(
    <React.Fragment>
        <h1>ASN Table</h1>
        <Button color = "primary" onClick={() => addFunction()}>Add</Button>
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
            dataArray.map(item => {
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
    </React.Fragment>
    )
   /*
   return (
     <div>
       <h1>Test Comp Hello</h1>
     </div>
   )*/

};
export const componentValue;