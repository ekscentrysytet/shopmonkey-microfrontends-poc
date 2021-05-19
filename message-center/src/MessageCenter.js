import React from "react";
import {
  Typography,
  Box,
  Paper,
  makeStyles,
  List,
  ListItem,
  Button,
} from "@material-ui/core";
import { Provider, useDispatch, useSelector } from "react-redux";

import store from "shell/store";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

const MessageCenter = () => {
  const classes = useStyles();
  // const customers = [
  //   [
  //     "1",
  //     { firstName: "Naz", lastName: "Ilk", email: "ekscentrysytet@gmail.com" },
  //   ],
  // ];
  const customers = useSelector((state) =>
    Object.entries(state.customers.data)
  );
  const dispatch = useDispatch();

  const handleUpdateCustomerById = (customerId, data) =>
    dispatch({
      type: "UPDATE_CUSTOMER_BY_ID",
      payload: { customerId, data },
    });

  return (
    <Provider store={store}>
      <Paper className={classes.paper}>
        <Box flex={1}>
          <Typography component="h1" variant="h6" color="primary" gutterBottom>
            Message Center
          </Typography>
          <List>
            {customers.map(([id, c]) => (
              <ListItem key={id}>
                {c.firstName}&nbsp;
                {c.lastName}&nbsp;({c.email})
                <Button
                  color="primary"
                  onClick={() =>
                    handleUpdateCustomerById(id, { firstName: "UPDATED" })
                  }
                >
                  Update
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </Provider>
  );
};

export default MessageCenter;

// export default ({ store }) => (
//   <Provider store={store}>
//     <MessageCenter />
//   </Provider>
// );
