import React, { Component } from 'react';
import PartySelector from './PartySelector';
import VoteSpread from './VoteSpread';
import {
  getPartyNames,
  getMandatesDistributionByPolls,
  getDistributionConsideringUserVote,
  getWingSizes,
} from '../services/political-data';
import { getPeopleInDemographicGroup } from '../services/demographic-data';

export default class VotesPage extends Component {
  state = {
    selectedParty: null,
    mandates: getMandatesDistributionByPolls(),
    wingSizes: getWingSizes(getMandatesDistributionByPolls()),
    partyNames: getPartyNames(),
    peopleInDemographicGroup: getPeopleInDemographicGroup(this.props.demographicParams),
  };

  changeUserVote = (selectedParty) => {
    const newMandateDistribution = getDistributionConsideringUserVote(
      selectedParty,
      this.props.demographicParams,
    );

    this.setState({
      selectedParty,
      mandates: newMandateDistribution,
      wingSizes: getWingSizes(newMandateDistribution),
    });
  };

  render() {
    return (
      <div>
        <PartySelector parties={this.state.partyNames} onPartySelected={this.changeUserVote} />
        <VoteSpread
          selectedParty={this.state.selectedParty}
          mandates={this.state.mandates}
          wingSizes={this.state.wingSizes}
          peopleInDemographicGroup={this.state.peopleInDemographicGroup}
        />
      </div>
    );
  }
}
