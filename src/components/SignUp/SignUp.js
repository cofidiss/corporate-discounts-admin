import React, { useState } from "react";
import { useNavigate,useParams } from 'react-router-dom'
function SignUp(props){
    let { prevPage } = useParams();
    const  navigate = useNavigate(); 
const baseUrl = props.baseUrl;
const setcurrentUserAsked = props.setcurrentUserAsked;
const [formState,setForm] = useState({userName:null,password:null});
const setMyModal = props.setMyModal;
const onFormChange = e =>{
debugger;
    if (e.target.id === "userName"){
        setForm(prevState => { return {...prevState,userName:e.target.value};});

    }

    if (e.target.id === "password"){
        setForm(prevState => { return {...prevState,password:e.target.value};});
    }
}

const onSignUpClick = e => {
    var signUpPromise = fetch(`${baseUrl}/signUp`, {
        method: "POST", // or 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });
    
      signUpPromise.then((response) => {
        if (!response.ok) {
          return response.text().then((x) => Promise.reject(x));
        }
        return response.text();
      }).then(x=>setMyModal({isOpen: true, content: x ,closeHandler: e =>{ setcurrentUserAsked(false);  setMyModal({isOpen:false,content:null,closeHandler:null});
      navigate("/" + prevPage);
      }}))
}


    return(<div onChange={onFormChange}>

<label>kullanıcı adı</label>
<input type="text" id="userName" value={formState.userName} />
<label>parola</label>
<input type="text" id="password" value={formState.password}/>
<label>parola tekrar </label>
<input type="text"/>
<button onClick={onSignUpClick} >Kayıt Ol</button>
    </div>)

}

export default SignUp;