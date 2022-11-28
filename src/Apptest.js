import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Preloader from "./components/Preloader/Preloader";
import FilterDiscounts from "./components/FilterDiscounts/FilterDiscounts";
import AdminDiscountTable from "./components/AdminDiscountTable/AdminDiscountTable";
import reportWebVitals from "./reportWebVitals";
import MyModal from "./components/MyModal/MyModal";
import {ProSidebarProvider,  Sidebar,
  Menu,  MenuItem,  SubMenu,  useProSidebar,} from "react-pro-sidebar";
import {  BrowserRouter,  Routes,  Route,  Link,  useParam,  Outlet,} from "react-router-dom";
import DiscountFilterAndCrud from "./components/DiscountFilterAndCrud/DiscountFilterAndCrud";
import CategoryListTable from "./components/CategoryListTable/CategoryListTable";
import FirmListTable from "./components/FirmListTable/FirmListTable";
import Login from  "./components/Login/Login";
function AppTest(props) {


  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminAsked, setIsAdminAsked] = useState(false);
  const [isPreloaderShownState, setPreloaderShown] = useState(false);
  const baseUrl = "http://localhost:5103/api/CorporateDiscountsAdmin";
  const [myModalState, setMyModal] = useState({
    isOpen: false,
    content: null,
  });

function IsAdmin(){
  setIsAdminAsked(true);
  const isAutharizePromise = fetch(`${baseUrl}/IsAdmin`, {
    method: "POST", // or 'PUT'
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`hata meydana geldi: Status: ${response.status}`);
    }
    return response.json();
  });

  isAutharizePromise.then(x=> x ? setIsAdmin(true):  setIsAdmin(false))

}
if (isAdminAsked===false){
  IsAdmin();

}

  return (
    <BrowserRouter>{isAdmin== true ? ( <ProSidebarProvider>
      <Preloader isShown={isPreloaderShownState}></Preloader>
        <MyModal
        closeModal={(e) => {
          setMyModal({ isOpen: false, content: null });
        }}
        isOpen={myModalState.isOpen}
      >
        {myModalState.content}
      </MyModal>
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
      
      </ProSidebarProvider>):(         
             
              
                  <Login
                    baseUrl={baseUrl}
                    setPreloaderShown={setPreloaderShown}
                    setMyModal={setMyModal}                 
                  />
                
           
          
           )}
     
    </BrowserRouter>
  );
}
export default AppTest;
