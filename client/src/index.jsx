import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
      // repos: [{id: 0, name: 'a'}, {id: 1, name: 'b'}]
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
      console.log(result);
      this.setState({
        repos: result
      });
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
      console.log('Trying to fetch new data.');
      return fetch('http://localhost:1128/repos', {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      });
    })
    .then( (result) => {
      return result.json();
    })
    .then( (result) => {
      this.setState({
        repos: result
      });
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} />
      <Search onSearch={this.search.bind(this)} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));