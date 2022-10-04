import AdminDiscountTableRow from "./AdminDiscountTableRow/AdminDiscountTableRow";
import { useEffect,useState } from "react";
import Preloader from "../Preloader/Preloader";



function AdminDiscountTable(props){

const discountsArr = props.discountsArr;
const baseUrl = props.baseUrl;
const [firmLovState,setFirmLov] =   useState([]);
const [readyToRenderState,setReadyToRender] =   useState(false);
const [discountScopeLovState,setDiscountScopeLov] =   useState([]);
const [discountCategoryLovState,setDiscountCategoryLov] =   useState([]);
const [isInitCompletedState,setInitCompleted] = useState(false);
const [isInitRunState,setInitRun] = useState(false);
const [isPreloaderShownState,setPreloaderShown] = useState(true);

function Init(){

    const firmLovPromise =    fetch(`${baseUrl}/FirmLov`, {
        method: 'POST', // or 'PUT'
          })
        .then((response) => {
    if (!response.ok){
    throw new Error(`hata meydana geldi: Status: ${response.status}`)
    
    }
    return response.json(); })
    
    
    const discountScopeLovPromise =    fetch(`${baseUrl}/DiscountScopeLov`, {
    method: 'POST', // or 'PUT'
      })
    .then((response) => {
    if (!response.ok){
    throw new Error(`hata meydana geldi: Status: ${response.status}`)
    
    }
    return response.json(); })
    
    
    
    const discountCategoryLovPromise =    fetch(`${baseUrl}/DiscountCategoryLov`, {
    method: 'POST', // or 'PUT'
      })
    .then((response) => {
    if (!response.ok){
    throw new Error(`hata meydana geldi: Status: ${response.status}`)
    
    }
    return response.json(); })
    
    Promise.all([firmLovPromise,discountCategoryLovPromise,discountScopeLovPromise]).then(x=>{
    setFirmLov(x[0]);
    setDiscountCategoryLov(x[1]);
    setDiscountScopeLov(x[2]);
    setInitCompleted(true);
    
    
    },x=> {
    
      setInitCompleted(false);
    }).finally(() => {
    setPreloaderShown(false);
    
    })
    
}

if (!isInitRunState){   
    Init();
    setInitRun(true);
}

    return (<div>
<h1> İndirim Düzenleme</h1>

<table>
<thead>
<tr> 
<th> Firma Adı</th>
<th>indirim açıklaması </th>
<th> indirim kapsamı</th>

<th> inidirim kategorisi</th>

<th>firma kontak</th>


</tr>

</thead>
<tbody>

{discountsArr.map(discountFromDb => <AdminDiscountTableRow firmLov={firmLovState} discountCategoryLov={discountCategoryLovState}  discountScopeLov={discountScopeLovState}
 discountFromDb={discountFromDb}

></AdminDiscountTableRow>)}

</tbody>
</table>

    </div>);

}

export default AdminDiscountTable;