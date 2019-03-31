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
  renderMandatesChart() {
    const { mandates } = this.props;

    const partyNamesRightToLeft = Object.keys(mandates).reverse();
    const formattedPartyNames = partyNamesRightToLeft.map(formatPartyName);
    // Shouldn't rely on Object.keys and Object.values having consistent order.
    const mandatesInSameOrder = partyNamesRightToLeft.map(party => Math.round(mandates[party]));

    const mandatesData = {
      labels: formattedPartyNames,
      datasets: [{
        label: 'מנדטים',
        data: mandatesInSameOrder,
        fillColor: 'rgb(0, 110, 227)',
      }],
    };

    return (
      <div className="mb-1">
        <div>
          חלוקת המנדטים
        </div>
        <Bar
          data={mandatesData}
          options={{ responsive: true, maintainAspectRatio: false }}
          style={{ minHeight: '200px', maxHeight: '200px' }}
        />
      </div>
    );
  }

  renderPms() {
    const { wingSizes } = this.props;
    const { left, right } = wingSizes;

    return (
      <div>
        <h4>
          ראש הממשלה {right > left ? 'בנימין נתניהו' : 'בני גנץ'}
        </h4>
        <p>
          עם תמיכה של {Math.round(Math.max(right, left))} ח"כים
        </p>
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
    );
  }

  render() {
    const { mandates, selectedParty } = this.props;

    if (!mandates) {
      // TODO: Show loading indicator.
      return null;
    }

    return (
      <div className="m-3">
        {this.renderMandatesChart()}
        {selectedParty && this.renderPms()}
      </div>
    );
  }
}
