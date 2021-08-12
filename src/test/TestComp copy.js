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

export default function TestComp(){
    const classes = useStyles();
    const records = useFetchAllRecordsQuery('page');
    //const {data: dataArray,isLoading,isFetching } = useFetchAllRecordsQuery('asn_item');
    let status = records.status;
    let dataRow =[];
    let error = null;
    if(status === 'fulfilled')
      dataRow = records.data.records
    let isError = records.isError;
    if(isError)
      error = records.error.data.message;
    /*
    for( const [key1,value1] of  Object.entries(records)  ){
        console.log(`key1 is ${key1} and value1 is ${value1}`);
        if(key1 === 'status')
            status = value1;
        if(key1 === 'error')
          error = value1.data.message;
        if(key1 === 'isError')
          isError = value1;
        if(status === 'fulfilled' && !isError && key1 === 'data'){
            for(const [key2,value2] of  Object.entries(value1)){
                console.log(`key2 : ${key2} and value2 : ${value2}`);
                for(const [key3,value3] of  Object.entries(value2)){
                    console.log(`key3 : ${key3} and value3 : ${value3}`);
                    dataRow.push(value3);
                    for(const [key4,value4] of  Object.entries(value3)){
                        console.log(`key4 : ${key4} and value4 : ${value4}`);
                        dataLine.push({key4:value4});
                    } 
                }
            }
        }
    }
    */

    if(status === 'pending'){
     return(
        <React.Fragment>
            <h1>Loading</h1>
        </React.Fragment>
     )
    }

    if(isError){
      return(
         <React.Fragment>
             <h2>{error}</h2>
         </React.Fragment>
      )
     }

    const rows = Object.values(dataRow);
    const header_keys = Object.keys(rows[0]);
    const dataArray = Object.entries(rows).map(([key,value],index) => value);
    const validPages = dataArray.map(row => 
      Object.entries(row).map(([key,value],index) => {
     if(key === 'PAGE_URL' && value != '')
        return row["page_name"] = value;
      }
    ))

    /*const asn_id = Object.values(dataRow[0]);
    const index = rows.indexOf(rows[1]);
    console.log(`Rows : ${asn_id}`); 
    console.log(`index is ${index}`);                                                                                                                                                                                          
    console.log(`header_keys : ${header_keys}`);
    */
    function addFunction(){
      console.log("Button function called");
      return (
        <div> <h1>This is Add button</h1></div>
      )
    }
    return(
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

}