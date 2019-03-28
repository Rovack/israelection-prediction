import React, { Component } from 'react';
import './App.css';

import VotesPage from './votes/VotesPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <VotesPage />
      </div>
    );
  }
}

export default App;
