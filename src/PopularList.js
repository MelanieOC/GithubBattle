import React, { Component } from 'react';
import { fetchPopularRepos } from './GitHubApi';
import { Image } from 'react-bootstrap';

const RespositorioView = ({ repo, rank }) => {
    return (
        <li key={rank} className='popular-item'>
            <div className='popular-rank'>#{rank}</div>
            <ul className='space-list-items'>
                <li key={rank+1}><Image className='avatar' src={repo.owner.avatar_url} alt={repo.name} circle /></li>
                <li key={rank+1}><a href={repo.html_url}>{repo.name}</a></li>
                <li key={rank+1}>@{repo.owner.login}</li>
                <li key={rank+1}>{repo.stargazers_count} stars</li>
            </ul>
        </li>
    );
}

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
                return <RespositorioView repo={repo} rank={index+1} />
            });
        return (
            <div>
                {
                    mylist ? <ul className='popular-list'>{mylist}</ul>:'Loading...'
                }
            </div>
        );
    }
}


export default Populares;