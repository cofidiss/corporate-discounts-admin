import CategoryListTableRow from "./CategoryListTableRow/CategoryListTableRow";
import React, { useState } from "react";
import CategoryAddForm from "../CategoryAddForm/CategoryAddForm";
function CategoryListTable(props) {
  const   setIsInitRun=props.setIsInitRun;
    const baseUrl = props.baseUrl;
    const setPreloaderShown = props.setPreloaderShown;
    const setMyModal = props.setMyModal;
const categoryListFromDb = props.categoryListFromDb;
const categoryLov = props.categoryLov;
const onAdd = e => {


  const modalContent = (
    <CategoryAddForm
      setMyModal={setMyModal}
      setPreloaderShown={setPreloaderShown}
      baseUrl={baseUrl} 
      categoryLov={categoryLov}
    />
  );
  setMyModal({isOpen:true,content:modalContent});


};
  return (
    <div>
      <table>
        <thead>
          <tr>
     
            <th>Kategori Adı</th>
            <th>PArent Kategori Adı</th>
          </tr>
        </thead>
        <tbody>
{categoryListFromDb.map(x=> {return (<CategoryListTableRow  baseUrl={baseUrl}  setMyModal={setMyModal}    categoryLov={categoryLov}
setPreloaderShown={setPreloaderShown} categoryFromDb={x}   setIsInitRun={setIsInitRun}/>);} )}

        </tbody>
      </table>
      <button onClick={onAdd}>ekle</button>
    </div>
  );
}

export default CategoryListTable;
