import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Preloader from "./components/Preloader/Preloader";
import FilterDiscounts from "./components/FilterDiscounts/FilterDiscounts";
import AdminDiscountTable from "./components/AdminDiscountTable/AdminDiscountTable";
import reportWebVitals from "./reportWebVitals";
import MyModal from "./components/MyModal/MyModal";
import {
  ProSidebarProvider,
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParam,
  Outlet,
  useNavigate,
} from "react-router-dom";
import DiscountFilterAndCrud from "./components/DiscountFilterAndCrud/DiscountFilterAndCrud";
import CategoryListTable from "./components/CategoryListTable/CategoryListTable";
import FirmListTable from "./components/FirmListTable/FirmListTable";
import Login from "./components/Login/Login";
import TopBar from "./components/TopBar/TopBar";
import ConditionalRoute from "./components/ConditionalRoute/ConditionalRoute";
import SignUp from "./components/SignUp/S ignUp";
function AppTest(props) {
  debugger;
  const [a, b] = useState(Date.now());
  console.log("a" +a);
  const [isCurrentUserAskedState, setcurrentUserAsked] = useState(false);
  const [currentUserState, setCurrentUser] = useState(null);
  const [isPreloaderShownState, setPreloaderShown] = useState(false);
  let baseUrl = "https://localhost:44377/api/CorporateDiscountsAdmin";
  const [myModalState, setMyModal] = useState({
    isOpen: false,
    content: null,
  });

  function GetUserInfo() {
    setcurrentUserAsked(true);
    setPreloaderShown(true);
    const getUserInfoPromise = fetch(`${baseUrl}/GetUserInfo`, {
      method: "POST", // or 'PUT'
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`hata meydana geldi: Status: ${response.status}`);
      }
      return response.json();
    });
    getUserInfoPromise
      .then((x) => setCurrentUser({ userName: x.userName, isAdmin: x.isAdmin ,userId:x.userId}))
      .finally(() => setPreloaderShown(false));
  }

  if (isCurrentUserAskedState === false) {
    GetUserInfo();
  }
  return (
    <BrowserRouter>
      <Preloader isShown={isPreloaderShownState}></Preloader>
      <MyModal
        closeModal={(e) => {
          setMyModal({ isOpen: false, content: null });
        }}
        isOpen={myModalState.isOpen}
      >
        {myModalState.content}
      </MyModal>

  
      <Routes>
        <Route
          path="/login/:prevPage"
          element={
            <Login
              baseUrl={baseUrl}
              setPreloaderShown={setPreloaderShown}
              setMyModal={setMyModal}
              setCurrentUser={setCurrentUser}
              setcurrentUserAsked = {setcurrentUserAsked}
            />
          }
        ></Route>

        <Route
          path="/"
          element={
            <ConditionalRoute currentUserState={currentUserState}       baseUrl={baseUrl}>
                baseUrl={baseUrl}
              <DiscountFilterAndCrud
                baseUrl={baseUrl}
                setPreloaderShown={setPreloaderShown}
                setMyModal={setMyModal}
                currentUserState={currentUserState}
              />
            </ConditionalRoute>
          }
        ></Route>
        <Route
          path="/kategoriDuzenle"
          element={
            <ConditionalRoute currentUserState={currentUserState}       baseUrl={baseUrl}>
                  
              <CategoryListTable
                baseUrl={baseUrl}
                setPreloaderShown={setPreloaderShown}
                setMyModal={setMyModal}
              />
            </ConditionalRoute>
          }
        ></Route>
        <Route
          path="/firmaDuzenle"
          element={
            <ConditionalRoute currentUserState={currentUserState}    baseUrl={baseUrl}>
                     
              <FirmListTable
                baseUrl={baseUrl}
                setPreloaderShown={setPreloaderShown}
                setMyModal={setMyModal}
              />
            </ConditionalRoute>
          }
        ></Route>
              <Route
          path="/signUp"
          element={     
                     
              <SignUp
                baseUrl={baseUrl}
                setPreloaderShown={setPreloaderShown}
                setMyModal={setMyModal}
              />
      
          }
        ></Route>
      </Routes>
      {/* {(isAdminState=== true && currentUserState!== null) ? (<div>        <TopBar userName={currentUserState.userName}/> 
    <ProSidebarProvider>

        <div style={{ display: "flex", height: "100%" }}>
 
          <Sidebar>
            <Menu>
              <MenuItem routerLink={<Link to="/indirimduzenle" />}>
                {" "}
                indirim düzenleme
              </MenuItem>
              <MenuItem routerLink={<Link to="/kategoriDuzenle" />}>
                {" "}
                Kategörü düzenleme
              </MenuItem>
              <MenuItem routerLink={<Link to="/firmaDuzenle" />}>
                Firma Düzenleme
              </MenuItem>
            </Menu>
          </Sidebar>
          <main>
            <Routes>
              <Route
                path="/indirimduzenle"
                element={
                  <DiscountFilterAndCrud
                    baseUrl={baseUrl}
                    setPreloaderShown={setPreloaderShown}
                    setMyModal={setMyModal}
                 
                  />
                }
              />

              <Route path="/kategoriDuzenle" element={<CategoryListTable 
                 baseUrl={baseUrl}
                 setPreloaderShown={setPreloaderShown}
                 setMyModal={setMyModal}
              />} />
              <Route path="/firmaDuzenle" element={<FirmListTable 
                 baseUrl={baseUrl}
                 setPreloaderShown={setPreloaderShown}
                 setMyModal={setMyModal}
              />} />
            </Routes>
          </main>
        </div>
      
      </ProSidebarProvider></div>):(         
             
              
                  <Login
                    baseUrl={baseUrl}
                    setPreloaderShown={setPreloaderShown}
                    setMyModal={setMyModal}            
                    setIsAdminAsked =  {setIsAdminAsked}  
                  />
                
           
          
           )} */}
    </BrowserRouter>
  );
}
export default AppTest;
