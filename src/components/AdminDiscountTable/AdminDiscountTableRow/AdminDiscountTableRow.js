import { useEffect,useState } from "react";

function AdminDiscountTableRow(props) {
  const firmLov = props.firmLov;
  const discountCategoryLov = props.discountCategoryLov;
  const discountScopeLov = props.discountScopeLov;
  const discountFromDb = props.discountFromDb;


  const [formState, setForm] = useState({
    firmId: discountFromDb.firmId,
    discountDescription: discountFromDb.discountDescription,
    discountScopeId: discountFromDb.discountScopeId,
    discountCategoryId: discountFromDb.discountCategoryId,
    firmContact:discountFromDb.firmContact
  });

//   useEffect(() => {
//     for (firmContact of firmContactLov){
  
// if (formState.firmId === firmContact.firmId){


// }
//     }
    



  const onFormChange = (e) => {
    if (e.target.getAttribute("name") === "firm.select") {
  
let firmContact ="firma kontak bulunamadı";
let selectedFirmId =  parseInt(e.target.value);
        for (let firm of firmLov){
if(firm.id === selectedFirmId){

  firmContact= firm.contactInfo;

}       }

      setForm((prevState) => {
        return { ...prevState, firmId: selectedFirmId,firmContact:firmContact };
      });
    }

    if (e.target.getAttribute("name") === "discount.info") {
      setForm((prevState) => {
        return { ...prevState, discountInfo: e.target.value };
      });
    }

    if (e.target.getAttribute("name") === "discountScope.select") {
      let selectedDiscountScopeId =  parseInt(e.target.value);
      setForm((prevState) => {
        return { ...prevState, discountScopeId: selectedDiscountScopeId };
      });
    }

    if (e.target.getAttribute("name") === "discountCategory.select") {
      let selectedDiscountCategoryId =  parseInt(e.target.value);
      setForm((prevState) => {
        return { ...prevState, discountCategoryId: selectedDiscountCategoryId};
      });
    }
  };

  return (
    <tr onChange={onFormChange}>
      <td>
        <select value={formState.firmId} name="firm.select">
          {firmLov.map((e) => (
            <option value={e.id}>{e.name}</option>
          ))}
        </select>
      </td>
      <td>
        <input type="text" name="discount.info" value={formState.discountDescription}>
      
        </input>
      </td>
      <td>
        <select value={formState.discountScopeId} name="discountScope.select">
          {discountScopeLov.map((e) => (
            <option value={e.id}>{e.name}</option>
          ))}
        </select>
      </td>
      <td>
        <select
          value={formState.discountCategoryId}
          name="discountCategory.select"
        >
          {discountCategoryLov.map((x) => {
            return (
              <option className={"level-" + x.levelNo} value={x.id}>
                {x.name}
              </option>
            );
          })}
        </select>
      </td>
      <td>
        <p name="firm.contact">{formState.firmContact}</p>  
      </td>
    </tr>
  );
}

export default AdminDiscountTableRow;
