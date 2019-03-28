import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { getPartyNames } from '../utils/load-data';

const partyNames = getPartyNames();

export default class VoteSelector extends Component {
  render() {
    return (
      <Dropdown className="p-4">
        <Dropdown.Toggle size="large">
          בחירת מפלגה
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {partyNames.map((name) => (
            <Dropdown.Item>{name}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
