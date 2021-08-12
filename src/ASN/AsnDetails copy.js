import React from "react";
import { useParams } from "react-router-dom";
import Content from "../Dashboard/Content";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import DriveIcon from "@material-ui/icons/DriveEta";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import VehiclePie from "./VehiclePie";
import RevenueLine from "./RevenueLine";
import ASNDialog from "./ASNDialog";
import { useSelector } from "react-redux";
import { selectAllRecords } from "../ReduxTable/asnSlice";
import ChildTable from "../Dashboard/ChildTable";
import DetailTable from "../Dashboard/DetailTable";

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    position: "relative",
    height: "100px",
  },
  header: {
    display: "flex",
    position: "absolute",
    width: "calc(100%)",
    top: "-70px",
    alignItems: "flex-end",
    "& > *": {
      margin: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
    },
  },
  spacer: {
    flexGrow: "1",
  },
  avatar: {
    border: `3px solid white`,
    width: theme.spacing(13),
    height: theme.spacing(13),
    boxShadow: theme.shadows[3],
  },
  actionGroup: {
    display: "flex",
    width: "330px",
    justifyContent: "space-between",
    marginRight: 0,
  },
  summaryCards: {
    display: "flex",
    flexWrap: "wrap",
  },
  summaryCard: {
    margin: theme.spacing(1),
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  tripCard: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
}));

export function SummaryCard({ title, value, component }) {
  const classes = useStyles();
  return (
    <Paper elevation={2} className={classes.summaryCard}>
      <Typography color={"textSecondary"} variant="h5" gutterBottom>
        {title}
      </Typography>
      {component || (
        <Typography color={"primary"} variant="h3">
          {value}
        </Typography>
      )}
    </Paper>
  );
}

export default function AsnDetails({ asn_id }) {

  const { asnId } = useParams();
  asn_id = asn_id ? asn_id : asnId;
  console.log("Inside ASNDetail ",asn_id);
  const rows = useSelector(selectAllRecords);
  console.log("Inside AsnDetails selectASN : ",rows);
  let asnDetail = rows.find((row) => row.asn_id === +asn_id);
  if (!asnDetail) {
    asnDetail = { asn_id: "-1", asn_code: "-1", asn_type: "-1" };
  }
  const classes = useStyles();
  const loading = false;

  if (loading) {
    return (
      <Content>
        <CircularProgress />
      </Content>
    );
  }

  const trips = 4;
  const distance = 0;
  const fare = 0;
  return (
    <Content>
      <div
        style={{
          height: "200px",
          backgroundPosition: "center",
        }}
      />
      <div className={classes.headerContainer}>
        <div className={classes.header}>
          <Typography variant={"h5"}>{asnDetail.asn_id}</Typography>
          <Chip variant={"outlined"} icon={<DriveIcon />} label="ASN" />
          <div className={classes.spacer} />
          <div className={classes.actionGroup}>
            <ASNDialog
              data={asnDetail}
              render={(open) => (
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={open}
                >
                  Edit
                </Button>
              )}
            />
            <Button variant="outlined" startIcon={<DeleteIcon />}>
              Delete
            </Button>
          </div>
        </div>
      </div>
      <div className={classes.summaryCards}>
        <SummaryCard title="Last 30 Days" component={<RevenueLine />} />
        <SummaryCard title="By Vehicle" component={<VehiclePie />} />
      </div>
      <div className={classes.summaryCards}>
        <SummaryCard title={"Revenue"} value={"$" + fare} />
        <SummaryCard title={"Trips"} value={trips} />
        <SummaryCard title={"Miles"} value={distance} />
        <SummaryCard title={"Rating"} value={4.32} />
      </div>
      <SummaryCard title={"ASN Details"} component={<DetailTable data = {asnDetail}/>} />
      <SummaryCard title={"ASN Items"} component={<ChildTable data = {asnDetail.asnId}/>} />
    </Content>
  );
}
