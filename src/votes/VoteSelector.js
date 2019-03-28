import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

export default class VoteSelector extends Component {
  render() {
    const { parties, onPartySelected } = this.props;

    return (
      <Dropdown className="p-4">
        <Dropdown.Toggle size="large">
          בחירת מפלגה
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {parties.map((name) => (
            <Dropdown.Item
              key={name}
              onSelect={() => onPartySelected(name)}
            >
              {name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
