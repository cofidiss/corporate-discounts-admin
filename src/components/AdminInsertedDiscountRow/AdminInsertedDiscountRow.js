import React, {useState} from 'react';
import PreLoader from  "../PreLoader/PreLoader";
import MyModal from  "../MyModal/MyModal";

function AdminInsertedDiscountRow(props){
 debugger;

  const discountScopeLov = props.discountScopeLov;
  const firmLov = props.firmLov;
  const [rowState,setRowState] = useState(props.rowState);
const [formState,setFormState] = useState({firmId:1,
  validCitiesState:"",discountScopeId:1});


return (
<tr  style={{display:rowState === "undefined" ? "none" : "default"}} rowState={rowState.toString()}>
      <td>
      <select id="firm_id" name="firmId" onChange={e =>{ setFormState(prevState => {return {...prevState,firmId:e.target.value}; }
          
          )}}
         
         value={formState.firmId}>
           {firmLov.map((x) => (
             <option value={x.firmId}>{x.firmName}</option>
           ))}
           
         </select>
      </td>
      <td>
        <input onChange={e=> {setFormState(prevState=>{ return {...prevState,discountInfoState:e.target.value};});}}
          type="text"
          id="discount_description"
          name="discountDescription"
          value={formState.discountInfoState}
        />
      </td>
      <td>
        <select id="discount_scope" name="discountScope" onChange={e =>{ setFormState(prevState => {return {...formState,discountScopeId:e.target.value}; }
          
         )}}
        
        value={formState.discountScopeId}>
          {discountScopeLov.map((x) => (
            <option value={x.discountScopeId}>{x.discountScopeName}</option>
          ))}
          
        </select>
      </td>
      <td>
        <p>{((firmLov.filter(x => x.firmId === parseInt(formState.firmId)))[0]).firmContact}</p>
      </td>
      <td>
      <input onChange={e=>{setFormState(prevState=>{ return {...prevState,validCitiesState:e.target.value};})}}
          type="text"
          id="valid_cities"
          name="validCities"
          value={formState.validCitiesState}
        />
      </td>
      <td><button onClick={e => {setRowState("undefined")}}>Sil</button></td>
    </tr>

);

}
  
export default AdminInsertedDiscountRow;