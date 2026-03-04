import { Accordion, InputGroup, Form } from "react-bootstrap";
import { useState } from "react";

import "./resources.css";
import green from "../media/green.jpg";
import std from "../media/standard.png";
import mini from "../media/mini.png";
import layer0 from "../media/layer0.png";
import layer1 from "../media/layer1.png";
import layer2 from "../media/layer2.png";
import load_layout from "../media/load_layout.png";
import configure from "../media/configure.png";
import authorize from "../media/authorize.png";
import { captureMessage } from "@sentry/react";

export default function KnowledgeBase() {
  const s3Base = `${process.env.PUBLIC_URL}/s3`;
  const allResources = [
    <Accordion.Item key="production status" eventKey="production status">
      <Accordion.Header>[HOT] How is production going?</Accordion.Header>
      <Accordion.Body>
        <div>
          <p>Updated 8/14/2022.</p>
          <p>
            v1 Standard: In assembly. We're shipping orders as they come in.
          </p>
          <img
            src={std}
            style={{ width: "50%", minWidth: "200px" }}
            alt="mini"
          />
          <p>
            v1 Standard: In assembly. We're shipping orders as they come in.
          </p>
          <img
            src={mini}
            style={{ width: "50%", minWidth: "200px" }}
            alt="mini"
          /> 
        </div>
      </Accordion.Body>
    </Accordion.Item>,


    <Accordion.Item key="customize" eventKey="customize">
      <Accordion.Header>
        What aspects of the keyboard can I customize?
      </Accordion.Header>
      <Accordion.Body>
        <p>Basically everything!</p>{" "}
        <p>
          From key mapping, key switches, keycaps, DaVinci is made to be
          upgradable and customizable to your specific needs.
        </p>
        <p>Be creative! For your reference, here's a matcha-inspired theme!</p>
        <img src={green} style={{ width: "80%" }} alt="green keyboard"></img>
      </Accordion.Body>
    </Accordion.Item>,

    <Accordion.Item key="default keymap" eventKey="default keymap">
      <Accordion.Header>What is the default keymap?</Accordion.Header>
      <Accordion.Body>
        <div>
          <h3>For Windows:</h3>
          <div>
            <img
              src={layer0}
              style={{ width: "50%", minWidth: "200px" }}
              alt="layer 0"
            /></div>
          <div>
            <img
              src={layer1}
              style={{ width: "50%", minWidth: "200px" }}
              alt="layer 1"
            /></div>
          <div>
            <img
              src={layer2}
              style={{ width: "50%", minWidth: "200px" }}
              alt="layer 2"
            /></div>
        </div>
      </Accordion.Body>
    </Accordion.Item>,

    <Accordion.Item key="how to map a key" eventKey="how to map a key">
      <Accordion.Header>How do I remap / customize key mapping / layout?</Accordion.Header>
      <Accordion.Body>
        <div>
          <h3>
            We're rolling out a configuration file that you can use with the
            beloved open-source
            <a
              href="https://usevia.app/#/design"
              rel="noreferrer"
              target="_blank"
            >
              {" "}
              VIA Software.
            </a >
          </h3>
          <br />
          <h3>Follow these steps to start customizing your DaVinci.</h3>

        </div>
        <p>1.  Right click on either of the following links, and click "Save Link As" to save the layout file onto your computer.</p>
        <a
          href={`${s3Base}/data/v1_standard_via_layout.json`}
          rel="noreferrer"
          target="_blank"
        >DaVinci v1 Standard</a>
        <br/>
        <a
          href={`${s3Base}/data/v1_mini_via_layout.json`}
          rel="noreferrer"
          target="_blank"
        >DaVinci v1 mini</a>

        <p>2. Open the <a
          href="https://usevia.app/#/design"
          rel="noreferrer"
          target="_blank"
        >VIA keyboard customizer.</a> Hit on the "Load" button. Select the .json file that we just downloaded.
        </p>
        <img src={load_layout} alt={"load layout"} width="80%"/>

        <p>3. You should be seeing this interface. Now click on "Configure" at the top left.</p>
        <img src={configure} alt={"configure"} width="80%"/>

        <p>4. Authorize your web browser to access your keyboard.</p>
        <img src={authorize} alt={"authorize"} width="80%"/>

        <p>5. Start customizing! </p>

      </Accordion.Body>
    </Accordion.Item>,

    <Accordion.Item key="hotswappable" eventKey="hotswappable">
      <Accordion.Header>Are DaVinci Keyboards hot-swappable?</Accordion.Header>
      <Accordion.Body>
        <p>
          YES!! All our keyboards are hot-swappable - you can always swap to your favorite keycaps and switches at any time.
        </p>
      </Accordion.Body>
    </Accordion.Item>,


    <Accordion.Item key="what if stop working" eventKey="what if stop working">
      <Accordion.Header>What if my keyboard stops working?</Accordion.Header>
      <Accordion.Body>
        <p>
            Founder's Edition cutsomers enjoy their life-time warranty on their DaVinci keyboards. We will cover all the fees related to your repair,
            and that includes shipping, parts replacement, etc. 
        </p>
        <p>
            The team at DaVinci commits fully to providing you, our customers, the best experience with a set of keyboard.
        </p>
      </Accordion.Body>
    </Accordion.Item>,

    
    <Accordion.Item key="subscription" eventKey="subscription">
      <Accordion.Header>How does the subscription model work?</Accordion.Header>
      <Accordion.Body>
        <p>
          An attempt at HaaS (Hardware as a Service), we released the subscription payment option in July 2022. 
        </p>
        <p>
          Subscribers will be able to enjoy a 60-day trial period with our keyboards - We will cover all shipping costs. 
          After the Trial period, we will charge $14.99 USD for a total of 12 months.
        </p>
        <p>
          This will be a great choice for you if you're unsure whether you'll like the keyboard or not - now you can try it
          for free, with no strings attached.
        </p>
        <p>
          Yes, we are that confident that you will love our product!
        </p>
      </Accordion.Body>
    </Accordion.Item>,
  ];

  let [filteredResources, setFilteredResources] = useState(allResources);

  let log_selected_resource = (e) => {
    if (e.length > 0){
      captureMessage("User visited resource: " + e);
    }
  }

  return (
    <div className="knowledgebase-container">
      <Accordion alwaysOpen onSelect={(e) => {log_selected_resource(e)}}>
        <InputGroup className="mb-4" style={{ minWidth: "200px" }}>
          <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
          <Form.Control
            placeholder=""
            aria-label="search"
            aria-describedby="basic-addon1"
            onChange={(e) => {
              let kw = e.target.value;
              setFilteredResources(
                allResources.filter((article) =>
                  article.props.children[0].props.children.includes(kw) || kw.length < 1
                )
              );
            }}
          />
        </InputGroup>

        {filteredResources}
      </Accordion>
    </div>
  );
}
