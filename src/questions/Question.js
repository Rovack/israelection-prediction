import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const Question = ({
  question,
  possibleAnswers,
  onAnswered,
}) => (
  <div>
    <h2>{question}</h2>

    <ListGroup className="w-100 align-items-center">
      {possibleAnswers.map((answer, i) => (
        <ListGroup.Item
          key={answer}
          action
          variant="primary"
          onClick={() => onAnswered(answer)}
          className="w-75"
        >
          {answer}
        </ListGroup.Item>
      ))}
    </ListGroup>
  </div>
);

export default Question;
