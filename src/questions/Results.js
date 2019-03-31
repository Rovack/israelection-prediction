import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { getPeopleInDemographicGroup } from '../services/demographic-data';

const options = {
  skepticism: 'skepticism',
  arrogance: 'arrogance',
};

export default class Results extends Component {
  state = {
    chosenOption: null,
  };

  expressSkepticism = () => {
    this.setState({ chosenOption: options.skepticism });
  };

  boast = () => {
    this.setState({ chosenOption: options.arrogance });
  };

  renderFooter() {
    const { onSubmit } = this.props;
    const { chosenOption } = this.state;

    if (!chosenOption) {
      return (
        <div className="d-flex flex-column align-items-center">
          <Button
            block
            variant="primary"
            size="large"
            className="w-75"
            onClick={this.expressSkepticism}
          >
            זה מלא! איך זה יכול להיות??
          </Button>
          <Button
            block
            variant="primary"
            size="large"
            className="w-75"
            onClick={this.boast}
          >
            נראה לי שהקול שלי שווה אפילו יותר
          </Button>
        </div>
      );
    }

    return (
      <div>
        <h4 className="my-3">
          {
            chosenOption === options.skepticism ?
              'זה בגלל שיש עוד המון אנשים עם דפוס הצבעה כמו שלך שיקבלו את אותה ההחלטה כמוך' :
              'זה בהחלט יכול להיות'
          }
        </h4>
        <p className="mt-5">
        לחיצה כאן תגלה איך הקול שלך יכול להשפיע על תוצאות הבחירות
        </p>
        <Button variant="primary" size="large" onClick={onSubmit}>
          המשך
        </Button>
      </div>
    );
  }

  render() {
    const { answers } = this.props;

    return (
      <div className="d-flex flex-column justify-content-around my-5">
        <h3>
          מדהים!
          <br />
          הקול שלך שווה {getPeopleInDemographicGroup(answers)} קולות!
        </h3>
        {this.renderFooter()}
      </div>
    );
  }
}
