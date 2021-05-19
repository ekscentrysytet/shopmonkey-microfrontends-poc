import {
  Container,
  Grid,
  makeStyles,
  CircularProgress,
  Paper,
  Box,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

// import Button from "shopmonkey-ui-kit/Button";
// import Input from "shopmonkey-ui-kit/Input";
import { useServiceContext } from "./Service";

const RecentOrders = React.lazy(() =>
  import("reportCenter/RecentOrdersWidget")
);
const MessageCenter = React.lazy(() => import("messageCenter/MessageCenter"));

const useWidgetStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
  },
}));

function Loading() {
  return (
    <Box display="flex" flex={1} justifyContent="center" alignItems="center">
      <CircularProgress />
    </Box>
  );
}

const Widget = (props) => {
  const classes = useWidgetStyles();
  return (
    <Paper style={{ height: props.height }} className={classes.paper}>
      <React.Suspense fallback={<Loading />}>{props.children}</React.Suspense>
    </Paper>
  );
};

const RecentOrderWidget = () => (
  <Widget height="500px">
    <RecentOrders />
  </Widget>
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
}));

export default function Dashboard() {
  const classes = useStyles();
  const serviceContext = useServiceContext();
  React.useEffect(() => {
    serviceContext.setService({ title: "Dashboard" });
  }, []);

  const nazar = useSelector((state) => state.customers.data["1"]);

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        {/* <Button>This is UI KIT button</Button> */}
        {/* <Input /> */}
        <Grid>
          Nazar in main app
          <br />
          {nazar.firstName} {nazar.lastName}
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <RecentOrderWidget />
          </Grid>
          <Grid item xs={12}>
            <React.Suspense fallback={<div>Loading Message Center</div>}>
              <MessageCenter />
            </React.Suspense>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
