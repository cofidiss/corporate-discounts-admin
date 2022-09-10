import AdminDiscountTableRow from "../AdminDiscountTableRow/AdminDiscountTableRow";
import React, {useState} from 'react';



function AdminDiscountTable(props){

   const corporateDiscounts=  props.corporateDiscounts;

const discountScopeLov = props.discountScopeLov;


return (
   <div>

  {corporateDiscounts.map( x => (<AdminDiscountTableRow currentAdminDiscountRow={x} discountScopeLov={discountScopeLov} />))}
  </div>
);

}

export default AdminDiscountTable;