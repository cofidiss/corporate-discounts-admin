import { useEffect,useState } from "react";

function AdminDiscountTableRow(props) {
  const firmLov = props.firmLov;
  const discountCategoryLov = props.discountCategoryLov;
  const discountScopeLov = props.discountScopeLov;
  const discountFromDb = props.discountFromDb;


  const [formState, setForm] = useState({
    firmId: discountFromDb.firmId,
    discountInfo: discountFromDb.discountInfo,
    discountScopeId: discountFromDb.discountScopeId,
    discountCategoryId: discountFromDb.categoryId,
    firmContact:discountFromDb.firmContact
  });

//   useEffect(() => {
//     for (firmContact of firmContactLov){
  
// if (formState.firmId === firmContact.firmId){


// }
//     }
    



  const onFormChange = (e) => {
    if (e.target.getAttribute("name") === "firm.select") {
let formContact ="";
        for (let firm in firmLov){
if(firm.id === e.target.value){

    formContact= firm.firmContact;

}

        }

      setForm((prevState) => {
        return { ...prevState, firmId: e.target.value,formContact:formContact };
      });
    }

    if (e.target.getAttribute("name") === "discount.info") {
      setForm((prevState) => {
        return { ...prevState, discountInfo: e.target.value };
      });
    }

    if (e.target.getAttribute("name") === "discountScope.select") {
      setForm((prevState) => {
        return { ...prevState, discountScopeId: e.target.value };
      });
    }

    if (e.target.getAttribute("name") === "discountCategory.select") {
      setForm((prevState) => {
        return { ...prevState, discountCategoryId: e.target.value };
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
        <input type="text" name="discount.info">
          {formState.discountInfo}
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
        <p name="firm.contact">{formState.formContact}</p>
      </td>
    </tr>
  );
}

export default AdminDiscountTableRow;
