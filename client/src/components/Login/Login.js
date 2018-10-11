import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';

class Login extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      message: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { username, password } = this.state;

    axios.post('/api/auth/login', { username, password })
      .then((result) => {
        localStorage.setItem('jwtToken', result.data.token);
        this.setState({ message: '' });
        this.props.history.push('/')
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.setState({ message: 'Login failed. Username or password not match' });
        }
      });
  }

  render() {
    const { username, password, message } = this.state;
    return (
      <div className="container">
        <form className="form-signin" onSubmit={this.onSubmit}>
          {message !== '' &&
            <div className="alert alert-warning alert-dismissible" role="alert">
              { message }
            </div>
          }

          <img className="Logo" alt="" src={require('../../assets/images/kkd.ico')} width="150px" />
          <h2 className="form-signin-heading">SIGN IN</h2>

          
          <input type="email" id="inputEmail" className="form-control" placeholder="fresh@krispykreme.com" name="username" value={username} onChange={this.onChange} required/>
          <p>EMAIL ADDRESS</p>
          <input type="password" id="inputPassword" className="form-control" placeholder="******" name="password" value={password} onChange={this.onChange} required/>
          <p>PASSWORD</p>
          <button className="btn btn-lg btn-block btnLogin" type="submit">Login</button>
          <button className="btn btn-lg btn-block btnRegister">
             <Link to="/register"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Register here</Link>
          </button>
        </form>
      </div>
    );
  }
}

export default Login;