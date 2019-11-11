import {
  PLAID_PUBLIC_KEY,
  PLAID_CLIENT_ID,
  PLAID_SECRET
} from "../config/ConfigGlobal";
import plaid from "plaid";
import * as _ from "lodash";
import moment from "moment";

// Date utils
const now = moment().format("YYYY-MM-DD");
const pastMonth = moment()
  .subtract(30, "days")
  .format("YYYY-MM-DD");

// Init plaid
const plaidClient = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments.sandbox
);

// Handler for our accessToken
const accessToken: any = localStorage.getItem("accessToken");

export default class ApiService {
  // Exchange public token from link for an access token from the Plaid client
  public async TokenExchange(publicToken: string) {
    const response = await plaidClient.exchangePublicToken(publicToken);

    if (!response.access_token) {
      return false;
    }

    // Set our accessToken in local storage
    await localStorage.setItem("accessToken", response.access_token);

    // Reload the window to avoid race condition between storing token in localStorage and fetching transactions
    window.location.reload();

    // Call the function below to get recent transactions
    const transactions = await this.GetTransactions();
    return transactions;
  }

  public async GetTransactions() {
    const response = await plaidClient.getTransactions(
      accessToken,
      // Get transactions from past month
      pastMonth,
      now
    );

    const transactions = response.transactions;
    console.log("TX", transactions);

    // Remove special transactions, like credit card payments and bank fees
    const onlyPlaces = _.remove(
      transactions,
      i => i.transaction_type !== "special"
    );

    // Group array elements by category
    const groupedCategories = _.chain(onlyPlaces)
      .groupBy("category")
      // Key is group name (category), value is array of objects (transactions)
      .map((value, key) => ({
        category: key,
        amount: _.sum(_.map(value, "amount"))
      }))
      .value();

    // Order spending in descending order
    const orderedCategories = _.orderBy(
      groupedCategories,
      ["amount"],
      ["desc"]
    );
    return orderedCategories;
  }

  public async ClearSession() {
    // clear our accessToken from localStorage
    localStorage.clear();
    // ...and reload browser window to display bank link button again
    return window.location.reload();
  }
}
