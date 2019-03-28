import React, { Component } from 'react';
import VoteSelector from './VoteSelector';
import VoteSpread from './VoteSpread';
import DemographicParams from './DemographicParams';
import {
  getPartyNames,
  getVotesDistribution,
} from '../utils/load-data';

// TODO: Base this on demographic data.
// TODO: Make this votes, and calculate mandates accordingly.
const userMandates = 10;

export default class VotesPage extends Component {
  state = {
    votes: null,
  };
  partyNames = getPartyNames();
  votesBasedOnPoll = getVotesDistribution();

  componentDidMount() {
    this.setState({ votes: this.votesBasedOnPoll })
  }

  changeUserVote = (selectedParty) => {
    const updatedVotes = {
      ...this.votesBasedOnPoll,
      [selectedParty]: this.votesBasedOnPoll[selectedParty] + userMandates,
    };

    this.setState({ votes: updatedVotes });
  };

  render() {
    return (
      <div>
        <VoteSelector parties={this.partyNames} onPartySelected={this.changeUserVote} />
        <VoteSpread votes={this.state.votes} />
        <DemographicParams />
      </div>
    );
  }
}
