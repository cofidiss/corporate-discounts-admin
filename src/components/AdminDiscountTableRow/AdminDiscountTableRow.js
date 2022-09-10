
import React, {useState} from 'react';

function AdminDiscountTableRow(props) {
  const currentAdminDiscountRow = props.currentAdminDiscountRow;
  const discountScopeLov = props.discountScopeLov;

debugger;
  const [discountDescriptionState,setDiscountDescription] = useState(currentAdminDiscountRow.discountInfo);

  const [validCitiesState,setValidCitiesState] = useState(currentAdminDiscountRow.validCities);

  return (
    <tr discountid={currentAdminDiscountRow.discountId}>
      <td>
        <p>{currentAdminDiscountRow.firmName}</p>
      </td>
      <td>
        <input onChange={e=> {debugger; setDiscountDescription(e.currentTarget.value);}}
          type="text"
          id="discount_description"
          name="discountDescription"
          value={discountDescriptionState}
        />
      </td>
      <td>
        <select id="discount_scope" name="discountScope">
          {discountScopeLov.map((x) => (
            <option value={x.discountScopeId}>{x.discountScopeName}</option>
          ))}
          <p></p>
        </select>
      </td>
      <td>
        <p>{currentAdminDiscountRow.firmContact}</p>
      </td>
      <td>
      <input onChange={e=>setValidCitiesState(e.currentTarget.value)}
          type="text"
          id="valid_cities"
          name="validCities"
          value={validCitiesState}
        />
      </td>
    </tr>
  );
}

export default AdminDiscountTableRow;
