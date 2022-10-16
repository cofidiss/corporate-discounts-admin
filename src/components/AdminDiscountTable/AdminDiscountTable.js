import AdminDiscountTableRow from "./AdminDiscountTableRow/AdminDiscountTableRow";
import { useEffect,useState } from "react";




function AdminDiscountTable(props){
const setPreloaderShown = props.setPreloaderShown;
const setMyModal = props.setMyModal;
const baseUrl = props.baseUrl;
const discountsArr = props.discountsArr;
const firmLov= props.firmLov;
const discountScopeLov= props.discountScopeLov;
const discountCategoryLov= props.discountCategoryLov;

 
    return (<div>
<h1 style={{textAlign:'center'}}> İndirim Düzenleme</h1>

<table style={{textAlign:'center',width:"100%"}}>
<thead>
<tr> 
<th> Firma Adı</th>
<th>indirim açıklaması </th>
<th> indirim kapsamı</th>

<th> inidirim kategorisi</th>

<th>firma kontak</th>

<th> Güncelle</th>

<th>Sil</th>
</tr>

</thead>
<tbody>

{discountsArr.map(discountFromDb => <AdminDiscountTableRow baseUrl={baseUrl} setMyModal={setMyModal} setPreloaderShown={setPreloaderShown}  firmLov={firmLov}  discountCategoryLov={discountCategoryLov}  discountScopeLov={discountScopeLov}
 discountFromDb={discountFromDb}

></AdminDiscountTableRow>)}

</tbody>
</table>

    </div>);

}

export default AdminDiscountTable;