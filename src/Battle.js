import React, { Component } from 'react';
import { battle, getUserData } from './GitHubApi';
import { Grid, Row, Col, FormControl, ControlLabel } from 'react-bootstrap';
/*import {
    BrowserRouter,
    Route,
    Switch,
    NavLink,
    Redirect
} from 'react-router-dom';*/


class Battle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }
    componentDidMount() {
        getUserData("melanieoc").then((result) => {
            console.log(result)
            this.setState(function () {
                return {
                    user: result
                }
            });
        });
    }
    render() {
        let usuario = null;
        /*if (this.state.user != null){
            usuario = <img src={this.state.user.avatar_url} alt={this.state.user.login} />;
        }*/
           
        return (
            <div>
                <h1>hola</h1>
                {
                    usuario&&
                    <div>{usuario}</div>
                }
            </div>
        );
    }
}

export default Battle;