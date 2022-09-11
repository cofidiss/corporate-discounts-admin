import AdminDiscountTableRow from "../AdminDiscountTableRow/AdminDiscountTableRow";
import React, {useState} from 'react';



function AdminDiscountTable(props){

   const corporateDiscounts=  props.corporateDiscounts;

const discountScopeLov = props.discountScopeLov;
const [updatedRowsState,setUpdatedRows] = useState([]);

return (
   <div>
<table id="admin-table"> 

   <thead>
   <tr> <th>Firma Adı</th> 
<th>İndirim Orani</th>
<th>İndirim Kapsami</th>
<th>Firma Kontak</th>
<th>Geçerli Şehirler</th>
</tr>

   </thead> 
     <tbody>   {corporateDiscounts.map( x => (<AdminDiscountTableRow setUpdatedRows={setUpdatedRows} currentAdminDiscountRow={x} discountScopeLov={discountScopeLov} />))}</tbody>
</table>
 <button onClick={e => {
   var adminTable = document.getElementById("admin-table");
 var trs = adminTable.querySelector("tbody").querySelectorAll("tr");
 trs.forEach(element => {
   if (element.getAttribute("isrowupdated")){


   }
});


 }}>  Kaydet</button>
  </div>
);

}

export default AdminDiscountTable;