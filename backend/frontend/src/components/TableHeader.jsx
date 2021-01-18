import React from "react";


function TableHeader(props){

    function style(){
      var thisStyle = {wordWrap: "break-word",
      textAlign: "center",
      verticalAlign: "middle",
      padding: "2px",
      userSelect: "none",
      borderRight: "1px solid #dee2e6",
      borderLeft: "1px solid #dee2e6"}
      if (props.id===0){
          thisStyle.cursor = "default";
      }else{
          thisStyle.cursor = "pointer";
      }
      return thisStyle;
  }

  function sort(){
    props.sort(props.id);
  } 

  return <th onClick={()=>sort()} style={style()}>{props.header}</th>
}


export default TableHeader;
