import React from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

const IntroPage = (props) => (
  <div className="m-5">
    <h4 className="my-3">
      רוצים לדעת איך זה יגמר?
      <br />
      ענו על השאלות הפשוטות הבאות, ותגלו!
    </h4>
    <Button variant="primary" size="large" onClick={props.onDone}>
      יאללה
    </Button>
    <p className="mt-5">
      (התשובות שאתם נותנים לא יישמרו או יישלחו לשום מקום. רק אתם רואים אותן, והם ישמשו אך ורק  כדי לחשב את התוצאות.)
    </p>
    <Image className="mt-3" src="/smiley.png" size="large" />
  </div>
);

export default IntroPage;
