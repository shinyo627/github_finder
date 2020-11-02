import React, { Component, Fragment } from "react";
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import axios from 'axios'
import Search from './components/Search'
import Alert from './components/Alert'
import About from './components/About'
import User from './components/User'
import "./App.css";

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: [],
  }
  
  // async componentDidMount() {
  //   this.setState({ loading: true});
    
  //   const res = await axios.get('https://api.github.com/users?');

  //   this.setState({users: res.data, loading: false})

  // }
   
  // Search Github users
   searchUsers = async(text) => {
    console.log(text);
    this.setState({ loading: true});
    const res = await axios.get(`https://api.github.com/search/users?q=${text}`);

    this.setState({users: res.data.items, loading: false})
  }

  // Get single Github user
  getUser = async (username) => {
    this.setState({ loading: true});
    const res = await axios.get(`https://api.github.com/users/${username}`);
    // console.log('is user info responding? ',res.data)
    this.setState({user: res.data, loading: false})
  }

  // Get a user's repo
  getUserRepos = async (username) => {
    this.setState({ loading: true});
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&`);
    console.log('is user info responding? ',res.data)
    this.setState({repos: res.data, loading: false})
  }

  // Clear Users
  clearUsers = () => {
    this.setState({users: [], loading: false})
  }

  setAlert = (message, type) => {
    this.setState({ alert: {message: message, type: type}})

    setTimeout(() => this.setState({ alert: null}), 8000)
  }

  
  render() {
    const {loading, users, alert, user, repos} = this.state

    return (
      <Router>
        <div className="App">
        <Navbar />
        <div className='container'>
        <Alert alert={alert} />
        
        <Switch>
          <Route exact path='/' render={props => (
            <Fragment>
             <Search 
              searchUsers={this.searchUsers} 
              clearUsers={this.clearUsers} 
              showClear={this.state.users.length > 0 ? true : false} 
              setAlert={this.setAlert}
              />
            <Users loading={loading} users={users}/>
            </Fragment>
          )} />

          <Route exact path='/about' render={About}/>
          <Route exact path='/user/:login' render={props => (
            // use spread to pass all the props
            <User 
            {...props} 
            getUser={this.getUser} 
            user={user} 
            loading={loading} 
            getUserRepos={this.getUserRepos} 
            repos={repos}
            />
          )}/>
        </Switch>
        </div>
      </div>
      </Router> 
    );
  }
}

export default App;
