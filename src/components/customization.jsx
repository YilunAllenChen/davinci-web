import "./customization.css";
import {
  CustomizeColor,
  CustomizeLayout,
  CustomizeModel,
  CustomizeSwitch,
  Preparation,
} from "./questions";

import { useSelector } from "react-redux";
import ResultCard from "./result";
const selectUserState = (state) => state.userState;
const selectCustomization = (state) => state.customization;

export default function Customizer() {
  let customizationState = useSelector(selectCustomization);
  let { questions, switchType, color, layout } = customizationState;
  let userState = useSelector(selectUserState);

  return (
    <div>
      {/* <div> */}
      <Preparation />
      {/* </div> */}

      <div className="sectional" hidden={userState !== "ready"}>
        <br />
        <CustomizeModel />
      </div>

      <div className="sectional" hidden={Object.keys(questions).length < 4}>
        <CustomizeColor />
      </div>

      <div className="sectional" hidden={color == null}>
        <CustomizeSwitch />
      </div>

      <div className="sectional" hidden={switchType == null}>
        <CustomizeLayout />
      </div>

      <div className="sectional" hidden={layout == null}>
        <br></br>
        <ResultCard />
      </div>
    </div>
  );
}
