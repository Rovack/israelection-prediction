import React, { Component } from 'react';
import Question from './Question';
import { getQuestions } from '../services/demographic-data';

export default class DemographicQuestions extends Component {
  state = {
    remainingQuestions: null,
    answers: null,
  };

  componentDidMount() {
    const questions = getQuestions();

    if (questions.length === 0) {
      this.props.onAnswered({});
      return;
    }

    this.setState({ answers: {}, remainingQuestions: questions });
  }

  registerUserAnswer = (answer) => {
    const [currentQuestion, ...nextQuestions] = this.state.remainingQuestions;

    this.setState({
      answers: { ...this.state.answers, [currentQuestion.question]: answer },
      remainingQuestions: nextQuestions,
    }, () => {
      if (this.state.remainingQuestions.length === 0) {
        this.props.onAnswered(this.state.answers);
      }
    });
  };

  render() {
    const currentQuestion = this.state.remainingQuestions && this.state.remainingQuestions[0];

    if (!currentQuestion) {
      return null;
    }

    return (
      <div className="mt-4 p-3 justify-content-center align-items-center">
        <Question
          question={currentQuestion.question}
          possibleAnswers={currentQuestion.possibleAnswers}
          onAnswered={this.registerUserAnswer}
        />
      </div>
    );
  }
}
