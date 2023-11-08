import Box from "@mui/material/Box";
import { Tabs } from "components/Molecules/Tabs";
import { useCustomQuery } from "hooks";
import { API_ROUTES } from "constants";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { TOAST_VARIANTS } from "constants";
import { getErrorMessage } from "utils";
import UndeliveredOrders from "components/UndeliveredOrders";
import AllTransactions from "components/AllTransactions";
import getSingletonSocket from "singleton/socket";
import { useQueryClient } from "react-query";
import { EVENTS } from "constants";

const Transactions = () => {
  // For snack notifications
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient();
  const socket = getSingletonSocket();

  const { isLoading: isAllTransactionsLoading, data: allTransactions, isError: isAllTransactionsError, error: AllTransactionsError } = useCustomQuery({
    url: API_ROUTES.transactions.get.endpoint,
    key: API_ROUTES.transactions.get.key,
    select: (data) => data.data.transactions,
  })
  useEffect(() => {
    if (isAllTransactionsError) {
      enqueueSnackbar(getErrorMessage(AllTransactionsError), { variant: TOAST_VARIANTS.ERROR });
    }
    return () => {

    }
  }, [isAllTransactionsError, AllTransactionsError])


  // On initial render set the socket connection for different functionality
  useEffect(() => {
    const handleNewOrder = (value) => {
      // console.log('A new Order has been receved', value)
      // Update Undelivered Orders (Append new order to list)
      queryClient.setQueryData(
        [API_ROUTES.transactions.get.key],
        (oldVendorTransactions) => {
          return {
            ...oldVendorTransactions,
            data: {
              transactions: [
                value,
                ...oldVendorTransactions.data.transactions,
              ],
            },
          };
        }
      );
    }
    if (socket) {
      socket.on('testEvent', (value) => {
        console.log("The test event has been fired", value)
      })
      // socket.on(EVENTS.ORDER_UPDATED, (value) => {
      //   console.log('The order has been marked as compled', value)
      // });
      socket.on(EVENTS.TRANSACTIONS, handleNewOrder);
    }

    return () => {
      if (socket) {
        socket.off(EVENTS.TRANSACTIONS, handleNewOrder);
      }
    };
  }, [socket]);

  // if (!isLoading) {
  //   return <CircularProgress />
  // }
  // console.log("The All trasnactons Parent page are", allTransactions)
  const tabItems = [
    {
      label: "Undelivered Orders",
      loading: isAllTransactionsLoading,
      content: <UndeliveredOrders transactions={allTransactions} />,
    },
    {
      label: "All Orders",
      loading: isAllTransactionsLoading,
      content: <AllTransactions transactions={allTransactions} />,
    },
  ];


  // Show all the undelivered orders here
  return (
    <Box sx={{ pb: 7 }}>
      <Tabs items={tabItems} panelStyle={{ minHeight: "65vh" }} />
    </Box>
  );
};

export default Transactions;
