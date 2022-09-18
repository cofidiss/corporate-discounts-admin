
import React, {useState} from 'react';
import PreLoader from  "../PreLoader/PreLoader";
import MyModal from  "../MyModal/MyModal";
import AdminEditFirmTableRow from '../AdminEditFirmTableRow/AdminEditFirmTableRow';
import AdminInsertedFirmRow from "../AdminInsertedFirmRow/AdminInsertedFirmRow";


function AdminEditFirmTable(props){

    const baseUrl = props.baseUrl;
   const firmArr =  props.firmArr;
   const [firmArrState,setfirmArr] = useState([]);
   const [insertedRowKeyState,setInsertedRowKey] = useState(0);
const [isInitRunState,setInitRun] = useState(false);
const [isPreLoaderShownState,setIsPreLoaderShown] = useState(false);
const [isInitHasErrorState,setInitHasError] = useState(false);
const [isSaveHasErrorState,setSaveHasError] = useState(false);


const onAddClick = e => {

  setInsertedRowKey(prevState => (prevState+1));

};

const onSaveClick = e => { 
    setIsPreLoaderShown(true);
    
       var adminTable = document.getElementById("firms-table");
     var trs = adminTable.querySelector("tbody").querySelectorAll("tr");
    
    let updatedRowArr =[];
    let insertedRowArr =[];
    let deletedRowArr =[];
  
     trs.forEach(element => {
       if (element.getAttribute("rowState")==="updated"){
         let firmId =  element.getAttribute("id");
         firmId =  parseInt(firmId);
         let firmName=  element.querySelector("#firmName").value;
         let firmContact =  element.querySelector("#firmContact").value;
         
    
    let updatedRow = {firmId:firmId,firmName:firmName,firmContact:firmContact    
    };
    updatedRowArr.push(updatedRow);
    
       }
       if(element.getAttribute("rowState")==="inserted"){
  
        let firmName=  element.querySelector("#firmName").value;
        let firmContact =  element.querySelector("#firmContact").value;
        
   
   let insertedRow = {firmName:firmName,firmContact:firmContact    
   };
       insertedRowArr.push(insertedRow);
       }
  
       if(element.getAttribute("rowState")==="deleted"){    
       deletedRowArr.push( parseInt(element.getAttribute("id")));
       }
    });
    console.log("updatedRowArr");
    console.log(updatedRowArr);
  
    console.log("insertedRowArr");
    console.log(insertedRowArr);
  
    console.log("deletedRowArr");
    console.log(deletedRowArr);
  
  
  
  
  
    
    const savePromise = fetch(baseUrl + '/SaveFirms',{
       method: 'POST', // or 'PUT'
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({updatedFirmRows:updatedRowArr,insertedFirmRows:insertedRowArr,deletedFirmRows:deletedRowArr}),
     })
       .then  ((response) =>{
         if (response.status !== 200){
           throw new Error(`HTTP error! Status: ${response.status}`);
     
         }
     
        return response.text(); 
       } );
       savePromise.then(x=>{setSaveHasError(false);}).catch(x=>setSaveHasError(true)).finally(x=> setIsPreLoaderShown(false))
     
    
     };
  

function Init(){
    const getFirmsPromise =  fetch(baseUrl + '/GetFirms',{
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
        getFirmsPromise.then(e => setfirmArr(e)).catch(x=> setInitHasError(true)).finally(x=>setInitRun(true) );

}
if (isInitRunState=== false){
    Init();
return (<PreLoader></PreLoader>);
}
 if (isInitHasErrorState){
    return (<MyModal>"Hata oldu tekrar deneyiniz"</MyModal>);



 }

 let insertedRowsElement=[];
 for (let i=0;i<insertedRowKeyState;++i){

  insertedRowsElement.push(<AdminInsertedFirmRow key={i+1}/>);
 }
    return (

        <div>
            {isPreLoaderShownState === true? <PreLoader></PreLoader>: null}
            {isSaveHasErrorState === true ? <MyModal>"firma kaydetmede hata oldu"</MyModal>: null}
            
            <h1>firma düzenleme</h1>
<table id="firms-table">
<thead>
<tr>
<th>Firma Id</th>
<th>Firma Adı</th>
<th>Firma Kontak</th>


</tr>

</thead>

<tbody>
{firmArrState.map(e => <AdminEditFirmTableRow firmId={e.id} firmName={e.name} firmContact={e.contactInfo}></AdminEditFirmTableRow>)}
{insertedRowsElement}
</tbody>

</table>
   <button onClick={onSaveClick}>Kaydet</button>

   <button onClick={onAddClick}>ekle</button>

        </div>


    );



}

export default AdminEditFirmTable;