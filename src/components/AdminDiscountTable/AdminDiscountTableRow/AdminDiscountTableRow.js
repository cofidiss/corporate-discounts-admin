import { useEffect,useState } from "react";
import DiscountUpdateForm from "../../DiscountUpdateForm/DiscountUpdateForm";


function AdminDiscountTableRow(props) {
const  baseUrl=props.baseUrl;
  const firmLov= props.firmLov;
  const discountScopeLov= props.discountScopeLov;
  const discountCategoryLov= props.discountCategoryLov;

  const setPreloaderShown = props.setPreloaderShown;
  const setMyModal = props.setMyModal;
  const discountFromDb = props.discountFromDb;  
const rowId= props.id;

const onUpdateClick = e => {setPreloaderShown(true);
  debugger;
  const modalContent = (<DiscountUpdateForm setMyModal={setMyModal} setPreloaderShown={setPreloaderShown} baseUrl={baseUrl} firmLov={firmLov} 
     discountCategoryLov={discountCategoryLov}  discountScopeLov={discountScopeLov} discountFromDb={discountFromDb}/>);
  setMyModal({isOpen:true,content:modalContent});
  setPreloaderShown(false);
};


const onDeleteClick = e => {};


  return (
    <tr >
      <td>
        <p> 
        {discountFromDb.firmName}
        </p>
      </td>
      <td>
      <p>
        {discountFromDb.discountDescription}</p>
      </td>
      <td>
      <p> 
        {discountFromDb.discountScopeName}
        </p>
      </td>
      <td>
      <p > 
    {discountFromDb.discountCategoryName}
        </p>
      </td>
      <td>
        <p>{discountFromDb.firmContact}</p>  
      </td>
      <td>
        <p><button onClick={onUpdateClick}>Güncelle</button></p>  
      </td>
      <td>
        <p><button onClick={onDeleteClick}>Sil</button></p>  
      </td>
    </tr>
  );
}

export default AdminDiscountTableRow;
