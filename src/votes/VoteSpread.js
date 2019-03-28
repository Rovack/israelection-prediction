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
    const mandatesInSameOrder = parties.map(party => mandates[party]);

    const mandatesData = {
      labels: parties,
      datasets: [{
        label: 'מנדטים',
        data: mandatesInSameOrder,
      }],
    };

    const wingsData = [
      { value: wingSizes.right, label: 'ימין' },
      { value: wingSizes.left, label: 'שמאל' },
    ];

    return (
      <div className="m-4">
        <div>
          <h4>
          התפלגות המנדטים
          </h4>
          <Bar data={mandatesData} options={{ responsive: true }} />
        </div>
        <div>
          <h4>
          חלוקה לגושים
          </h4>
          <Pie data={wingsData} options={{ responsive: true }} />
        </div>
      </div>
    );
  }
}
