import Axios from "axios";
import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function Form(){
  const history=useHistory();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  
  function handleEmailChange(event){
    const target = event.target;
    setEmail(target.value);
  }

  function handlePasswordChange(event){
    const target = event.target;
    setPassword(target.value);
  }

  function redirectSuccess(){
    history.push("/inventory");
  }

  function notifyBadCredentials(){
    toast.error("Invalid username / password! 😱",{position: toast.POSITION.BOTTOM_RIGHT, autoClose: 3000});
  }

  function notifyBadServer(){
    toast.warning("Internal server error! 😱",{position: toast.POSITION.BOTTOM_RIGHT, autoClose: 3000});
  }

  function login(event){
    event.preventDefault();
    Axios.post("/login",{
      username: email,
      password: password
    })
    .then((res)=>{
      if (res.status===200){
        redirectSuccess();
      }else{
        notifyBadCredentials();
      }
    })
    .catch((err)=>{
      notifyBadServer();
    });
  }

  return <form>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input onChange={handleEmailChange} value={email} type="email" autoComplete="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input onChange={handlePasswordChange} value={password} type="password" autoComplete="current-password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
  </div >
  <div className="text-center submit-button">
    <button onClick={login} className="btn btn-primary">Submit</button>
  </div>
  </form>
}


export default Form;
