import React, { Component } from 'react';
import { Bar } from 'react-chartjs';
import { getVotesDistribution } from '../utils/load-data';

// TODO: This will need to be moved to state, so the user's actions can affect it.
const votes = getVotesDistribution();

export default class VoteSpread extends Component {
  render() {
    const data = {
      labels: votes.map(({ party }) => party),
      datasets: [{
        label: 'מספר קולות',
        data: votes.map(({ mandates }) => mandates),
      }],
    };

    return (
      <div className="m-4 h-50">
        <h4>
        התפלגות הקולות
        </h4>
        <Bar data={data} options={{ responsive: true }} />
      </div>
    );
  }
}
