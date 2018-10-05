import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Order from "./pages/Order";
// import orderList from "./pages/OrderList";
import errorPage from "./pages/errorPage";
import { Switch, Route } from "react-router";
import Nav from "./components/Nav";
import Login from './components/Login/Login';
import Register from './components/Login/Register';

const App = () => (
  <Router>
    <div>
      <Nav>
        {localStorage.getItem('jwtToken') &&
          <button className="btn btn-primary" onClick={this.logout}>Logout</button>
        }
      </Nav>
      <Switch>
        <Route exact path="/" component={Order} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />

        {/* <Route exact path="/orderlist" component={ orderList }/> */}
        <Route component={errorPage} />
      </Switch>
    </div>
  </Router>
)

export default App;
