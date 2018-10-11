import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import axios from 'axios';
import './Login.css';

class Create extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
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

    axios.post('/api/auth/register', { username, password })
      .then((result) => {
        this.props.history.push("/login")
      });
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className="container">
        <form className="form-signin" onSubmit={this.onSubmit}>

          <img className="Logo" src={require('../../assets/images/kkd.ico')} width="150px" />

          <h2 className="form-signin-heading">Create Account</h2>

          <input type="email" className="form-control" placeholder="fresh@krispykreme.com" name="username" value={username} onChange={this.onChange} required />
          <p>EMAIL ADDRESS</p>

          <input type="password" className="form-control" placeholder="******" name="password" value={password} onChange={this.onChange} required />
          <p>PASSWORD</p>
          <button className="btn btn-lg btn-danger btn-block" type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default Create;