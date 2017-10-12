import React, { Component } from 'react';
import { battle, getUserData } from './GitHubApi';
import { Grid, Row, Col, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';
/*import {
    BrowserRouter,
    Route,
    Switch,
    NavLink,
    Redirect
} from 'react-router-dom';*/


class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }
    componentDidMount() {
        getUserData(this.props.username).then((result) => {
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
        if (this.state.user != null) {
            usuario = <img src={this.state.user.profile.avatar_url} alt={this.state.user.profile.login} />;
        }

        return (
            <div>
                <h1>hola</h1>
                {
                    usuario &&
                    <div>{usuario}</div>
                }
            </div>
        );
    }
}
class Battle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }
    /*componentDidMount() {
       
    }*/
    render() {
        return (
            <Grid>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <ControlLabel>Player One</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter text"
                            />
                            <FormControl.Feedback />
                            <button className='button'>Submit</button>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                    <FormGroup>
                            <ControlLabel>Player Two</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter text"
                            />
                            <button className='button'>Submit</button>
                        </FormGroup>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Battle;