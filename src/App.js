import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { battle, fetchPopularRepos } from './GitHubApi';


/*
battle([
  "MelanieOC", // https://github.com/ivanseidel
  "Sharmyn28"]  // https://github.com/honcheng
).then((results) => {
  if (results === null) {
    console.log('Looks like there was an error!\nCheck that both users exist on github.');
  }
  console.log("battle result:", results[0], results[1]);
});
*/

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Populares lang={'All'}/>
      </div>
    );
  }
}

export default App;
