import React, { Component } from 'react';
import './App.css';

import IntroPage from './intro';
import DemographicQuestions from './questions';
import VotesPage from './votes';

class App extends Component {
  state = {
    hasEntered: false,
    demographicParams: null,
  };

  onDemographicQuestionsAnswered = (answers) => {
    this.setState({ demographicParams: answers });
  };

  onIntroDone = () => {
    this.setState({ hasEntered: true });
  }

  renderPage() {
    const { demographicParams, hasEntered } = this.state;

    if (!hasEntered) {
      return <IntroPage onDone={this.onIntroDone} />;
    }

    if (!demographicParams) {
      return <DemographicQuestions onAnswered={this.onDemographicQuestionsAnswered} />;
    }

    return <VotesPage demographicParams={demographicParams} />;
  }

  render() {
    return (
      <div className="App">
        {this.renderPage()}
      </div>
    );
  }
}

export default App;
