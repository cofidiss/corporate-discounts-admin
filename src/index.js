import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Preloader from "./components/Preloader/Preloader";
import FilterDiscounts from "./components/FilterDiscounts/FilterDiscounts";
import AdminDiscountTable from "./components/AdminDiscountTable/AdminDiscountTable";
import reportWebVitals from './reportWebVitals';
import {ProSidebarProvider, Sidebar, Menu, MenuItem, SubMenu,useProSidebar  } from "react-pro-sidebar";
import { BrowserRouter, Routes, Route, Link, useParam,Outlet } from 'react-router-dom';
import AppTest from "./Apptest";
import CategoryListTable from './components/CategoryListTable/CategoryListTable';
import FirmListTable from './components/FirmListTable/FirmListTable';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppTest/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
  