import AdminDiscountTableRow from "./AdminDiscountTableRow/AdminDiscountTableRow";
import { useEffect,useState } from "react";
import Preloader from "../Preloader/Preloader";



function AdminDiscountTable(props){
const keySign = props.keySign;
const discountsArr = props.discountsArr;
const firmLov= props.firmLov;
const discountScopeLov= props.discountScopeLov;
const discountCategoryLov= props.discountCategoryLov;
const [isPreloaderShownState,setPreloaderShown] = useState(false);


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

{discountsArr.map(discountFromDb => <AdminDiscountTableRow firmLov={firmLov} key={keySign*discountFromDb.id} discountCategoryLov={discountCategoryLov}  discountScopeLov={discountScopeLov}
 discountFromDb={discountFromDb}

></AdminDiscountTableRow>)}

</tbody>
</table>

    </div>);

}

export default AdminDiscountTable;