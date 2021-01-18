import React from "react";
//import columns from "../inventoryschema.js";

function TableCell(props){

    function handleChange(event){
        var changedText = event.target.value;
        props.handleChange(props.name,changedText);
    }

    function highlight(event){
        event.target.select();
    }

    function style() {
        return {
            width: props.schema[props.id+1].defaultWidth,
            textAlign: props.schema[props.id+1].align
        }
    }


    return <td ><input placeholder="null" style={style()} onClick={highlight} onChange={handleChange} value={props.value || ""}></input></td>
}


export default TableCell;
