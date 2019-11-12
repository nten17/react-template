import * as React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PlaidLink from "react-plaid-link";
import { PLAID_PUBLIC_KEY, PLAID_ENV } from "../config/ConfigGlobal";
import usePlaid from "../hooks/UsePlaid";
import DataTable from "../components/DataTable";
import Button from "@material-ui/core/Button";
import ApiService from "../services/ApiService";
import ActionButton from "../components/ActionButton/ActionButton";

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
  // @ts-ignore
  const [{ transactions, handleSuccess, handleExit }]: any = usePlaid();

  // @ts-ignore
  const [isLoading, setIsLoading]: any = useState(false);

  // remove our accessToken
  async function handleSignout() {
    return apiService.ClearSession();
  }
  // @ts-ignore
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

  const handleClick = () => {
    setIsLoading(!isLoading);
  };

  const LoadingText = () => {
    return <Typography variant="h3">Loading...</Typography>;
  };

  const Transactions = () => {
    return (
      <div className={classes.transactionView}>
        <Typography variant="h3">Recent Transactions</Typography>
        <Typography variant="h6">
          Last 30 days, by spending category (descending)
        </Typography>
        <div>
          <ActionButton
            onClick={() => handleClick()}
            title={isLoading ? "Loading off" : "Loading on"}
          />
          <Button
            onClick={() => handleSignout()}
            variant="contained"
            className={classes.button}
          >
            Sign out
          </Button>
        </div>
        {isLoading ? (
          <LoadingText />
        ) : (
          <DataTable transactions={transactions} />
        )}
      </div>
    );
  };

  return (
    // If we have an accessToken, display our transactions table
    // Otherwise, prompt the user to login with Plaid
    <div className={classes.root}>
      <Transactions />
      {/* {storedAccessToken ? <Transactions /> : <Link />} */}
    </div>
  );
}

export default Dashboard;
