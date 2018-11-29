import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.githubAuth = this.githubAuth.bind(this);
  }

  componentDidMount() {
  }
  githubAuth() {
    fetch('http://localhost:3000/auth/github', {
      mode: 'no-cors'
    })
      .then(res => {console.log(res)})
      // .then(data => console.log(data))
      // .catch(console.error);
  }
  
  render() {
    return (
      <div>
        <h1>Hello, World!</h1>
        <a href='/auth/github'>Sign in with GitHub</a>
        <input type="submit" value="Sign in with GitHub" onClick={this.githubAuth} />
      </div>
    );
  };
};

export default App;
