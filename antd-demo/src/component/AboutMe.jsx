import React from 'react';
import $ from 'jquery';

const AboutMe = React.createClass({
   getInitialState() {
    return { 
        loading: true, 
        error: null, 
        data: null
    };
  },
  render() {
  	if (this.state.loading) {
      return (
        <div>
            <h1>About Me</h1>
        </div>
      );
    }else if (this.state.error !== null) {
      return <span>Error: {this.state.error.message}</span>;
    }else {
	  	var repos = this.state.data;
	  	var repoList = repos.map(function (repo,i) {
	        return (
	          <li key={i}>
	            <a href={repo.html_url}>{repo.name}</a> ({repo.stargazers_count} stars) <br/> {repo.description}
	          </li>
	        );
	    });
	    return (
	      <div>
	      	<h1>About Me</h1>
	      	<ol>{repoList}</ol>
	      </div>
	    );
	}
  },
  componentDidMount(){
  	const self = this;
  	if(sessionStorage.repositories){
  		self.setState({loading: false, data: JSON.parse(sessionStorage.repositories)});
  	} else{
	  	$.getJSON("https://api.github.com/search/repositories?q=javascript&sort=stars", function(result) {
	        if (result && result.items) {
	            sessionStorage.repositories = JSON.stringify(result.items);
	            self.setState({loading: false, data: result.items});
	        }else{
	            self.setState({loading: false, error: error});
	        }
	    });
	}
  }
});

export default AboutMe;
