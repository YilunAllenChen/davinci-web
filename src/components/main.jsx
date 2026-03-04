import { Button, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { navigateTo } from "../states/store";
import "./main.css";

export default function Home() {
  let dispatch = useDispatch();
  return (
    <>
      <div className="bg-pic" id="title">
        <h1>DaVinci v1 
        </h1>
        <h1>
          <span className="yellow">Founder's</span>{" "}
          <span className="orange">Edition</span>
        </h1>
        <h6>
            Customizable, Ergonomic Keyboard
            with ZERO learning curve.
        </h6>
        <br />
        <br />
        <h2>
          Try 2 months <span className="yellow">for free,</span> then
        </h2>
        <h2>
          <span className="yellow">$15</span> / month x 12 months
        </h2>
        <br />
        <h1>OR</h1>
        <br />

        <h2>
          <span className="emphasize">$149</span>
        </h2>
        <br />
        <h6>New orders expected to ship within 2 weeks.</h6>
        <br />
        <Row>
          <Col className="mainCol" xs="12" md="6">
            <Button
              className="mainButton"
              variant="warning"
              onClick={() => {
                dispatch(
                  navigateTo({
                    to: "Customize",
                  })
                );
              }}
            >
              <b>Customize Yours</b>
            </Button>
          </Col>
          <Col className="mainCol" xs="12" md="6">
            <Button
              className="mainButton"
              variant="light"
              onClick={() => {
                dispatch(
                  navigateTo({
                    to: "About",
                  })
                );
              }}
            >
              Learn More
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
}
