import NavBar from "./NavBar.jsx";
import Table from "./Table.jsx";
import columns from "../dformschema.js";

function InventoryPage(){

  const style = {
    backgroundColor: "rgba(0,0,0,.5)",
    height: "1px" 
  }

  return <div><NavBar page="dforms"/><div style={style}></div><Table schema={columns} backendRoute="/serverdforms"/></div>

}

export default InventoryPage;