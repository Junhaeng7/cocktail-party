// import logo from './logo.svg';
import React from "react";
import "./App.css";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import FullLayout from "./components/layout/full_layout/full_layout";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import Menu from "./components/Menu";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Router>
          <FullLayout />
          <div className="Menu">
            <Menu />
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
}

//export default withAuthenticator(App);
export default App;
