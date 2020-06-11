import React from "react";
import { Route, HashRouter, Switch } from "react-router-dom";
import Main from "./components/Main";
import ScrollToTop from "./components/ScrollTop";
import SearchPage from "./components/SearchPage";
import AddPage from "./components/AddPage";

export default (props) => (
  <HashRouter>
    <ScrollToTop>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/search" component={SearchPage} />
        <Route path="/add" component={AddPage} />
      </Switch>
    </ScrollToTop>
  </HashRouter>
);
