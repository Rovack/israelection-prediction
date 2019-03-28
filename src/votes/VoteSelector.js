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

export default class VoteSelector extends Component {
  state = {
    selectedParty: null,
  };

  onPartySelected = (partyName) => {
    this.setState({ selectedParty: partyName }, () =>
      this.props.onPartySelected(partyName));
  };

  render() {
    return (
      <div className="p-4">
        <Dropdown>
          <Dropdown.Toggle size="large">
            בחירת מפלגה
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {this.props.parties.map((name) => (
              <PartyItem key={name} name={name} onSelect={this.onPartySelected} />
            ))}
          </Dropdown.Menu>
        </Dropdown>
        {this.state.selectedParty && (
          <div className="mt-2">
            <span>אתה מצביע ל:</span>
            <span className="font-weight-bold mx-1">{this.state.selectedParty}</span>
          </div>
        )}
      </div>
    );
  }
}
