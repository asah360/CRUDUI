import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {useAddRecordMutation} from '../ReduxTable/recordSlice';


export default function ASNDialog({ data, render, onSave }) {
  const [addRecords] = useAddRecordMutation();
  const [open, setOpen] = React.useState(false);
  console.log("ASNDialog ",data);
  const default_asn_id = data && data.asn_id;
  const default_asn_code = data && data.asn_code;
  const default_asn_type = data && data.asn_type;
  // Existing ID or random ID
  const id = data && data.id;

  const [asn_id, setAsn_id] = React.useState(default_asn_id);
  const [asn_code, setAsn_code] = React.useState(default_asn_code);
  const [asn_type, setAsn_type] = React.useState(default_asn_type);
  const handleClickOpen = () => {
    setOpen(true);
    setAsn_id(default_asn_id);
    setAsn_code(default_asn_code);
    setAsn_type(default_asn_type);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const action = addRecords;
    console.log(`action : ${action} , asn_id : ${asn_id} , asn_code : ${asn_code} , asn_type : ${asn_type}`);
    var bodyObject = {};
    bodyObject["asn_code"] = asn_code;
    bodyObject["asn_type"] = asn_type;
    const output = addRecords(bodyObject);
    console.log(`output is ${output}`);
    onSave && onSave();
    handleClose();
  };

  return (
    <>
      {render(handleClickOpen)}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {data ? "Edit" : "Add"} ASN{" "}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="asn_id"
            label="ASN_ID"
            fullWidth
            value={asn_id}
            onChange={(e) => {
              setAsn_id(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="asn_code"
            label="ASN_CODE"
            fullWidth
            value={asn_code}
            onChange={(e) => {
              setAsn_code(e.target.value);
            }}
          />
           <TextField
            autoFocus
            margin="dense"
            id="asn_type"
            label="ASN_TYPE"
            fullWidth
            value={asn_type}
            onChange={(e) => {
              setAsn_type(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
