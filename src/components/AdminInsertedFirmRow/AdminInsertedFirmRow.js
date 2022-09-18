import React, {useState} from 'react';
import PreLoader from  "../PreLoader/PreLoader";
import MyModal from  "../MyModal/MyModal";


function AdminInsertedFirmRow(props){

 const [formState,setForm] = useState({firmName:"",firmContact:""});

 const [rowTypeState,setRowType] = useState("inserted");

const onFormChange = event => {

    const targetElement = event.target;

    if(targetElement.getAttribute("id") === "firmName"){

        setForm(prevState => {return {...prevState,firmName:targetElement.value};}  );



    }

    if(targetElement.getAttribute("id") === "firmContact"){

        setForm(prevState => {return {...prevState,firmContact:targetElement.value};}  );



    }

           

};


    return (<tr rowState={rowTypeState} style={{display:rowTypeState === "inserted" ? "default": "none"}}>

  <td>Yeni Firma</td>
  <td><input type="text" id="firmName" value={formState.firmName} onChange={onFormChange}/></td>
  <td><input type="text" id="firmContact" value={formState.firmContact}  onChange={onFormChange}  /></td>
  
  <td><button onClick={e=> setRowType("abonded")} >sil</button></td>
    </tr>




    );




}

export default AdminInsertedFirmRow;