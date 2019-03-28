import React, { Component } from 'react';
import VoteSelector from './VoteSelector';
import VoteSpread from './VoteSpread';
import DemographicParams from './DemographicParams';
import {
  getPartyNames,
  getMandatesDistributionByPolls,
  getDistributionConsideringUserVote,
  getWingSizes,
} from '../services/political-data';

export default class VotesPage extends Component {
  state = {
    mandates: null,
    wingSizes: null,
  };
  partyNames = getPartyNames();
  mandatesBasedOnPolls = getMandatesDistributionByPolls();

  componentDidMount() {
    this.setState({
      mandates: this.mandatesBasedOnPolls,
      wingSizes: getWingSizes(this.mandatesBasedOnPolls),
    })
  }

  changeUserVote = (selectedParty) => {
    const newMandateDistribution = getDistributionConsideringUserVote(selectedParty);
    this.setState({
      mandates: newMandateDistribution,
      wingSizes: getWingSizes(newMandateDistribution),
    });
  };

  render() {
    return (
      <div>
        <VoteSelector parties={this.partyNames} onPartySelected={this.changeUserVote} />
        <VoteSpread mandates={this.state.mandates} wingSizes={this.state.wingSizes} />
        <DemographicParams />
      </div>
    );
  }
}
