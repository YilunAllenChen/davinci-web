import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./result.css";

import blueSwitchPic from "../media/GIF_MXRGB_Blue.gif";
import redSwitchPic from "../media/GIF_MXRGB_Red.gif";
import brownSwitchPic from "../media/GIF_MXRGB_Brown.gif";
import { useEffect } from "react";
import { useState } from "react";
import { questionBank } from "../states/init/initCustomization";
import { captureMessage } from "@sentry/react";

const selectCustomization = (state) => state.customization;

export default function ResultCard() {
  const s3Base = `${process.env.PUBLIC_URL}/s3`;
  let customizationState = useSelector(selectCustomization);
  let [paymentLinks, setPaymentlinks] = useState();
  let [subscriptiontLinks, setSubsciptionlinks] = useState();
  let { color, switchType, layout, questions } = customizationState;

  useEffect(() => {
    const fetchPaymentLinks = () => {
      fetch(
        `${s3Base}/data/payment_links_PROD.json`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          setPaymentlinks(
            Object.keys(myJson).reduce((accumulator, key) => {
              accumulator[key.toLowerCase()] = myJson[key];
              return accumulator;
            }, {})
          );
        });

      // subscriptions
      fetch(
        `${s3Base}/data/subscription_links_PROD.json`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          setSubsciptionlinks(
            Object.keys(myJson).reduce((accumulator, key) => {
              accumulator[key.toLowerCase()] = myJson[key];
              return accumulator;
            }, {})
          );
        });
    };
    if (!paymentLinks && !subscriptiontLinks) {
      fetchPaymentLinks();
    }
  }, [paymentLinks, subscriptiontLinks, s3Base]);

  // determining the primary and secondary model
  let model = "standard";
  let secondModel = "mini";
  let score = 0;
  for (let q in questions) {
    let answer = questions[q];
    let point = questionBank[q][answer];
    score += point;
  }
  if (score >= 2) {
    model = "mini";
    secondModel = "standard";
  }

  // fill in the model descriptions
  let primaryModelDesc = [];
  let secondaryModelDesc = [];

  if (model === "mini") {
    primaryModelDesc.push(
      <h3 key="compactness">
        🔡 Compact form factor with no functional compromise
      </h3>
    );
    primaryModelDesc.push(
      <h3 key="portability">🔥 Unmatched portability for minimalists</h3>
    );
  } else if (model === "standard") {
    primaryModelDesc.push(
      <h3 key="layout">💡 DaVinci's unique zero-learning-curve layout </h3>
    );
    primaryModelDesc.push(<h3 key="fn">⌨️ Full sized function rows</h3>);
  }

  if (secondModel === "mini") {
    secondaryModelDesc.push(
      <h3 key="compactness">
        🔡 Compact form factor with no functional compromise
      </h3>
    );
    secondaryModelDesc.push(
      <h3 key="portability">🔥 Unmatched portability for minimalists</h3>
    );
  } else if (secondModel === "standard") {
    secondaryModelDesc.push(
      <h3 key="layout">💡 DaVinci's unique zero-learning-curve layout </h3>
    );
    secondaryModelDesc.push(<h3 key="fn">⌨️ Full sized function rows</h3>);
  }

  let switchPic;
  switch (switchType) {
    case "red":
      primaryModelDesc.push(
        <h3 key="quiet">🤫 Quiet and smooth typing experience</h3>
      );
      secondaryModelDesc.push(
        <h3 key="quiet">🤫 Quiet and smooth typing experience</h3>
      );
      switchPic = redSwitchPic;
      break;
    case "brown":
      primaryModelDesc.push(
        <h3 key="tactile">
          🍪 Tactile feeling, balance between clicky and quiet
        </h3>
      );
      secondaryModelDesc.push(
        <h3 key="tactile">
          🍪 Tactile feeling, balance between clicky and quiet
        </h3>
      );
      switchPic = brownSwitchPic;
      break;
    case "blue":
      primaryModelDesc.push(
        <h3 key="clicky">🌟 Clicky with vibrant feedback</h3>
      );
      secondaryModelDesc.push(
        <h3 key="clicky">🌟 Clicky with vibrant feedback</h3>
      );
      switchPic = blueSwitchPic;
      break;
    default:
      break;
  }

  let paymentLinkQuery = `${model}:${color}:${layout}:${switchType}`;
  let secondaryPaymentLinkQuery = `${secondModel}:${color}:${layout}:${switchType}`;
  let targetPay, secondaryTargetPay, disabled;
  let targetSub, secondaryTargetSub;
  if (paymentLinks && paymentLinks[paymentLinkQuery]) {
    targetPay = paymentLinks[paymentLinkQuery];
    secondaryTargetPay = paymentLinks[secondaryPaymentLinkQuery];
    disabled = false;
  } else {
    targetPay = "_self";
    secondaryTargetPay = "_self";
    disabled = true;
  }

  if (subscriptiontLinks && subscriptiontLinks[paymentLinkQuery]) {
    targetSub = subscriptiontLinks[paymentLinkQuery];
    secondaryTargetSub = subscriptiontLinks[secondaryPaymentLinkQuery];
    disabled = false;
  } else {
    targetSub = "_self";
    secondaryTargetSub = "_self";
    disabled = true;
  }

  return (
    <div>
      <Card id="resultCard">
        <h6>Your Best Match...</h6>
        <h1>
          A {color} v1 {model} with {switchType} switches.
        </h1>
        <br />
        <br />
        <Container>
          <Row>
            <Col xs={11} className="keyboardPictureContainer">
              <img
                className="keyboardPicture"
                src={`${s3Base}/keyboards/v1_${model}_${color}_${layout}.png`}
                alt="keyboard"
              />
            </Col>
            <Col xs={1}>
              <img className="switchPicture" src={switchPic} alt="switch" />
            </Col>
          </Row>
        </Container>
        <br />
        <h6>We believe this is a good match because...</h6>
        {primaryModelDesc}
        <br />
        <Row>
          <Col sm="12" md="6">
            <Button
              style={{ width: "100%", margin: "5px" }}
              variant="warning"
              onClick={() => {
                captureMessage("User attempted to pay full amount");
                window.open(targetPay);
              }}
              disabled={disabled}
            >
              <h5>Order Now: $149 USD</h5>
            </Button>
          </Col>

          <Col sm="12" md="6">
            <Button
              style={{ width: "100%", margin: "5px" }}
              variant="success"
              onClick={() => {
                captureMessage("User attempted to subscribe to HaaS");
                window.open(targetSub);
              }}
              disabled={disabled}
            >
              <h5>Try 60 days free, then $14.99/month * 1 year</h5>
            </Button>
          </Col>
        </Row>
      </Card>

      <br />

      <Card>
        <h6>Your might also be interested in...</h6>
        <h1>
          A {color} v1 {secondModel} with {switchType} switches.
        </h1>
        <br />
        <br />
        <Container>
          <Row>
            <Col xs={11} className="keyboardPictureContainer">
              <img
                className="keyboardPicture"
                src={`${s3Base}/keyboards/v1_${secondModel}_${color}_${layout}.png`}
                alt="keyboard"
              />
            </Col>
            <Col xs={1}>
              <img className="switchPicture" src={switchPic} alt="switch" />
            </Col>
          </Row>
        </Container>
        <br />
        <h6>This is also a good match because...</h6>
        {secondaryModelDesc}
        <br />

        <Row>
          <Col sm="12" md="6">
            <Button
              style={{ width: "90%", margin: "5px" }}
              variant="warning"
              onClick={() => {
                window.open(secondaryTargetPay);
              }}
              disabled={disabled}
            >
              <h5>Order Now: $149 USD</h5>
            </Button>
          </Col>

          <Col sm="12" md="6">
            <Button
              style={{ width: "90%", margin: "5px" }}
              variant="success"
              onClick={() => {
                window.open(secondaryTargetSub);
              }}
              disabled={disabled}
            >
              <h5>Try 60 days free, then $14.99/month * 1 year</h5>
            </Button>
          </Col>
        </Row>
      </Card>
      <br />
      <br />
      <Card>
        <Row className="justify-content-md-center">
          Not quite what you want?
        </Row>
        <br />
        <Row className="justify-content-md-center">
          <Col sm={12} md={6} lg={4}>
            <Button
              className="customization"
              variant="info"
              href="mailto:support@davinci-ergo-lab.com?subject=I want something special..."
            >
              <h4>Tell us what you need! 📧</h4>
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
