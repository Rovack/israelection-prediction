import React, { Component } from 'react';

export default class DemographicQuestions extends Component {
  componentDidMount() {
    this.props.onAnswered({
      gender: 'זכר',
      age: '14-28',
    });
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}
