import React, {useState} from 'react';
import PreLoader from  "../PreLoader/PreLoader";
import MyModal from  "../MyModal/MyModal";




function AdminEditFirmTableRow(props){
    
const [rowState,setRowState] = useState("unchanged"); 
    const [formState,setForm] = useState({firmName:props.firmName,firmContact:props.firmContact});

const onFromChange= e => {

    setRowState("updated");


   var idOfElement =  e.target.getAttribute("id");

   if (idOfElement === "firmName"){
    setForm (prevState =>  { return {...prevState, firmName:  e.target.value};})


   }
   if (idOfElement === "firmContact"){
    setForm (prevState =>  { return {...prevState, firmContact:  e.target.value};})


   }


};
let displayValue = rowState ==="deleted" ? "none":"default";
return(<tr rowstate={rowState} style={{display:displayValue}} id={props.firmId}>
    <td>{props.firmId}</td>
    <td>

<input type="text" id="firmName" value={formState.firmName} onChange={onFromChange}/>
</td>

<td>

<input type="text" id="firmContact" value={formState.firmContact}  onChange={onFromChange}/>
</td>
<td>
<button onClick={e => setRowState("deleted")}> Sil </button>

</td>
</tr>);

}

export default AdminEditFirmTableRow; 