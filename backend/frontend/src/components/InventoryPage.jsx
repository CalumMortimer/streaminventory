import NavBar from "./NavBar.jsx";
import Table from "./Table.jsx";
import columns from "../inventoryschema.js";

function InventoryPage(){

  const style = {
    backgroundColor: "rgba(0,0,0,.5)",
    height: "1px" 
  }

  return <div><NavBar page="inventory"/><div style={style}></div><Table schema={columns} backendRoute={"/serverinventory"}/></div>

}

export default InventoryPage;
