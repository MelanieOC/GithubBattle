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
class Populares extends Component {
  constructor (props) {
    super (props);
    this.state = {
      repos : null
    };
  }
  componentDidMount(){
    const lang = 'JavaScript';
    fetchPopularRepos(lang).then((repos) => {
      //console.log("repos:", repos);
      this.setState(function () {
        return {
          repos: repos
        }
      });
    });
     
  }
}
class App extends Component {
  
  render() {
    //console.log(this.state.repos);
    let mylist = null;
    if (this.state.repos != null )
      mylist = this.state.repos.map ( (repo, index) => {
        return <li key = {index} >  {repo.name} </li>
      } );

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {
          mylist && <ul>{mylist} </ul>
         }
      </div>
    );
  }
}
/*<div>
          {
            this.state.repos.map(repo=>{
              return <img src={repo.owner.avatar_url} alt={repo.name}/>
            })
          }
        </div>*/
export default App;
