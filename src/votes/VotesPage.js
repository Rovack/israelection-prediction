import React, { Component } from 'react';
import VoteSelector from './VoteSelector';
import VoteSpread from './VoteSpread';
import DemographicParams from './DemographicParams';
import {
  getPartyNames,
  getVotesDistribution,
  getVotersPerMandate,
} from '../utils/load-data';

// TODO: Base this on demographic data.
const userVotes = 200000;

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
    const mandatesControlledByUser = userVotes / getVotersPerMandate();

    const numberOfParties = this.partyNames.length;
    const mandatesTakenByUserFromEachParty = mandatesControlledByUser / numberOfParties;

    const updatedVotes = Object.keys(this.votesBasedOnPoll).reduce((updated, partyName) => ({
      ...updated,
      [partyName]: partyName === selectedParty ?
        (this.votesBasedOnPoll[partyName] + mandatesControlledByUser) :
        (this.votesBasedOnPoll[partyName] - mandatesTakenByUserFromEachParty)
    }), {});

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
