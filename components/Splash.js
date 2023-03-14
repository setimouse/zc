import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../webserve/AuthContext";
import LoginPage from "./pages/login/LoginPage";
import MainScreen from "./pages/MainScreen";

export default function Splash() {
  const { accessToken } = useContext(AuthContext);

  const screen = accessToken === null || accessToken === undefined
    ? <LoginPage /> : <MainScreen />
  return (
    <>
      {screen}
    </>
  )
}