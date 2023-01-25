import React, { useState } from "react";

function SignUp(props){
const baseUrl = props.baseUrl;
const [formState,setForm] = useState({userName:null,password:null});

const onFormChange = e =>{
debugger;
    if (e.target.id === "userName"){
        setForm(prevState => { return {...prevState,userName:e.target.value};});

    }

    if (e.target.id === "password"){
        setForm(prevState => { return {...prevState,password:e.target.value};});
    }
}


var signUpPromise = fetch(`${baseUrl}/signUp`, {
    method: "POST", // or 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formState),
  });

    return(<div onChange={onFormChange}>

<label>kullanıcı adı</label>
<input type="text" id="userName" value={formState.userName} />
<label>parola</label>
<input type="text" id="password" value={formState.password}/>
<label>parola tekrar </label>
<input type="text"/>
    </div>)

}

export default SignUp;