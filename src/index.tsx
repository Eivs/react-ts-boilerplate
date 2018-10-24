import * as React from "react";
import * as ReactDOM from "react-dom";

import { Demo } from "./components/Demo";

ReactDOM.render(
    <Demo compiler="TypeScript" framework="React" />,
    document.getElementById("example"),
);

module.hot.accept();
