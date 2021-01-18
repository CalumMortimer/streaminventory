import React, { useState, useEffect } from "react";
import TableRow from "./TableRow.jsx";
import TableHeader from "./TableHeader.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import TableSortArrows from "./TableSortArrows.jsx";

toast.configure();
const initialSort = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];

function Table(props) {
  const [currentData, setData] = useState([]);
  const history = useHistory()
  const [sortDirection, setSortDirection] = useState([...initialSort]);

  useEffect(() => {
    axios.get(props.backendRoute)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          toast.notifyBad();
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        history.push("/");
      });
  }, []);

  function notifyGood() {
    toast.success("Data saved successfully! 🎉", { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 3000 });
  }

  function notifyBad() {
    toast.error("Internal server error! 😱", { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 3000 });
  }

  function submitData() {
    const payLoad = currentData;

    axios({
      url: props.backendRoute,
      method: "POST",
      data: payLoad
    })
      .then((response) => {
        if (response.status === 200) {
          notifyGood();
        }
        else {
          notifyBad();
        }
      })
      .catch(() => {
        notifyBad();
      });;
  };

  function addRow() {
    var newArray = [...currentData, dataDefault()];
    setData(newArray);
  }

  function dataDefault() {
    var defaultRow = {}
    for (var i = 1; i < props.schema.length; i++) {
      var id = [props.schema[i].keys];
      defaultRow[id] = "";
    }
    return defaultRow;
  }

  function removeRow(id) {
    var newArray = [...currentData];
    console.log(id);
    console.log(newArray);
    newArray.splice(id, 1);
    console.log(newArray);
    setData(newArray);
  }

  function handleChange(name, value, id) {
    setData(old =>
      old.map((row, index) => {
        if (index === id) {
          return {
            ...old[id],
            [name]: value,
          }
        }
        return row
      })
    )
  }

  function sortDesc(id) {
    var sortOn = props.schema[id].keys;
    var newArray = [...currentData];

    newArray.sort((a, b) => {
      var nameA = null;
      if (a[sortOn] != null) { nameA = a[sortOn].toUpperCase(); }
      var nameB = null;
      if (b[sortOn] != null) { nameB = b[sortOn].toUpperCase(); }
      if (nameA < nameB) {
        return 1;
      }
      if (nameA > nameB) {
        return -1;
      }
      return 0;
    });
    setData(newArray);
    var sortArray = [...initialSort];
    sortArray[id] = false;
    setSortDirection(sortArray);
  }

  function sort(id) {
    //check if sorting dates or text
    if (props.schema[id].validationCode === 1) {
      dateSort(id);
    } else {
      //don't sort delete column
      if (id > 0) {
        if (sortDirection[id] === true) {
          sortDesc(id);
        } else {
          var sortOn = props.schema[id].keys;
          var newArray = [...currentData];

          newArray.sort((a, b) => {
            var nameA = null;
            if (a[sortOn] != null) { nameA = a[sortOn].toUpperCase(); }
            var nameB = null;
            if (b[sortOn] != null) { nameB = b[sortOn].toUpperCase(); }
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          });
          setData(newArray);
          var sortArray = [...initialSort];
          sortArray[id] = true;
          setSortDirection(sortArray);
        }
      }
    }
  }

  function dateSortDesc(id){
    var sortOn = props.schema[id].keys;
      var newArray = [...currentData];

      newArray.sort((a,b)=>{
        var nameA = null;
        if (a[sortOn] != null) { nameA = a[sortOn].toUpperCase(); }
        var nameB = null;
        if (b[sortOn] != null) { nameB = b[sortOn].toUpperCase(); }

        if (isValidDate(nameA) && isValidDate(nameB)){
          return new Date(nameB.substring(6,10),nameB.substring(3,5),nameB.substring(0,2)) - new Date(nameA.substring(6,10),nameA.substring(3,5),nameA.substring(0,2));
        }else if (isValidDate(nameA)){
          return -1;
        }else if (isValidDate(nameB)){
          return 1;
        }else{
          return 0;
        }
      });
      setData(newArray);
      var sortArray = [...initialSort];
      sortArray[id] = false;
      setSortDirection(sortArray);
  }

  function dateSort(id){
    if (sortDirection[id] === true){
      dateSortDesc(id);
    }else{
      var sortOn = props.schema[id].keys;
      var newArray = [...currentData];

      newArray.sort((a,b)=>{
        var nameA = null;
        if (a[sortOn] != null) { nameA = a[sortOn].toUpperCase(); }
        var nameB = null;
        if (b[sortOn] != null) { nameB = b[sortOn].toUpperCase(); }

        if (isValidDate(nameA) && isValidDate(nameB)){
          return new Date(nameA.substring(6,10),nameA.substring(3,5),nameA.substring(0,2)) - new Date(nameB.substring(6,10),nameB.substring(3,5),nameB.substring(0,2));
        }else if (isValidDate(nameA)){
          return 1;
        }else if (isValidDate(nameB)){
          return -1;
        }else{
          return 0;
        }
      });
      setData(newArray);
      var sortArray = [...initialSort];
      sortArray[id] = true;
      setSortDirection(sortArray);
    }
  }

  function isValidDate(data){
    const regex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    return regex.test(data);
  }

  return <div><table className="table table-sm no-gutters">
    <thead>
      <tr style={{ border: "0px" }} className="table-light top-sticky">
        {props.schema.map((column, index) => (<TableHeader sortDirection={sortDirection[index]} sort={sort} id={index} key={index} header={column.Header} />))}
      </tr>
      <tr style={{ border: "0px" }} className="table-light bottom-sticky">
        {props.schema.map((column, index) => <TableSortArrows key={index} id={index} sortDirection={sortDirection[index]} sort={sort} />)}
      </tr>
    </thead>
    <tbody>{currentData.map((row, index) => <TableRow schema={props.schema} id={index} key={index} rowData={row} removeRow={removeRow} handleChange={handleChange} />)}</tbody></table>
    <div className="control-buttons text-center">
      <button onClick={addRow} className="btn btn-success add-row-button">Add Row</button>
      <button onClick={submitData} className="btn btn-danger">Save Data</button>
    </div>
  </div>
}


export default Table;
