import {Link} from "react-router-dom"

function NavBar(){

  return <nav className="navbar navbar-expand-lg navbar-dark bg-info">
  <a className="navbar-brand" href="/">Stream Measurement</a>
  <ul className="navbar-nav ml-auto">
    <li className="nav-item">
      <Link className="nav-link" to="/inventory">Inventory</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/dforms">D Forms</Link>
    </li>
  </ul>
  </nav>
  
}

export default NavBar;
