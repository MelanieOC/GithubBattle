import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Populares from './PopularList';
import Battle from './Battle';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import {
  BrowserRouter,
  Route,
  Switch,
  NavLink,
  Redirect
} from 'react-router-dom';

/*battle([
  "melanieoc", // https://github.com/ivanseidel
  "sharmyn28"]  // https://github.com/honcheng
).then((results) => {
  if (results === null) {
    console.log('Looks like there was an error!\nCheck that both users exist on github.');
  }
  console.log("battle result:", results[0], results[1]);
});*/

const NavBar = () => {
  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">GitHub-Battle</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={2}><NavLink className='navlink' to="/home">Home</NavLink></NavItem>
          <NavItem eventKey={2}><NavLink className='navlink' to="/battle">Battle</NavLink></NavItem>
          <NavItem eventKey={3}><NavLink className='navlink' to="/popular">Popular</NavLink></NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
const Home = () => {
  return (
    <div className='home-container'>
      <h1> Github Battle: Battle your friends... and stuff.</h1>
      <NavLink to="/battle" className='button'>Battle</NavLink>
    </div>
  );
}

const Popular = () => {
  return (
    <div>
      <ul className='languages'>
        <li>  <NavLink exact to="/popular/all"> All </NavLink> </li>
        <li>  <NavLink to="/popular/javascript"> JavaScript </NavLink> </li>
        <li>  <NavLink to="/popular/ruby"> Ruby </NavLink> </li>
        <li>  <NavLink to="/popular/java"> Java </NavLink> </li>
        <li>  <NavLink to="/popular/css"> CSS </NavLink> </li>
        <li>  <NavLink to="/popular/python"> Python </NavLink> </li>
      </ul>
      <Route exact path="/popular"
        render={() => <Redirect to="/popular/all" />} />
      <Route path="/popular/all" render={() => <Populares lang={'All'} />} />
      <Route path="/popular/javascript" render={() => <Populares lang={'Javascript'} />} />
      <Route path="/popular/ruby" render={() => <Populares lang={'Ruby'} />} />
      <Route path="/popular/java" render={() => <Populares lang={'Java'} />} />
      <Route path="/popular/css" render={() => <Populares lang={'CSS'} />} />
      <Route path="/popular/python" render={() => <Populares lang={'Python'} />} />
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" render={() => <Redirect to={'/home'} />} />
            <Route path="/home" render={() => <Home />} />
            <Route path="/battle" render={() => <Battle />} />
            <Route path="/popular" render={() => <Popular />} />
            <Route render={() => <Redirect to={'/home'} />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
