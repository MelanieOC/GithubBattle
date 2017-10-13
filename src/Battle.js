import React, { Component } from 'react';
import { battle, getUserData } from './GitHubApi';
import { Grid, Row, Col, FormControl, ControlLabel, FormGroup, Image } from 'react-bootstrap';

const showRepo = ({ rank, state }) => {
    return (
        <div>
            <h1 className='header'>{state}</h1>
            <div style={{ textAlign='center' }}>
                <h3>Score: {rank.score}</h3>
                <Image className='avatar' src={rank.profile.avatar_url} circle />
                <h2>@{rank.profile.login}</h2>
            </div>
            <ul className='space-list-items'>
                {state === 'winner' && <li>{this.state.battle[0].profile.name}</li>}
                <li>Followers: {rank.profile.followers}</li>
                <li>Following: {rank.profile.following}</li>
                <li>Public repos: {rank.profile.public_repos}</li>
            </ul>
        </div>
    );
}

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
        return (
            <div>
                {this.state.user && <Image className='avatar' src={this.state.user.profile.avatar_url} alt={this.state.user.profile.login} circle />}
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
                                <div style={{ width: '500px' }}>
                                    <FormGroup>
                                        <ControlLabel className='header'>Player One</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="Github username"
                                            onChange={(e) => { this.user1 = e.target.value }}
                                        />
                                        <button className='button' onClick={saveData}>Submit</button>
                                    </FormGroup>
                                </div>
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
                                    <ControlLabel className='header'>Player Two</ControlLabel>
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
                                    <showRepo rank={this.state.battle[0]} state={'winner'} />
                                </Col>
                                <Col md={6} sm={6}>
                                    <showRepo rank={this.state.battle[1]} state={'loser'} />
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