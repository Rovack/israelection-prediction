import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

class PartyItem extends Component {
  onSelect = () => this.props.onSelect(this.props.name);

  render() {
    return (
      <Dropdown.Item onSelect={this.onSelect}>
        {this.props.name}
      </Dropdown.Item>
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
      <Dropdown className="p-3">
        <Dropdown.Toggle size="large">
          בחירת מפלגה
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {this.props.parties.map((name) => (
            <PartyItem key={name} name={name} onSelect={this.onPartySelected} />
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
