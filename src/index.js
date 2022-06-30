import * as React from "react";
import * as ReactDOM from "react-dom";
import history from "./utils/history";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../src/features/Routes/index";
import "antd/dist/antd.css";
import "./App.css";

const App = () => <Routes />;

ReactDOM.render(<App />, document.getElementById("root"));
