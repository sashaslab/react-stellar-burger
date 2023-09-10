import styles from "./app.module.css";
import AppHeader from '../AppHeader/appHeader.jsx'
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import HomePage from "../../pages/homePage";
import Login from "../../pages/login";
import Register from "../../pages/register";
import ForgotPassword from "../../pages/forgotPassword";
import ResetPassword from "../../pages/resetPassword";
import Profile from "../../pages/profile";
import IngredientInfo from "../../pages/ingredientInfo";
import Modal from "../Modal/modal";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions/burgerIngredients";
import { OnlyAuth, OnlyUnAuth } from "../ProtectedRouteElement/protectedRouteElement";
import { checkUserAuth } from "../../utils/burger-api";
import Feed from "../../pages/feed";
import HistoryOrders from "../../pages/historyOrders";

function App() {
  const location = useLocation();
  const background = location.state && location.state.background
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeModal = () => {
    navigate(-1);
  }

  React.useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
        <Route path="/register" element={<OnlyUnAuth component={<Register />} />} />
        <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />} />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<OnlyAuth component={<Profile />} />}>
          <Route path="/profile/orders" element={<HistoryOrders />} />
        </Route>
        <Route path="/ingredients/:id" element={<IngredientInfo />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
      {background && (
        <Routes>
          <Route path="/ingredients/:id" element={<Modal closeModal={closeModal}><IngredientInfo /></Modal>} />
        </Routes>
      )}
    </div>
  );
}

export default App;