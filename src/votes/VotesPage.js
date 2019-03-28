import React, { Component } from 'react';
import VoteSelector from './VoteSelector';
import VoteSpread from './VoteSpread';
import {
  getPartyNames,
  getMandatesDistributionByPolls,
  getDistributionConsideringUserVote,
  getWingSizes,
} from '../services/political-data';

export default class VotesPage extends Component {
  state = {
    selectedParty: null,
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
      selectedParty,
      mandates: newMandateDistribution,
      wingSizes: getWingSizes(newMandateDistribution),
    });
  };

  render() {
    console.log(this.props.demographicParams);
    return (
      <div>
        <VoteSelector parties={this.partyNames} onPartySelected={this.changeUserVote} />
        <VoteSpread
          selectedParty={this.state.selectedParty}
          mandates={this.state.mandates}
          wingSizes={this.state.wingSizes}
        />
      </div>
    );
  }
}
