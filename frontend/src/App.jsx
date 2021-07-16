import React from "react";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import InventoryPage from "./components/InventoryPage";
import IndexPage from "./components/IndexPage";
import {toast} from "react-toastify";
import DFormListing from "./components/DFormListing";

toast.configure();

function App(){

  return <Router>
      <Switch>
        <Route path="/" exact component={IndexPage}/>
        <Route path="/inventory" exact component={InventoryPage}/>
        <Route path="/dforms" exact component={DFormListing}/>
      </Switch>
    </Router>
}

export default App;
