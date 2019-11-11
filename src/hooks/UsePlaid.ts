import { useState, useEffect } from "react";
import ApiService from "../services/ApiService";

// This exposes controller methods for our API service
const usePlaid = () => {
  const apiService = new ApiService();

  const [storedAccessToken, setStoredAccessToken]: any = useState(false);
  const [transactions, setTransactions]: any = useState([]);

  async function getTransactions() {
    const transactions: any = await apiService.GetTransactions();

    console.log("got tx", transactions);

    return setTransactions(transactions);
  }

  async function handleSuccess(publicToken: string, metadata: any) {
    console.log("handle success", metadata);
    const response: any = await apiService.TokenExchange(publicToken);
    if (!response) {
      return undefined;
    }

    console.log("got response", response);
    // Load recent transactions if token exchange succeeds
    setTransactions(response);
    // And update our state so the transaction table is displayed
    return setStoredAccessToken(true);
  }

  async function handleExit() {
    // Do nothing
  }

  // This is called each time the component is rendered
  useEffect(() => {
    // Check if our accessToken exists, then fetch recent transactions
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      getTransactions().then(() => setStoredAccessToken(true));
    }
  }, []);

  return [
    {
      getTransactions,
      handleExit,
      handleSuccess,
      storedAccessToken,
      setStoredAccessToken,
      transactions,
      setTransactions
    }
  ];
};

export default usePlaid;
