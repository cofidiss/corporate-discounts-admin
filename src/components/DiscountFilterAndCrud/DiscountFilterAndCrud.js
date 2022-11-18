
import FilterDiscounts from "../FilterDiscounts/FilterDiscounts";
import AdminDiscountTable from "../AdminDiscountTable/AdminDiscountTable";
import React, { useState } from "react";

function DiscountFilterAndCrud(props){
  console.log("DiscountFilterAndCrud rendred");
  debugger;
  const baseUrl = props.baseUrl;

  const setPreloaderShown = props.setPreloaderShown;
  const setMyModal = props.setMyModal;
  const [initCompletedState, setInitCompleted] = useState(false);
  const [discountsArrState, setDiscountsArr] = useState([]);
  const [firmLovState, setFirmLov] = useState([]);
  const [discountScopeLovState, setDiscountScopeLov] = useState([]);
  const [discountCategoryLovState, setDiscountCategoryLov] = useState([]);
 if (initCompletedState== false){
  Init();
 }
  function Init(){
    setPreloaderShown(true);
    
    const firmLovPromise = fetch(`${baseUrl}/GetFirmLov`, {
        method: "POST", // or 'PUT'
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`hata meydana geldi: Status: ${response.status}`);
        }
        return response.json();
      });
  
      const discountScopeLovPromise = fetch(`${baseUrl}/GetDiscountScopeLov`, {
        method: "POST", // or 'PUT'
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`hata meydana geldi: Status: ${response.status}`);
        }
        return response.json();
      });
  
      const discountCategoryLovPromise = fetch(
        `${baseUrl}/GetDiscountCategoryLov`,
        {
          method: "POST", // or 'PUT'
        }
      ).then((response) => {
        if (!response.ok) {
          throw new Error(`hata meydana geldi: Status: ${response.status}`);
        }
        return response.json();
      });

      Promise.all([
        firmLovPromise,
        discountCategoryLovPromise,
        discountScopeLovPromise
      ])
        .then(
          (x) => {
            setInitCompleted(true);
            setFirmLov(x[0]);
            setDiscountCategoryLov(x[1]);
            setDiscountScopeLov(x[2]);
      
          },
          (x) => {
            setInitCompleted(false);
          }
        )
        .finally(() => {
          setPreloaderShown(false);
        });

  }
 

    return (<div> {initCompletedState ?  <div> <FilterDiscounts
      baseUrl={baseUrl}
            firmLov={firmLovState}
            discountScopeLov={discountScopeLovState}
            discountCategoryLov={discountCategoryLovState}
            setDiscounts={setDiscountsArr}
    />
    <AdminDiscountTable
     baseUrl={baseUrl}
     setPreloaderShown={setPreloaderShown}
     firmLov={firmLovState}
     discountScopeLov={discountScopeLovState}
     discountsArr={discountsArrState}
     setMyModal={setMyModal}
     discountCategoryLov={discountCategoryLovState}
    /></div>  : null}


    </div>)
}

export default DiscountFilterAndCrud;