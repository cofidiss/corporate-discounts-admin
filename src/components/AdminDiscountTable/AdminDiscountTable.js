import AdminDiscountTableRow from "../AdminDiscountTableRow/AdminDiscountTableRow";
import React, {useState} from 'react';
import PreLoader from  "../PreLoader/PreLoader";
import MyModal from  "../MyModal/MyModal";
import AdminInsertedDiscountRow from "../AdminInsertedDiscountRow/AdminInsertedDiscountRow";


function AdminDiscountTable(props){
  debugger;
   const baseUrl = props.baseUrl;
   const firmLov = props.firmLov;
   const corporateDiscounts=  props.corporateDiscounts;
   const [corporateDiscountsState,setCorporateDiscounts] = useState(corporateDiscounts);
const discountScopeLov = props.discountScopeLov;
const [insertedRowsState,setinsertedRows] = useState([]);
const [myModalState,setMyModalState] = useState({isMyModalShown:false,myModalContent:""});
const [isPreLoaderShownState,setIsPreLoaderShown] = useState(false);

const onAddClick = event =>{


  

  setinsertedRows(prevState => {return [...prevState,-Math.floor(Math.random() * 101)];});
};

const onSaveClick = e => { 
  setIsPreLoaderShown(true);
  
     var adminTable = document.getElementById("admin-table");
   var trs = adminTable.querySelector("tbody").querySelectorAll("tr");
  
  let updatedRowArr =[];
  
   trs.forEach(element => {
     if (element.getAttribute("rowState")==="updated"){
       let discountid =  element.getAttribute("discountid");
       let discount_info=  element.querySelector("#discount_description").value;
       let valid_cities =  element.querySelector("#valid_cities").value;
       let discount_scope =  element.querySelector("#discount_scope").value;
  
  let updatedRow = {discountId:discountid,discountInfo:discount_info,validCities:valid_cities,
     discountScopeId:discount_scope
  };
  updatedRowArr.push(updatedRow);
  
     }
  });
  console.log("updatedRowArr");
  console.log(updatedRowArr);
  
  const savePromise = fetch(baseUrl + '/SaveDiscounts',{
     method: 'POST', // or 'PUT'
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(updatedRowArr),
   })
     .then  ((response) =>{
       if (response.status !== 200){
         throw new Error(`HTTP error! Status: ${response.status}`);
   
       }
   
      return response.text(); 
     } );
     savePromise.then(x=>{debugger;setMyModalState({isMyModalShown:true,myModalContent:"Kaydedildi"});}).catch(x=>{debugger;console.log("error" + x);setMyModalState({isMyModalShown:true,myModalContent:<p>Hata meydana geldi</p>});}).finally(x=> setIsPreLoaderShown(false))
   
  
   };

return (
   <div>
      {isPreLoaderShownState ? <PreLoader/> :null}
      {myModalState.isMyModalShown ? <MyModal isOpen={true} closeModal={x=>setMyModalState({isMyModalShown:false,myModalContent:""})}>{myModalState.myModalContent}</MyModal> :null}
<table id="admin-table"> 

   <thead>
   <tr> <th>Firma Adı</th> 
<th>İndirim Orani</th>
<th>İndirim Kapsami</th>
<th>Firma Kontak</th>
<th>Geçerli Şehirler</th>
<th>Sil</th>
</tr>

   </thead> 
     <tbody>   {corporateDiscountsState.map( x => (<AdminDiscountTableRow rowState={"unchanged"} key={x.discountId} currentAdminDiscountRow={x} discountScopeLov={discountScopeLov} />))}
     {insertedRowsState.map( x => (<AdminInsertedDiscountRow rowState={"inserted"} firmLov={firmLov} key={x} discountScopeLov={discountScopeLov} />))}
     </tbody>
</table>
 <button onClick={onSaveClick}>  Kaydet</button>
 <button onClick={onAddClick}>  Ekle</button>
  </div>
);

}

export default AdminDiscountTable;