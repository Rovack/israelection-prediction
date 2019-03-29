import React, { Component } from 'react';
import { Bar, Pie } from 'react-chartjs';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default class VoteSpread extends Component {
  render() {
    const { mandates, wingSizes, selectedParty } = this.props;

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
        {selectedParty && (
          <OverlayTrigger overlay={
            <Tooltip>
              לפי התשובות שלך, יש {this.props.peopleInDemographicGroup} אנשים שעשויים להצביע כמוך
            </Tooltip>
          }>
            <h4 className="my-3">
              אם אנשים כמוני היו מצביעים למפלגת
              <span className="font-weight-bold mx-2">{selectedParty}</span>
              אז הכנסת הייתה נראית כך:
            </h4>
          </OverlayTrigger>
        )}
        <div>
          <h5>
          התפלגות המנדטים
          </h5>
          <Bar data={mandatesData} options={{ responsive: true }} />
        </div>
        <div>
          <h5>
          חלוקה לגושים
          </h5>
          <Pie data={wingsData} options={{ responsive: true }} />
        </div>
      </div>
    );
  }
}
