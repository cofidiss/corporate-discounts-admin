
import FilterDiscounts from "../FilterDiscounts/FilterDiscounts";
import AdminDiscountTable from "../AdminDiscountTable/AdminDiscountTable";
import React, { useState } from "react";
import {  BrowserRouter,  Routes,  Route,  Link,  useParam,  Outlet,useNavigate  } from "react-router-dom";
function DiscountFilterAndCrud(props){
  console.log("DiscountFilterAndCrud rendred");
  debugger;
  const currentUserState = props.currentUserState;
  const baseUrl = props.baseUrl;
  const setPreloaderShown = props.setPreloaderShown;
  const setMyModal = props.setMyModal;
  const [initTriedState, setInitTried] = useState(false);
  const [initSuccesfullState, setInitSuccesfull] = useState(false);
  const [discountsArrState, setDiscountsArr] = useState([]);
  const [firmLovState, setFirmLov] = useState([]);
  const [discountScopeLovState, setDiscountScopeLov] = useState([]);
  const [discountCategoryLovState, setDiscountCategoryLov] = useState([]);
  
   const navigate = useNavigate();
    if (currentUserState === null || currentUserState.isAdmin=== false){
  debugger;
      navigate("/login");
    }

 if (initTriedState== false){
  Init();
 }
  function Init(){
    setInitTried(true);
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
       
            setFirmLov(x[0]);
            setDiscountCategoryLov(x[1]);
            setDiscountScopeLov(x[2]);
            setInitSuccesfull(true);
      
          }).catch (x => { setInitSuccesfull(false); const modalContent = (<div><p>İndirim Düzenleme Ekranı yüklenemedi</p></div>);
          setMyModal({isOpen:true,content:modalContent});
          })
               .finally(() => {
          setPreloaderShown(false);
        });

  }
 

    return (<div> {initSuccesfullState ?  <div> <FilterDiscounts
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