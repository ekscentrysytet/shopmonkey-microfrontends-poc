import {
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
  List,
  ListItem,
} from "@material-ui/core";
import React from "react";

import { Switch, Route, Link, Redirect } from "react-router-dom";

import { orders } from "./data";
import { useServiceContext } from "shell/Service";

function preventDefault(event) {
  event.preventDefault();
}

function Title() {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      Recent Orders
    </Typography>
  );
}

function OrderRow(props) {
  return (
    <TableRow key={props.order.id}>
      <TableCell>{props.order.date}</TableCell>
      <TableCell>{props.order.name}</TableCell>
      <TableCell>{props.order.shipTo}</TableCell>
      <TableCell>{props.order.paymentMethod}</TableCell>
      <TableCell align="right">{props.order.amount}</TableCell>
    </TableRow>
  );
}

const OrdersReport = () => (
  <>
    <Typography component="h1" variant="h6" color="primary" gutterBottom>
      Orders
    </Typography>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Ship To</TableCell>
          <TableCell>Payment Method</TableCell>
          <TableCell align="right">Sale Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders.map((order) => (
          <OrderRow order={order} key={order.id} />
        ))}
      </TableBody>
    </Table>
  </>
);

const SalesReport = () => (
  <>
    <Typography component="h1" variant="h6" color="primary" gutterBottom>
      Sales
    </Typography>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Ship To</TableCell>
          <TableCell>Payment Method</TableCell>
          <TableCell align="right">Sale Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders.slice(0, 2).map((order) => (
          <OrderRow order={order} key={order.id} />
        ))}
      </TableBody>
    </Table>
  </>
);

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  },
}));

export default function OrderService() {
  const classes = useStyles();
  const serviceContext = useServiceContext();

  React.useEffect(() => {
    serviceContext.setService({ title: "Reports" });
  }, []);

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Grid container className={classes.container}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <List>
              <ListItem>
                <Link to="/reports/sales">Sales Report</Link>
              </ListItem>
              <ListItem>
                <Link to="/reports/orders">Orders Report</Link>
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <Switch>
              <Route
                path="/reports"
                exact
                render={() => <Redirect to="/reports/sales" />}
              />
              <Route path="/reports/sales" component={SalesReport} />
              <Route path="/reports/orders" component={OrdersReport} />
            </Switch>
          </Paper>
        </Grid>
      </Grid>
    </main>
  );
}
