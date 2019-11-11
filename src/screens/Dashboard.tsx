import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PlaidLink from "react-plaid-link";
import { PLAID_PUBLIC_KEY, PLAID_ENV } from "../config/ConfigGlobal";
import usePlaid from "../hooks/UsePlaid";
import DataTable from "../components/DataTable";
import Button from "@material-ui/core/Button";
import ApiService from "../services/ApiService";

// @ts-ignore
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  transactionView: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    padding: 25
  },
  linkView: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    padding: 25
  },
  button: {
    background: "pink"
  }
}));

function Dashboard(props: any) {
  const classes: any = useStyles(props);
  const apiService: any = new ApiService();
  const [
    { storedAccessToken, transactions, handleSuccess, handleExit }
  ]: any = usePlaid();

  // remove our accessToken
  async function handleSignout() {
    return apiService.ClearSession();
  }

  const Link = () => {
    return (
      <div className={classes.linkView}>
        <PlaidLink
          clientName={"demo"}
          env={PLAID_ENV}
          product={["transactions", "liabilities"]}
          publicKey={PLAID_PUBLIC_KEY}
          onExit={handleExit}
          onSuccess={handleSuccess}
        >
          <Button variant="contained" className={classes.button}>
            Link your bank account with Plaid
          </Button>
        </PlaidLink>
      </div>
    );
  };

  const Transactions = () => {
    return (
      <div className={classes.transactionView}>
        <Typography variant="h3">Recent Transactions</Typography>
        <Typography variant="h6">
          Last 30 days, by spending category (descending)
        </Typography>
        <div>
          <Button
            onClick={() => handleSignout()}
            variant="contained"
            className={classes.button}
          >
            Sign out
          </Button>
        </div>
        <DataTable transactions={transactions} />
      </div>
    );
  };

  return (
    // If we have an accessToken, display our transactions table
    // Otherwise, prompt the user to login with Plaid
    <div className={classes.root}>
      {storedAccessToken ? <Transactions /> : <Link />}
    </div>
  );
}

export default Dashboard;
