import React, { Component } from 'react';
import { Bar, Pie } from 'react-chartjs';

const formatPartyName = name => {
  if (name.length <= 15) {
    return name;
  }
  const [firstWord, ...nextWords] = name.split(' ');
  const firstWordAbbrev = `${firstWord[0]}.`;
  return [firstWordAbbrev, ...nextWords].join(' ');
};

export default class VoteSpread extends Component {
  render() {
    const { mandates, wingSizes } = this.props;

    if (!mandates) {
      // TODO: Show loading indicator.
      return null;
    }

    // Shouldn't rely on Object.keys and Object.values having consistent order.
    const parties = Object.keys(mandates).map(formatPartyName);
    const mandatesInSameOrder = Object.keys(mandates).map(party => Math.round(mandates[party]));

    const mandatesData = {
      labels: parties,
      datasets: [{
        label: 'מנדטים',
        data: mandatesInSameOrder,
      }],
    };

    const wingsData = [
      { value: Math.round(wingSizes.right), label: 'נתניהו' },
      { value: Math.round(wingSizes.left), label: 'גנץ' },
    ];

    return (
      <div className="m-3">
        <div className="mb-3">
          <div>
            חלוקת המנדטים
          </div>
          <Bar data={mandatesData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        <div>
          <div>
            חלוקה לגושים
          </div>
          <Pie data={wingsData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
    );
  }
}
