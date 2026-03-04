import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

import logo from "../media/logo.png";
import "./navbar.css";
import { navigateTo } from "../states/store";
import { useDispatch } from "react-redux";

function OffcanvasExample() {
  let dispatch = useDispatch();
  let expand = "md";
  return (
    <>
      <Navbar
        sticky="top"
        key={expand}
        expand={expand}
        className="mb-3 naaav"
        collapseOnSelect={true}
      >
        <Container fluid>
          <Navbar.Brand href="#">
            <img
              src={logo}
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            className="offcanvas"
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link
                  onClick={(e) => {
                    dispatch(
                      navigateTo({
                        to: "Home",
                      })
                    );
                  }}
                  href="#home"
                >
                  Home
                </Nav.Link>

                <Nav.Link
                  onClick={(e) => {
                    dispatch(
                      navigateTo({
                        to: "About",
                      })
                    );
                  }}
                  href="#about"
                >
                  About
                </Nav.Link>

                <Nav.Link
                  onClick={(e) => {
                    dispatch(
                      navigateTo({
                        to: "Customize",
                      })
                    );
                  }}
                  href="#customize"
                >
                  Customize
                </Nav.Link>

                <Nav.Link
                  onClick={(e) => {
                    dispatch(
                      navigateTo({
                        to: "Resources",
                      })
                    );
                  }}
                  href="#resources"
                >
                  Resources
                </Nav.Link>

                <Nav.Link
                  onClick={(e) => {
                    dispatch(
                      navigateTo({
                        to: "Help",
                      })
                    );
                  }}
                  href="#help"
                >
                  Help 
                </Nav.Link>

              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default OffcanvasExample;
