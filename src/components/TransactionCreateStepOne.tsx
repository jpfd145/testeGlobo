import React from "react";
import { makeStyles, Paper } from "@material-ui/core";
import { User } from "../models";

const useStyles = makeStyles((theme) => ({
  paper: {
    //marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export interface TransactionCreateStepOneProps {
  setReceiver: Function;
  userListSearch: Function;
  users: User[];
}

const TransactionCreateStepOne: React.FC<TransactionCreateStepOneProps> = ({
  setReceiver,
  userListSearch,
  users,
}) => {
  const classes = useStyles();

  return <Paper className={classes.paper} elevation={0}></Paper>;
};

export default TransactionCreateStepOne;
