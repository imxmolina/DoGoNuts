import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Order from "./pages/Order";
// import orderList from "./pages/OrderList";
import errorPage from "./pages/errorPage";
import { Switch, Route } from "react-router";
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import CreateBoxPage from "./pages/CreateBoxPage/CreateBoxPage";

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={CreateBoxPage} />
        <Route exact path="/:id" component={Order}/>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route component={errorPage} />
      </Switch>
    </div>
  </Router>
)

export default App;
