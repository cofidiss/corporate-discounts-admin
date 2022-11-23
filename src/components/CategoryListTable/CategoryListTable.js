import CategoryListTableRow from "./CategoryListTableRow/CategoryListTableRow";
import React, { useState } from "react";
import CategoryAddForm from "../CategoryAddForm/CategoryAddForm";
function CategoryListTable(props) {
  debugger;
  const [initTriedState, setInitTried] = useState(false);
  const [initSuccesfullState, setInitSuccesfull] = useState(false);
  const [discountCategoryLovState, setDiscountCategoryLov] = useState([]);
  const [categoryListFromDbState, setCategoryListFromDb] = useState([]);
  const baseUrl = props.baseUrl;
  const setPreloaderShown = props.setPreloaderShown;
  const setMyModal = props.setMyModal;

  function Init() {
    setPreloaderShown(true);
    setInitTried(true);
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

    Promise.all([ categoryListFromDbPromise,discountCategoryLovPromise])
      .then(
        (x) => {
          debugger;
          
          setCategoryListFromDb(x[0]);
          setDiscountCategoryLov(x[1]);
          setInitSuccesfull(true);
        }).catch (x => { setInitSuccesfull(false); const modalContent = (<div><p>Kategori Düzenleme Ekranı yüklenemedi</p></div>);
        setMyModal({isOpen:true,content:modalContent});
        })      
      .finally(() => {
        setPreloaderShown(false);
      });
  }

  if (initTriedState == false) {
    Init();
  }
  const onAdd = (e) => {
    const modalContent = (
      <CategoryAddForm
      setInitTried={setInitTried}
        setMyModal={setMyModal}
        setPreloaderShown={setPreloaderShown}
        baseUrl={baseUrl}
        categoryLov={discountCategoryLovState}
      />
    );
    setMyModal({ isOpen: true, content: modalContent });
  };
  return (
    <div>
      {" "}
      {initSuccesfullState ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>Kategori Adı</th>
                <th>PArent Kategori Adı</th>
              </tr>
            </thead>
            <tbody>
              {categoryListFromDbState.map((x) => {
                return (
                  <CategoryListTableRow
                    baseUrl={baseUrl}
                    setMyModal={setMyModal}
                    categoryLov={discountCategoryLovState}
                    setPreloaderShown={setPreloaderShown}
                    categoryFromDb={x}          
                    setInitTried={setInitTried}
                  />
                );
              })}
            </tbody>
          </table>
          <button onClick={onAdd}>ekle</button>
        </div>
      ) : null}
    </div>
  );
}

export default CategoryListTable;
