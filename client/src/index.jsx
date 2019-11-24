import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import UserList from './components/UserList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      users: [],
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

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)} />
      <RepoList repos={this.state.repos} />
      <UserList users={this.state.users} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));