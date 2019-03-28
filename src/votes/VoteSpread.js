import React, { Component } from 'react';
import { Bar } from 'react-chartjs';

// TODO: Import from /data.
const parties = [
  { name: 'כחול לבן' },
  { name: 'ליכוד' },
  { name: 'עבודה' },
];

export default class VoteSpread extends Component {
  render() {
    const data = {
      labels: parties.map(({ name }) => name),
      datasets: [{
        label: 'מספר קולות',
        data: [30, 30, 8],
      }],
    };

    return (
      <div className="m-4">
        <h4>
        התפלגות הקולות
        </h4>
        <Bar data={data} />
      </div>
    );
  }
}
