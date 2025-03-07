import React from "react";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Users from "./pages/CMS/Users";
import Actors from "./pages/CMS/Actors";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Comments from "./pages/CMS/Comments";
import DetailPage from "./pages/DetailPage";
import ContentCard from "./pages/ContentCard";
import Navigation from "./components/Navigation";
import DramaInput from "./pages/CMS/Drama/DramaInput";
import SearchResultPage from "./pages/SearchResultPage";
import Error404 from "./pages/Error404";
import Countries from "./pages/CMS/Countries";
import Awards from "./pages/CMS/Awards";
import Genres from "./pages/CMS/Genres";
import Dramas from "./pages/CMS/Drama/Dramas";

import {
  GlobalStateProvider,
  useGlobalState,
} from "./components/GlobalStateContext";

import "./App.css";
import { EditProvider } from "./components/cmsEdit";
import { SwalProvider } from "./components/SweetAlert";
import EmailVerified from "./pages/EmailVerified";
import ProtectedRoute from "./ProtectedRoute";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";

function AppContent() {
  const { showFooter, showNavigation, showSidebar } = useGlobalState();

  return (
    <div>
      {showNavigation && <Navigation />}
      <div
        className={`${
          showSidebar == false
            ? ""
            : "sidebar-wrapper wrapper d-flex align-items-stretch justify-content-center w-100 h-100"
        }`}
      >
        {showSidebar && <Sidebar />}
        <div
          className={`${
            showSidebar == false
              ? ""
              : "sidebar-content wrapper d-flex align-items-stretch justify-content-center w-100 h-100"
          }`}
        >
          <Routes>
            <Route path="*" element={<Error404 />} />
            <Route path="/" element={<ContentCard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/email-confirmed" element={<EmailVerified />} />
            <Route path="/detail/:movieId" element={<DetailPage />} />
            <Route path="/home" element={<ContentCard />} />
            <Route path="/search" element={<SearchResultPage />} />
            <Route
              path="/cms/actors"
              element={
                <ProtectedRoute element={<Actors />} allowedRoles={["admin"]} />
              }
            />
            <Route
              path="/cms/comments"
              element={
                <ProtectedRoute
                  element={<Comments />}
                  allowedRoles={["admin"]}
                />
              }
            />
            <Route
              path="/cms/users"
              element={
                <ProtectedRoute element={<Users />} allowedRoles={["admin"]} />
              }
            />
            <Route
              path="/cms/drama/input"
              element={
                <ProtectedRoute
                  element={<DramaInput />}
                  allowedRoles={["admin"]}
                />
              }
            />
            <Route
              path="/cms/drama/validate"
              element={
                <ProtectedRoute element={<Dramas />} allowedRoles={["admin"]} />
              }
            />
            <Route
              path="/cms/countries"
              element={
                <ProtectedRoute
                  element={<Countries />}
                  allowedRoles={["admin"]}
                />
              }
            />
            <Route
              path="/cms/awards"
              element={
                <ProtectedRoute element={<Awards />} allowedRoles={["admin"]} />
              }
            />
            <Route
              path="/cms/genres"
              element={
                <ProtectedRoute element={<Genres />} allowedRoles={["admin"]} />
              }
            />
          </Routes>
          {showFooter && <Footer />}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <SwalProvider>
        <EditProvider>
          <GlobalStateProvider>
            <Router>
              <AppContent />
            </Router>
          </GlobalStateProvider>
        </EditProvider>
      </SwalProvider>
    </>
  );
}

export default App;
