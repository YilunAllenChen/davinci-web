import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { navigateTo } from "../states/store";
import "./about.css";

export default function About() {
  let dispatch = useDispatch();

  let content = [];

  for (let i = 0; i < 20; ++i) {
    content.push(<div>hi.</div>);
  }

  return (
    <div>
      <section className="bg typingOnNormal">
        <h2 className="">
          Ordinary keyboards don't work well with our bodies.
        </h2>
        <br />
        <br />
        <br />
        <p>
          Ever wondered why your wrists have to bend outwards unnaturally just
          to type?
        </p>
        <br />
        <p>
          They cause{" "}
          <span className="red">
            pronation, ulnar deviation, and carpal tunnels.
          </span>
        </p>
        <br />
        <p>
          We're here to <span className="green">fix it.</span>
        </p>
        <br />
        <br />

        <Button
          className="configureButton"
          variant="warning"
          onClick={() => {
            dispatch(
              navigateTo({
                to: "Customize",
              })
            );
          }}
        >
          Configure Yours
        </Button>
      </section>

      <section className="bg ergo">
        <h2 className="">Ergonomics Maxima.</h2>
        <br />
        <br />
        <br />
        <p>
          Split body for <span className="green">shoulder pain relief</span>
        </p>
        <br />
        <p>
          Natural 8° tilting for{" "}
          <span className="green">wrist & arm comfort</span>
        </p>
        <br />
        <p>
          Redesigned thumb cluster for{" "}
          <span className="green">additional productivity</span>
        </p>
      </section>

      <section className="bg layout">
        <h2 className="">Oh no. Learning curve.</h2>
        <h2 className="green">Oh, No learning curve.</h2>
        <br />
        <br />
        <br />
        <p>
          Our proprietary layout makes the transition to DaVinci{" "}
          <span className="blue">smooth and easy.</span>
        </p>
        <br />
        <p>"Feels intriguingly familiar".</p>
        <br />
        <p>Full sized arrow keys.</p>
        <br />
        <p>
          Full sized function rows <sub>(v1 standard only)</sub>
        </p>
      </section>

      <section className="bg typing">
        <h2 className="">Mechanical Fun.</h2>
        <br />
        <br />
        <br />
        <p>
          Unmatched typing experience with <b>Gateron Pro</b> factory-lubricated
          switches.{" "}
        </p>
        <br />
        <p>
          Choose from vibrant and clicky <span className="blue">Blues</span>,
          thocky and tactile <span className="brown">Browns</span>, or stealthy
          and smooth <span className="red">Reds</span>.
        </p>
        <br />
        <p>Or shoot us an email if you need advice / custom needs!</p>
        <br />
        <p>
          Of course it's <span className="yellow">Hot-swappable</span>!
        </p>
      </section>

      <section className="bg layers">
        <h2 className="">Ace Your Productivity.</h2>
        <br />
        <br />
        <br />
        <p>
          <span className="orange">Every key</span> is remappable your personal
          liking with VIA software.
        </p>
        <br />
        <p>
          Access up to <span className="yellow">32 different layers</span>!
        </p>
        <br />
        <p>Create powerful macros 🤖.</p>
        <br />
        <p>Or even emulate a mouse 🖱️!</p>
        <br />
        <br />
        <Button
          className="configureButton"
          variant="warning"
          onClick={() => {
            dispatch(
              navigateTo({
                to: "Customize",
              })
            );
          }}
        >
          Configure Yours
        </Button>
      </section>

      <section className="bg coffee">
        <h2 className="">Coffee☕. In between.</h2>
        <br />
        <br />
        <br />
        <p>...Or water🥤. Juice🍹. Beer🍺.</p>
        <br />

        <p>Of course,</p>
        <p> compatible with all mugs.</p>
        <br />
        <p>Cheers.</p>
        <br />
        <br />
        <br />
        <Button
          className="configureButton"
          variant="warning"
          onClick={() => {
            dispatch(
              navigateTo({
                to: "Customize",
              })
            );
          }}
        >
          Configure Yours
        </Button>
      </section>
    </div>
  );
}
