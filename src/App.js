import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Users from './components/Users';
import axios from 'axios';
import Search from './components/Search';
import Alert from './components/Alert';
import About from './components/About';
import User from './components/User';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [repos, setRepos] = useState([]);

  // async componentDidMount() {
  //   this.setState({ loading: true});

  //   const res = await axios.get('https://api.github.com/users?');

  //   this.setState({users: res.data, loading: false})

  // }

  // Search Github users
  const searchUsers = async (text) => {
    console.log(text);
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}`
    );
    setUsers(res.data.items);
    setLoading(false);
  };

  // Get single Github user
  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}`);
    // console.log('is user info responding? ',res.data)
    setUser(res.data);
    setLoading(false);
  };

  // Get a user's repo
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&`
    );
    console.log('is user info responding? ', res.data);

    setRepos(res.data);
    setLoading(false);
  };

  // Clear Users
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  const showAlert = (message, type) => {
    setAlert(message, type);
    setTimeout(() => setAlert(null), 8000);
  };

  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert alert={alert} />

          <Switch>
            <Route
              exact
              path='/'
              render={(props) => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={showAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}
            />

            <Route exact path='/about' render={About} />
            <Route
              exact
              path='/user/:login'
              render={(props) => (
                // use spread to pass all the props
                <User
                  {...props}
                  getUser={getUser}
                  user={user}
                  loading={loading}
                  getUserRepos={getUserRepos}
                  repos={repos}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
