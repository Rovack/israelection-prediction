import React, { Component } from 'react';
import { Bar } from 'react-chartjs';
import Image from 'react-bootstrap/Image';

function formatPartyName(name) {
  if (name.length <= 15) {
    return name;
  }
  const [firstWord, ...nextWords] = name.split(' ');
  const firstWordAbbrev = `${firstWord[0]}.`;
  return [firstWordAbbrev, ...nextWords].join(' ');
};

function getVoteBasedPictureProps(mandates, otherWingMandates) {
  const baseSizePercent = 70;
  const mandatesPercent = mandates / (mandates + otherWingMandates);

  const props = {
    width: `${baseSizePercent * mandatesPercent}%`,
    height: `${baseSizePercent * mandatesPercent}%`,
  };

  if (mandates < otherWingMandates) {
    props.style = { opacity: 0.4 };
  }

  return props;
}

export default class VoteSpread extends Component {
  render() {
    const { mandates, wingSizes } = this.props;
    const { left, right } = wingSizes;

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

    return (
      <div className="m-3">
        <div className="mb-3">
          <div>
            חלוקת המנדטים
          </div>
          <Bar data={mandatesData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        {this.props.selectedParty && (
          <div>
            <h4>
              ראש הממשלה {right > left ? 'בנימין נתניהו' : 'בני גנץ'}
            </h4>
            <Image
              roundedCircle
              src="/netanyahu.jpg"
              className="mx-2"
              {...getVoteBasedPictureProps(right, left)} />
            <Image
              roundedCircle
              src="/gantz.jpeg"
              className="mx-2"
              {...getVoteBasedPictureProps(left, right)} />
          </div>
        )}
      </div>
    );
  }
}
