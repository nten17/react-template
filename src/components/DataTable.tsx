import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// @ts-ignore
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25
  },
  table: {
    minWidth: 650
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

// Table to display our recent transactions
function DataTable(props: any) {
  const rows = props.transactions;
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell sortDirection="desc" align="right">
              Total Spent
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <TableRow key={row.category}>
              <TableCell sortDirection="desc" component="th" scope="row">
                {row.category}
              </TableCell>
              <TableCell sortDirection="desc" align="right">
                {"$" + row.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default DataTable;
