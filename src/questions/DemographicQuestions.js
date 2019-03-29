import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Question from './Question';
import { getQuestions } from '../services/demographic-data';

export default class DemographicQuestions extends Component {
  state = {
    questions: null,
    questionNumber: null,
    answers: null,
  };

  componentDidMount() {
    const questions = getQuestions();

    if (questions.length === 0) {
      this.props.onAnswered({});
      return;
    }

    this.setState({
      questions,
      questionNumber: 0,
      answers: {},
    });
  }

  registerUserAnswer = (answer) => {
    const { questions, questionNumber, answers } = this.state;
    const currentQuestion = questions[questionNumber];

    if (!currentQuestion.possibleAnswers.includes(answer)) {
      // Happens sometimes on quick consecutive clicks. Just ignore.
      return;
    }

    this.setState({
      questionNumber: questionNumber + 1,
      answers: { ...answers, [currentQuestion.question]: answer },
    }, () => {
      if (this.state.questionNumber === questions.length) {
        this.props.onAnswered(this.state.answers);
      }
    });
  };

  render() {
    const { questions, questionNumber } = this.state;

    if (!questions) {
      return null;
    }

    return (
      <Carousel
        activeIndex={questionNumber}
        onSelect={() => {}}
        indicators={false}
        controls={false}
        className="mt-4 p-3 justify-content-center align-items-center"
      >
        {questions.map(({ question, possibleAnswers }) => (
          <Carousel.Item key={question}>
            <Question
              question={question}
              possibleAnswers={possibleAnswers}
              onAnswered={this.registerUserAnswer}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    );
  }
}
