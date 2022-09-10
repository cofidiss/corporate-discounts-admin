import AdminDiscountTable from "./components/AdminDiscountTable/AdminDiscountTable";

import React, {useState} from 'react';

function App() {
  const baseUrl="http://localhost:5103";
  const [discountScopeLovState,setDiscountScopeLovState] = useState(null);

  const [discountsArrState, setDiscountsArrState] = useState(null);
  const [isInitRunState, setIsInitRun] = useState(false);
  const [initHasErrorState, setInitHasError] = useState(false);


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
    
       
      Promise.all([getAllDiscountsPromise,getDiscountScopeLovPromise]).then(results=> {
        console.log(results);
        setDiscountScopeLovState(results[1]);
        setDiscountsArrState(results[0]);
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
  <AdminDiscountTable corporateDiscounts={discountsArrState}  discountScopeLov={discountScopeLovState}/>
    </div>
  );
}

export default App;
