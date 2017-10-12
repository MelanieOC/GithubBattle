import React, { Component } from 'react';
import { battle, fetchPopularRepos } from './GitHubApi';

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
                return <li key={index} ><img src={repo.owner.avatar_url} alt={repo.name} /> </li>
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