import React from "react";
import { Box } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import AppDrawer from "./AppDrawer";
import AppBar from "./AppBar";
import Viewport from "./Viewport";
import { useLocalStorageSync } from "./useLocalStorageSync";
import { ServiceProvider } from "./Service";
import Dashboard from "./Dashboard";
import store from "./store";

const OrderService = React.lazy(() => import("reportCenter/OrderService"));

function useDrawer() {
  const { value, setItem } = useLocalStorageSync(
    "@shared-routing/appdrawer/open"
  );

  return {
    open: value,
    closeDrawer() {
      setItem(false);
    },
    openDrawer() {
      setItem(true);
    },
  };
}

export default function Shell() {
  const drawer = useDrawer();

  return (
    <Provider store={store}>
      <ServiceProvider>
        <BrowserRouter>
          <Viewport>
            <Box display="flex" flex={1}>
              <AppBar drawer={drawer} />
              <AppDrawer drawer={drawer} />
              <React.Suspense fallback={"Loading"}>
                <Switch>
                  <Route path="/dashboard" component={Dashboard} />
                  <Route path="/reports" component={OrderService} />
                  <Route path="*" render={() => <Redirect to="/dashboard" />} />
                </Switch>
              </React.Suspense>
            </Box>
          </Viewport>
        </BrowserRouter>
      </ServiceProvider>
    </Provider>
  );
}
