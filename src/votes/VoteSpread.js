import React, { Component } from 'react';
import { Bar } from 'react-chartjs';

export default class VoteSpread extends Component {
  render() {
    const { votes } = this.props;

    if (!votes) {
      // TODO: Show loading indicator.
      return null;
    }

    // Shouldn't rely on Object.keys and Object.values having consistent order.
    const parties = Object.keys(votes);
    const votesInSameOrder = parties.map(party => votes[party]);

    const data = {
      labels: parties,
      datasets: [{
        label: 'מספר קולות',
        data: votesInSameOrder,
      }],
    };

    return (
      <div className="m-4">
        <h4>
        התפלגות הקולות
        </h4>
        <Bar data={data} options={{ responsive: true }} />
      </div>
    );
  }
}
