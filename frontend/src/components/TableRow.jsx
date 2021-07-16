import React from "react";
import TableCell from "./TableCell.jsx";

function TableRow(props){
    const keys = Object.keys(props.rowData);
    const values = Object.values(props.rowData);

    function handleChange(name,value){
        props.handleChange(name,value,props.id);
    }

    return <tr className="table-data-rows">
        <td style={{textAlign: "center"}}><button className="btn btn-danger btn-sm" onClick={()=>props.removeRow(props.id)}>X</button></td>
        {keys.map((thisKey,index)=> <TableCell schema={props.schema} key={index} id={index} name={thisKey} value={values[index]} handleChange={handleChange}/>)}
    </tr>
}

export default TableRow;