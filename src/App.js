import AdminDiscountTable from "./components/AdminDiscountTable/AdminDiscountTable";

import React, {useState} from 'react';

function App() {
  const baseUrl="http://localhost:5103";
  const [discountScopeLovState,setDiscountScopeLov] = useState(null);

  const [discountsArrState, setDiscountsArr] = useState(null);
  const [isInitRunState, setIsInitRun] = useState(false);
  const [initHasErrorState, setInitHasError] = useState(false);
  const [firmSelectLovState, setFirmSelectLov] = useState(null);
  

  function InitPage(){

    const getDiscountScopeLovPromise =  fetch(baseUrl + '/GetDiscountScopeLov',{
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
    })
      .then((response) =>{
        if (response.status !== 200){
          throw new Error(`HTTP error! Status: ${response.status}`);
    
        }
    
       return response.json(); 
      } );
      const getAllDiscountsPromise = 
      fetch(baseUrl + '/GetAllDiscounts', {
        method: 'POST', // or 'PUT'
       
       
      })
        .then((response) => {
          if (response.status !== 200){
            throw new Error(`HTTP error! Status: ${response.status}`);
      
          }
      
         return response.json(); 
        });
        const getFirmSelectLov =  fetch(baseUrl + '/FirmSelectLov',{
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(),
        })
          .then((response) =>{
            if (response.status !== 200){
              throw new Error(`HTTP error! Status: ${response.status}`);
        
            }
        
           return response.json(); 
          } );
       
      Promise.all([getAllDiscountsPromise,getDiscountScopeLovPromise,getFirmSelectLov]).then(results=> {
        console.log(results);
        setDiscountScopeLov(results[1]);
        setDiscountsArr(results[0]);
        setFirmSelectLov(results[2]);

        setInitHasError(false);
    
   
      }).catch(error=>{
        console.log("hata" + error);
  
    
        setInitHasError(true);
    
    
    
      }).finally(()=> {setIsInitRun(true);});
    
    
    }
let renderedElement;
    if (isInitRunState=== false){
      InitPage();        
     return (<div> yeni açıldı</div>)  ;
    }
  return (
    <div >
  <AdminDiscountTable baseUrl={baseUrl} firmLov={firmSelectLovState} corporateDiscounts={discountsArrState}  discountScopeLov={discountScopeLovState}/>
    </div>
  );
}
  
export default App;
