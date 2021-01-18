

function TableSortArrows(props){
    function arrows(){
        if (props.id!==0){
            if (props.sortDirection===true){
                return <div>▲ ▽</div>
            }else if(props.sortDirection===false){
                return <div>△ ▼</div>
            }else{
                return <div>△ ▽</div>
            }
        }else{
            return <div></div>
        }
    }

    function style(){
        var thisStyle = {borderRight: "1px solid #dee2e6",
        borderLeft: "1px solid #dee2e6",
        userSelect: "none"}
        if (props.id===0){
            thisStyle.cursor = "default";
        }else{
            thisStyle.cursor = "pointer";
        }
        return thisStyle;
    }

    return <th style={style()} onClick={()=>props.sort(props.id)} className="text-center">{arrows()}</th>
}

export default TableSortArrows;