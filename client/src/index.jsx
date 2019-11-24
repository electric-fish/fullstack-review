import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import UserList from './components/UserList.jsx';
import UserInfo from './components/UserInfo.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      repos: [],
      users: [],
      userRepos: []
    }
  }

  componentDidMount () {
    fetch('http://localhost:1128/repos', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then( (result) => {
      return result.json();
    })
    .then( (result) => {
      // console.log(result);
      this.setState({
        repos: result
      });
      return fetch('http://localhost:1128/users', {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      });
    })
    .then( (result) => {
      return result.json();
    })
    .then ((result) => {
      this.setState({
        users: result
      });
      // console.log(result);
    })
    .catch( (error) => {
      console.log(error);
    });
  }



  search (term) {
    console.log(`Searching '${term}'...`);

    fetch('http://localhost:1128/repos', {
      method: 'POST',
      body: term,
      headers: {
        'content-type': 'text/plain'
      }
    })
    .then( (result) => {
      if (result.status > 400) {
        return result;
      } else {
        console.log('Trying to fetch new data.');
        return fetch('http://localhost:1128/repos', {
          method: 'GET',
          headers: {
            'content-type': 'application/json'
          }
        });
      }
    })
    .then( (result) => {
      return result.json();
    })
    .then( (result) => {

      if (typeof result === 'string') {
        alert(result);
      } else {
        this.setState({
          repos: result
        });
      }

      return fetch('http://localhost:1128/users', {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      });

    })
    .then( (result) => {
      return result.json();
    })
    .then ((result) => {
      this.setState({
        users: result
      });
    })
    .catch( (error) => {
      console.log(error);
    });
  }



  userClickHandler (userid) {
    fetch('http://localhost:1128/userinfo?q=' + userid, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then( (result) => {
      return result.json();
    })
    .then( (result) => {
      this.setState({
        page: 1,
        userRepos: result
      });
    });
  }

  homeClickHandler () {
    this.setState({
      page: 0
    });
  }


  render () {
    if (this.state.page === 0) {
      return (<div>
        <h1>Github Fetcher</h1>
        <Search onSearch={this.search.bind(this)} />
        <RepoList repos={this.state.repos} />
        <UserList users={this.state.users} userClickHandler={this.userClickHandler.bind(this)} />
      </div>)
    } else {
      return (<div>
        <h1>User Page</h1>
        <UserInfo userRepos={this.state.userRepos} homeClickHandler={this.homeClickHandler.bind(this)} />
      </div>)
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));