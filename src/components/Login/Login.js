import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import { useNavigate,useParams } from 'react-router-dom'
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Login(props) {
  debugger;
  const setcurrentUserAsked = props.setcurrentUserAsked;
  const setCurrentUser = props.setCurrentUser;
  setCurrentUser(null);
const baseUrl = props.baseUrl;
const setIsAdminAsked = props.setIsAdminAsked;
  const [formState, setForm] = useState({userName:"",password:""});
  let { prevPage } = useParams();
  console.log("prevPage" + prevPage);
  const  navigate = useNavigate(); // Read values passed on state

  const onFormChange = (e) => {
    debugger;
    if (e.target.getAttribute("name") === "userName") {
      setForm((prevState) => {
        return { ...prevState, userName: e.target.value };
      });
    }
    if (e.target.getAttribute("name") === "password") {
      setForm((prevState) => {
        return { ...prevState, password: e.target.value };
      });
    }
  };


const onLoginClick = (event) => {

  const loginPromise =    fetch(`${baseUrl}/Login`, {
    method: 'POST', // or 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(formState)
      })
    .then((response) => {
if (!response.ok){
return response.text().then(x =>  Promise.reject(x));

}
return response.text(); });
loginPromise.then(x=>{navigate("/" + prevPage);debugger;setcurrentUserAsked(false);})

};

  return (


    <div>
 <label>username</label>
      <input type="text" name="userName" value={formState.userName} onChange={onFormChange}/>
      <label>password</label>
      <input type="text" name="password" value={formState.password} onChange={onFormChange}/>

      <button onClick={onLoginClick}>Giriş</button>
     
    </div>

  );

}