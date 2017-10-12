import React, { Component } from 'react';
import {fetchPopularRepos } from './GitHubApi';
import { Image } from 'react-bootstrap';

class Populares extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repos: null
        };
    }
    componentDidMount() {
        const lang = this.props.lang;
        fetchPopularRepos(lang).then((repos) => {
            console.log(repos)
            this.setState(function () {
                return {
                    repos: repos
                }
            });
        });
    }
    render() {
        let mylist = null;
        if (this.state.repos != null)
            mylist = this.state.repos.map((repo, index) => {
                return <li key={index} ><Image src={repo.owner.avatar_url} alt={repo.name} circle/> </li>
            });
        return (
            <div>
                {
                    mylist && <ul>{mylist}</ul>
                }
            </div>
        );
    }
}

export default Populares;