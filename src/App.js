import Customizer from "./components/customization";
import NavBar from "./components/navbar";
import "./App.css";
import { useSelector } from "react-redux";
import Home from "./components/main";
import Help from "./components/help";
import About from "./components/about";
import KnowledgeBase from "./components/resources";
import { captureMessage } from "@sentry/react";
import log from "./firebaseModules";

export default function App() {
  let navCurr = useSelector((state) => state.navigation.curr);
  log("App started", {foo: "bar"})
  let content = <>Hi.</>;
  switch (navCurr) {
    case "Home":
      captureMessage("User navigating Home");
      content = <Home />;
      break;
    case "About":
      captureMessage("User navigating About");
      content = <About />;
      break;
    case "Customize":
      captureMessage("User navigating Customize");
      content = <Customizer />;
      break;
    case "Resources":
      captureMessage("User navigating Resources");
      content = <KnowledgeBase />;
      break;
    case "Help":
      captureMessage("User navigating Help");
      content = <Help />;
      break;
    default:
      content = "DEFAULT.";
  }

  return (
    <>
      <NavBar />
      {content}
    </>
  );
}
