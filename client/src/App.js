import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Order from "./pages/Order";
import orderList from "./pages/OrderList";
import errorPage from "./pages/errorPage";
import { Switch, Route } from "react-router";

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={ Order }/>
        <Route exact path="/orderlist" component={ orderList }/>
        <Route exact path={ errorPage }/>
      </Switch>
    </div>
  </Router>
)



export default App;
