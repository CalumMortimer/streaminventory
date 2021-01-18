import NavBar from "./NavBar.jsx";
import FormContainer from "./FormContainer.jsx";
import {useHistory} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
import {toast} from "react-toastify";

toast.configure();

function IndexPage(){
  const history = useHistory();
  
  useEffect(()=>{
    function notifyBad(){
      toast.error("Internal server error! 😱",{position: toast.POSITION.BOTTOM_RIGHT, autoClose: 3000});
    }
    const navigate = async ()=>{
      axios.get("/isauthenticated")
        .then((response)=>{
        if (response.status===200){
         history.push("/inventory");
        }
      })
      .catch((err)=>{
        console.log(err);
        notifyBad();
      });
    }
    navigate();
  },[]);

  

  return <div>
  <NavBar/>
  <FormContainer/>
  </div>

}

export default IndexPage;
