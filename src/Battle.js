import React, { Component } from 'react';
import { battle, getUserData } from './GitHubApi';
import { Grid, Row, Col, FormControl, ControlLabel, FormGroup, Image } from 'react-bootstrap';
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
            usuario = <Image className='avatar' src={this.state.user.profile.avatar_url} alt={this.state.user.profile.login} circle />;
        }
        return (
            <div>
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
        this.user1 = null;
        this.user2 = null;
        this.state = {
            check1: false,
            check2: false,
            isbattle: false,
            battle: null
        };
    }

    render() {
        const saveData = () => {
            if (this.user1) {
                this.setState({
                    check1: true
                })
            }
            if (this.user2) {
                this.setState({
                    check2: true
                })
            }
            console.log(this.user1);
            console.log(this.user2);
        }
        const probando = () => {
            this.setState({
                isbattle: true
            })
            battle([
                this.user1, // https://github.com/ivanseidel
                this.user2]  // https://github.com/honcheng
            ).then((results) => {
                if (results === null) {
                    console.log('Looks like there was an error!\nCheck that both users exist on github.');
                }
                console.log("battle result:", results[0], results[1]);
                this.setState(function () {
                    return {
                        battle: results
                    }
                });
            });
        }
        return (
            <Grid>
                {!this.state.isbattle &&
                    <Row>
                        <Col md={6} sm={6}>
                            {!this.state.check1 &&
                                <FormGroup>
                                    <ControlLabel>Player One</ControlLabel>
                                    <FormControl
                                        type="text"
                                        placeholder="Github username"
                                        onChange={(e) => { this.user1 = e.target.value }}
                                    />
                                    <button className='button' onClick={saveData}>Submit</button>
                                </FormGroup>
                            }
                            {this.state.check1 &&
                                <div>
                                    <User username={this.user1} />
                                    <div>@{this.user1}</div>
                                </div>
                            }
                        </Col>
                        <Col md={6} sm={6}>
                            {!this.state.check2 &&
                                <FormGroup>
                                    <ControlLabel>Player Two</ControlLabel>
                                    <FormControl
                                        type="text"
                                        placeholder="Github username"
                                        onChange={(e) => { this.user2 = e.target.value }}
                                    />
                                    <button className='button' onClick={saveData}>Submit</button>
                                </FormGroup>
                            }
                            {this.state.check2 &&
                                <div>
                                    <User username={this.user2} />
                                    <div>@{this.user2}</div>
                                </div>
                            }

                        </Col>
                        {this.state.check1 && this.state.check2 &&
                            <Col md={12} sm={12}>
                                <button className='button' onClick={probando} >Battle</button>
                            </Col>
                        }
                    </Row>
                }
                {this.state.isbattle &&
                    <div>
                        {this.state.battle &&
                            <Row>
                                <Col md={6} sm={6}>
                                    <p>Winner</p>
                                    <p>Score: {this.state.battle[0].score}</p>
                                    <Image className='avatar' src={this.state.battle[0].profile.avatar_url} circle />
                                    <p>@{this.state.battle[0].profile.login}</p>
                                    <p>Followers: {this.state.battle[0].profile.followers}</p>
                                    <p>Following: {this.state.battle[0].profile.following}</p>
                                    <p>Public repos: {this.state.battle[0].profile.public_repos}</p>

                                </Col>
                                <Col md={6} sm={6}>
                                    <p>Loser</p>
                                    <p>Score: {this.state.battle[1].score}</p>
                                    <Image className='avatar' src={this.state.battle[1].profile.avatar_url} circle />
                                    <p>@{this.state.battle[1].profile.login}</p>
                                    <p>Followers: {this.state.battle[1].profile.followers}</p>
                                    <p>Following: {this.state.battle[1].profile.following}</p>
                                    <p>Public repos: {this.state.battle[1].profile.public_repos}</p>
                                </Col>
                            </Row>
                        }
                        {!this.state.battle &&
                            <div>Loading...</div>
                        }
                    </div>

                }
            </Grid>
        );
    }
}

export default Battle;