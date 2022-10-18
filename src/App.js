import React, { useState } from "react";
import AdminDiscountTable from "./components/AdminDiscountTable/AdminDiscountTable";
import Preloader from "./components/Preloader/Preloader";
import FilterDiscounts from "./components/FilterDiscounts/FilterDiscounts";
import MyModal from "./components/MyModal/MyModal";

function App() {
  const baseUrl = "http://localhost:5103/api/CorporateDiscountsAdmin";
  const [isPreloaderShownState, setPreloaderShown] = useState(true);
  const [discountsArrState, setDiscountsArr] = useState([]);
  const [initCompletedState, setInitCompleted] = useState(false);
  const [firmLovState, setFirmLov] = useState([]);
  const [discountScopeLovState, setDiscountScopeLov] = useState([]);
  const [discountCategoryLovState, setDiscountCategoryLov] = useState([]);
  const [discountArrState, setDiscountArrState] = useState([]);
  const [isInitRunState, setIsInitRun] = useState(false);
  const [myModalState, setMyModalState] = useState({
    isOpen: false,
    content: null,
  });
  function Init() {
    const firmLovPromise = fetch(`${baseUrl}/GetFirmLov`, {
      method: "POST", // or 'PUT'
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`hata meydana geldi: Status: ${response.status}`);
      }
      return response.json();
    });

    const discountScopeLovPromise = fetch(`${baseUrl}/GetDiscountScopeLov`, {
      method: "POST", // or 'PUT'
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`hata meydana geldi: Status: ${response.status}`);
      }
      return response.json();
    });

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

    Promise.all([
      firmLovPromise,
      discountCategoryLovPromise,
      discountScopeLovPromise,
    ])
      .then(
        (x) => {
          setFirmLov(x[0]);
          setDiscountCategoryLov(x[1]);
          setDiscountScopeLov(x[2]);
          setInitCompleted(true);
        },
        (x) => {
          setInitCompleted(false);
        }
      )
      .finally(() => {
        setPreloaderShown(false);
      });
  }

  if (!isInitRunState) {
    Init();
    setIsInitRun(true);
  }

  return (
    <div>
      <MyModal
        closeModal={(e) => {
          setMyModalState({ isOpen: false, content: null });
        }}
        isOpen={myModalState.isOpen}
      >
        {myModalState.content}
      </MyModal>
      <Preloader isShown={isPreloaderShownState}></Preloader>
      {initCompletedState ? (
        <div>
          {" "}
          <FilterDiscounts
            baseUrl={baseUrl}
            firmLov={firmLovState}
            discountScopeLov={discountScopeLovState}
            discountCategoryLov={discountCategoryLovState}
            setDiscounts={setDiscountsArr}
          ></FilterDiscounts>
          <AdminDiscountTable
            baseUrl={baseUrl}
            setPreloaderShown={setPreloaderShown}
            firmLov={firmLovState}
            discountScopeLov={discountScopeLovState}
            discountsArr={discountsArrState}
            setMyModal={setMyModalState}
            discountCategoryLov={discountCategoryLovState}
          ></AdminDiscountTable>{" "}
        </div>
      ) : null}
    </div>
  );
}

export default App;
