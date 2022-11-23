
import { click } from '@testing-library/user-event/dist/click';
import React, {useState} from 'react';

function DiscountUpdateForm(props) {
  debugger;
  const  baseUrl=props.baseUrl;  
  const setPreloaderShown = props.setPreloaderShown;
  const setMyModal = props.setMyModal;
    const firmLov = props.firmLov;
    const discountCategoryLov = props.discountCategoryLov;
    const discountScopeLov = props.discountScopeLov;
    const discountFromDb = props.discountFromDb;
  
  
    const [formState, setForm] = useState({
      firmId: discountFromDb.firmId,
      discountInfo: discountFromDb.discountDescription,
      discountScopeId: discountFromDb.discountScopeId,
      discountCategoryId: discountFromDb.discountCategoryId,
      firmContact:discountFromDb.firmContact,
      discountId: discountFromDb.id
    });

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

      const  onUpdateDiscount = (event) => {
debugger;
setPreloaderShown(true);
        const updateDiscountsPromise =    fetch(`${baseUrl}/UpdateDiscounts`,{
          method: 'POST', // or 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(formState)
            })
          .then((response) => {
      if (!response.ok){

     return   response.text().then(x =>Promise.reject(x) );

      
      }
      return response.text(); })
      updateDiscountsPromise.then(x=>{document.getElementById("search-button").click();  setMyModal({isOpen:true,content:x});} ).catch(x=> setMyModal({isOpen:true,content:x})).finally(() => setPreloaderShown(false));

      }
      
  return (
    <div>
      <div>
        <label>Firma Adı:</label>
        <select onChange={onFormChange} value={formState.firmId} name="firm.select">
          {firmLov.map((e) => (
            <option value={e.id}>{e.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label>İndirim Açıklaması:</label>
        <input onChange={onFormChange}
          type="text"
          name="discount.info"
          value={formState.discountInfo}
        ></input>
      </div>

      <div>
        <label>İndirim Kapsamı:</label>
        <select onChange={onFormChange} value={formState.discountScopeId} name="discountScope.select">
          {discountScopeLov.map((e) => (
            <option value={e.id}>{e.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label>İndirim Kategorisi:</label>
        <select onChange={onFormChange}
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
      </div>
      <div>
        <label>Firma Kontak:</label>
        <span>{formState.firmContact}</span>
      </div>
      <button onClick={onUpdateDiscount}>Güncelle</button>
    </div>
  );
}
export default DiscountUpdateForm;
