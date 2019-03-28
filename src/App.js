import React, { Component } from 'react';
import './App.css';

import VotesPage from './votes';
import DemographicQuestions from './questions';

class App extends Component {
  state = {
    demographicParams: null,
  };

  onDemographicQuestionsAnswered = (answers) => {
    this.setState({ demographicParams: answers });
  };

  render() {
    const { demographicParams } = this.state;
    return (
      <div className="App">
        {demographicParams ?
          <VotesPage demographicParams={demographicParams} /> :
          <DemographicQuestions onAnswered={this.onDemographicQuestionsAnswered} />
        }
      </div>
    );
  }
}

export default App;
