import CategoryListTableRow from "./CategoryListTableRow/CategoryListTableRow";
import React, { useState } from "react";
import CategoryAddForm from "../CategoryAddForm/CategoryAddForm";
function CategoryListTable(props) {
  
  debugger;
  const [initCompletedState, setInitCompleted] = useState(false);
  const [discountCategoryLovState, setDiscountCategoryLov] = useState([]);
  const [categoryListFromDbState, setCategoryListFromDb] = useState([]);

  const   setIsInitRun=props.setIsInitRun;
    const baseUrl = props.baseUrl;
    const setPreloaderShown = props.setPreloaderShown;
    const setMyModal = props.setMyModal;
const categoryListFromDb = props.categoryListFromDb;
const categoryLov = props.categoryLov;

function Init(){
  setPreloaderShown(true);
  const discountCategoryLovPromise = fetch(
    `${baseUrl}/GetDiscountCategoryLov`,
    {
      method: "POST", // or 'PUT'
    }
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`hata meydana geldi: Status: ${response.status}`);
    }
    return response.json();
  });
  const categoryListFromDbPromise = fetch(`${baseUrl}/GetCategories`, {
    method: "POST", // or 'PUT'
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`hata meydana geldi: Status: ${response.status}`);
    }
    return response.json();
  });

  
  Promise.all([
    discountCategoryLovPromise,
    categoryListFromDbPromise
  ])
    .then(
      (x) => {
        setInitCompleted(true);    
        setCategoryListFromDb(x[1]);
        setDiscountCategoryLov(x[2]);
  
      },
      (x) => {
        setInitCompleted(false);
      }
    )
    .finally(() => {
      setPreloaderShown(false);
    });


}

if(initCompletedState == false){

Init();
}
const onAdd = e => {


  const modalContent = (
    <CategoryAddForm

      setMyModal={setMyModal}
      setPreloaderShown={setPreloaderShown}
      baseUrl={baseUrl} 
      categoryLov={discountCategoryLovState}
    />
  );
  setMyModal({isOpen:true,content:modalContent});


};
  return (<div> {initCompletedState ? (   <div>
    <table>
      <thead>
        <tr>
   
          <th>Kategori Adı</th>
          <th>PArent Kategori Adı</th>
        </tr>
      </thead>
      <tbody>
{categoryListFromDbState.map(x=> {return (<CategoryListTableRow  baseUrl={baseUrl}  setMyModal={setMyModal}    categoryLov={discountCategoryLovState}
setPreloaderShown={setPreloaderShown} categoryFromDb={x}   setIsInitRun={setIsInitRun} 
setDiscountCategoryLov={setDiscountCategoryLov}/>);} )}

      </tbody>
    </table>
    <button onClick={onAdd}>ekle</button>
  </div>): null}</div>
 
  );
}

export default CategoryListTable;
