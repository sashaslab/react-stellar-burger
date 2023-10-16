import styles from "./app.module.css";
import AppHeader from '../AppHeader/appHeader'
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
import { getIngredients } from "../../services/actions/burgerIngredients";
import { OnlyAuth, OnlyUnAuth } from "../ProtectedRouteElement/protectedRouteElement";
import Feed from "../../pages/feed";
import HistoryOrders from "../../pages/historyOrders";
import FeedOrder from "../../pages/feedOrder";
import ProfileOrder from "../../pages/profileOrder";
import { checkUserAuth } from "../../utils/burger-api";
import { FC } from "react";

import { useAppDispatch } from "../../utils/types";

const App: FC = () => {
  const location = useLocation();
  const background = location.state && location.state.background
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const closeModal = () => {
    navigate(-1);
  }

  React.useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <div className={styles.container}>
        <Routes location={background || location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
          <Route path="/register" element={<OnlyUnAuth component={<Register />} />} />
          <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />} />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<OnlyAuth component={<Profile />} />}>
            <Route path="/profile/orders" element={<HistoryOrders />} />
          </Route>
          <Route path="/profile/orders/:number" element={<OnlyAuth component={<ProfileOrder />} />} />
          <Route path="/ingredients/:id" element={<IngredientInfo />} />
          <Route path="feed/:number" element={<FeedOrder />} />
        </Routes>
        {background && (
          <Routes>
            <Route path="/ingredients/:id" element={<Modal closeModal={closeModal}><IngredientInfo /></Modal>} />
            <Route path="/feed/:number" element={<Modal closeModal={closeModal}><FeedOrder /></Modal>} />
            <Route path="/profile/orders/:number" element={<OnlyAuth component={<Modal closeModal={closeModal}><ProfileOrder /></Modal>} />} />
          </Routes>

        )}
      </div>
    </div>
  );
}

export default App;