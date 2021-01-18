import {Link} from "react-router-dom"
import React from "react"

function NavBar(props){

  function switchActive(pageName){
    if (props.page === pageName){
      return "nav-link active";
    }else{
      return "nav-link";
    }
  }


  return <nav className="navbar navbar-expand-lg navbar-dark bg-info">
  <a className="navbar-brand" href="/">Stream Measurement</a>
  <ul className="navbar-nav ml-auto">
    <li className="nav-item">
      <Link className={switchActive("inventory")} to="/inventory">Inventory</Link>
    </li>
    <li className="nav-item">
      <Link className={switchActive("dforms")} to="/dforms">D Forms</Link>
    </li>
  </ul>
  </nav>
  
}

export default NavBar;
