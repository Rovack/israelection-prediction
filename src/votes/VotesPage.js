import React, { Component } from 'react';
import VoteSelector from './VoteSelector';
import VoteSpread from './VoteSpread';
import DemographicParams from './DemographicParams';

export default class VotesPage extends Component {
  render() {
    return (
      <div>
        <VoteSelector />
        <VoteSpread />
        <DemographicParams />
      </div>
    );
  }
}
