
import React, {useState} from 'react';

function AdminDiscountTableRow(props) {
  const currentAdminDiscountRow = props.currentAdminDiscountRow;
  const discountScopeLov = props.discountScopeLov;

  const [rowState,setRowState] = useState("unchanged");
const [formState,setFormState] = useState({discountInfoState:currentAdminDiscountRow.discountInfo,
  validCitiesState:currentAdminDiscountRow.validCities,discountScopeId:currentAdminDiscountRow.discountScopeId});

   
   
  return (
    <tr discountid={currentAdminDiscountRow.discountId} style={{display:rowState === "deleted" ? "none" : "default"}} rowState={rowState.toString()}>
      <td>
        <p>{currentAdminDiscountRow.firmName}</p>
      </td>
      <td>
        <input onChange={e=> {setRowState("updated"); setFormState(prevState=>{ return {...prevState,discountInfoState:e.target.value};});}}
          type="text"
          id="discount_description"
          name="discountDescription"
          value={formState.discountInfoState}
        />
      </td>
      <td>
        <select id="discount_scope" name="discountScope" onChange={e =>{setRowState("updated"); setFormState(prevState => {return {...formState,discountScopeId:e.target.value}; }
          
         )}}
        
        value={formState.discountScopeId}>
          {discountScopeLov.map((x) => (
            <option value={x.discountScopeId}>{x.discountScopeName}</option>
          ))}
          
        </select>
      </td>
      <td>
        <p>{currentAdminDiscountRow.firmContact}</p>
      </td>
      <td>
      <input onChange={e=>{setRowState("updated");setFormState(prevState=>{ return {...prevState,validCitiesState:e.target.value};})}}
          type="text"
          id="valid_cities"
          name="validCities"
          value={formState.validCitiesState}
        />
      </td>
      <td><button onClick={e => {setRowState("deleted")}}>Sil</button></td>
    </tr>
  );
}

export default AdminDiscountTableRow;
  