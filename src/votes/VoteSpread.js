import React, { Component } from 'react';
import { Bar, Pie } from 'react-chartjs';

export default class VoteSpread extends Component {
  render() {
    const { mandates, wingSizes } = this.props;

    if (!mandates) {
      // TODO: Show loading indicator.
      return null;
    }

    // Shouldn't rely on Object.keys and Object.values having consistent order.
    const parties = Object.keys(mandates);
    const mandatesInSameOrder = parties.map(party => Math.round(mandates[party]));

    const mandatesData = {
      labels: parties,
      datasets: [{
        label: 'מנדטים',
        data: mandatesInSameOrder,
      }],
    };

    const wingsData = [
      { value: Math.round(wingSizes.right), label: 'ימין' },
      { value: Math.round(wingSizes.left), label: 'שמאל' },
    ];

    return (
      <div className="m-4">
        <div className="mb-3">
          <h5>
          התפלגות המנדטים
          </h5>
          <Bar data={mandatesData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        <div>
          <h5>
          חלוקה לגושים
          </h5>
          <Pie data={wingsData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
    );
  }
}
