import { useDispatch } from "react-redux";
import {
  answerQuestion,
  changeUserState,
  updateCustomization,
} from "../states/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ToggleButton, Button, Row, Col } from "react-bootstrap";
import keyboardPic from "../media/keyboard.png";
import typingPic from "../media/typing.gif";

import "./questions.css";
import { captureMessage } from "@sentry/react";

const selectCustomization = (state) => state.customization;
const selectUserState = (state) => state.userState;
const selectQuestionBank = (state) => state.questionBank;

const colors = ["black", "white"];
const switches = ["red", "brown", "blue"];
const layouts = ["win", "mac"];

const layoutsDesc = {
  win: "Windows",
  mac: "Mac",
};

const switchDesc = {
  red: "Soft and quiet",
  brown: "Tactile (midway)",
  blue: "Vibrant and clicky",
};

export function Preparation() {
  let dispatch = useDispatch();
  let userState = useSelector(selectUserState);
  return (
    <div>
      <br />
      <br />
      <h1 style={{ color: "orange" }}>Welcome!</h1>
      <br />
      <br />
      <h5>To pick the absolutely best keyboard for you,</h5>
      <h5>We need to ask a few questions.</h5>
      <br />
      <h5>Now, make yourself comfortable.</h5>
      <br />
      <h5>Ready?</h5>
      <br />
      <Button
        size="lg"
        id="ready"
        className="customization"
        variant="outline-success"
        active={userState}
        onClick={(e) => {
          dispatch(
            changeUserState({
              newState: "ready",
            })
          );
        }}
      >
        I'm ready!
      </Button>
      <br />
      <br />
    </div>
  );
}

export function CustomizeColor() {
  let customizationState = useSelector(selectCustomization);
  let currentColor = customizationState.color;
  let dispatch = useDispatch();
  let colorButtons = [];
  for (let colorNdx in colors) {
    let color = colors[colorNdx];
    let colorStr = color === "black" ? "🖤 Black" : "🤍 White";
    colorButtons.push(
      <Col key={color} xs={12} md={6} lg={3}>
        <ToggleButton
          id={color}
          className={"customization"}
          type="checkbox"
          size="lg"
          variant={`outline-warning`}
          active={currentColor === color}
          onClick={(e) => {
            captureMessage("User chose color: " + color);
            dispatch(
              updateCustomization({
                color: color,
              })
            );
          }}
        >
          {colorStr}
          <div>{/* <img src={logo} alt={color} width="50%" /> */}</div>
        </ToggleButton>
      </Col>
    );
  }
  return (
    <div>
      <div>
        <h5>Color Preference?</h5>
        <Row className="justify-content-md-center">{colorButtons}</Row>
      </div>
      <br />
    </div>
  );
}

export function CustomizeLayout() {
  let customizationState = useSelector(selectCustomization);
  let currentLayout = customizationState.layout;
  let dispatch = useDispatch();
  let layoutButtons = [];
  for (let layoutNdx in layouts) {
    let layout = layouts[layoutNdx];
    layoutButtons.push(
      <Col key={layout} xs={12} md={6} lg={3}>
        <ToggleButton
          id={layout}
          className={"customization"}
          type="checkbox"
          size="lg"
          variant="outline-warning"
          active={currentLayout === layout}
          onClick={(e) => {
            captureMessage("User chose layout: " + layout);
            dispatch(
              updateCustomization({
                layout: layout,
              })
            );
          }}
        >
          {layoutsDesc[layout]}
          <div>{/* <img src={logo} alt={layout} width="50%" /> */}</div>
        </ToggleButton>
      </Col>
    );
  }
  return (
    <div>
      <div>
        <h5>Team Windows or Team Mac?</h5>
        <Row className="justify-content-md-center">{layoutButtons}</Row>
      </div>
      <br />
    </div>
  );
}

export function CustomizeSwitch() {
  let customizationState = useSelector(selectCustomization);
  let currentSwitch = customizationState.switchType;
  let dispatch = useDispatch();
  let switchButtons = [];
  for (let switchNdx in switches) {
    let switchType = switches[switchNdx];
    switchButtons.push(
      <Col key={switchType} xs={12} md={6} lg={4}>
        <ToggleButton
          id={switchType}
          className={"customization " + switchType}
          type="checkbox"
          size="lg"
          variant="outline-warning"
          active={currentSwitch === switchType}
          onClick={(e) => {
            captureMessage("User chose switch: " + switchType);
            dispatch(
              updateCustomization({
                switchType: switchType,
              })
            );
          }}
        >
          {switchDesc[switchType]}
          <div>{/* <img src={logo} alt={switchType} width="50%" /> */}</div>
        </ToggleButton>
      </Col>
    );
  }
  return (
    <div>
      <div>
        <h5>How do you like your keyboard to feel?</h5>
        <Row className="justify-content-md-center">{switchButtons}</Row>
      </div>
      <br />
    </div>
  );
}

export function CustomizeModel() {
  let questionnaire = [];

  let [score, setScore] = useState(0);
  let dispatch = useDispatch();
  let customizationState = useSelector(selectCustomization);
  let questions = useSelector(selectQuestionBank);
  let questionsAndAnswers = customizationState.questions;

  for (let question in questions) {
    let answerButtons = [];
    let answers = questions[question];
    for (let answer in answers) {
      let target = answers[answer];
      answerButtons.push(
        <Col key={answer} xs={12} md={6} lg={3}>
          <Button
            className="customization"
            variant="outline-warning"
            active={questionsAndAnswers[question] === answer}
            onClick={(e) => {
              captureMessage("User answer to model-related question '" + question + "' is '" + answer + "'");
              dispatch(
                answerQuestion({
                  question: question,
                  answer: answer,
                })
              );
              if (questionsAndAnswers[question] !== answer) {
                setScore(score + target);
              }
            }}
          >
            {answer}
          </Button>
        </Col>
      );
    }
    questionnaire.push(
      <div key={question} className={"question"}>
        <div>
          <h5>{question}</h5>
          <Row className="justify-content-md-center">{answerButtons}</Row>
        </div>
        <br />
      </div>
    );
  }
  return (
    <div>
      <h4>First, imaging yourself typing...</h4>
      <img src={typingPic} alt="typing" width={"20%"} />
      <br />
      <br />
      <h4> on this keyboard.</h4>
      <img src={keyboardPic} alt="kb" width={"50%"} />
      <br />
      <br />
      <h4>Do you feel your index fingers on those keys?</h4>
      <br />
      <br />
      <h4>Good.</h4>
      <br />
      <br />
      <h4>⌨️ Now, imagine yourself typing these letters... ⌨️</h4>
      <br />
      <br />
      {questionnaire}
    </div>
  );
}
