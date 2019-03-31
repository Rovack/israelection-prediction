import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class PartyItem extends Component {
  partyClicked = () => this.props.onSelect(this.props.name);

  render() {
    return (
      <Button
        active={this.props.active}
        size="sm"
        className="m-1"
        onClick={this.partyClicked}
      >
        {this.props.name}
      </Button>
    );
  }
}

export default class PartySelector extends Component {
  state = {
    selectedParty: null,
  };

  onPartySelected = (partyName) => {
    this.setState({ selectedParty: partyName }, () =>
      this.props.onPartySelected(partyName));
  };

  render() {
    return (
      <div className="p-3">
        <span className="ml-1">
          הבחירה שלי:
        </span>
        {this.props.parties.map((name) => (
          <PartyItem
            key={name}
            name={name}
            active={name === this.props.selectedParty}
            onSelect={this.onPartySelected}
          />
        ))}
      </div>
    );
  }
}
