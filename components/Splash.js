import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../webserve/AuthContext";
import LoginPage from "./pages/login/LoginPage";
import MainScreen from "./pages/MainScreen";
import { View, Image, Dimensions, StatusBar } from "react-native";

function SplashScreen() {
  const { width, height } = Dimensions.get("screen")
  console.log('width', width, 'heigth', height)

  return (
    <View>
      <StatusBar hidden={true} />
      <Image style={{ width: width, height: height, }}
        source={require('../assets/splash_1284.png')}
      />
    </View>
  )
}

export default function Splash() {
  const { accessToken } = useContext(AuthContext);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3000);
    return () => clearTimeout(timer)
  })

  const screen = showSplash ? <SplashScreen /> :
    accessToken === null || accessToken === undefined
      ? <LoginPage /> : <MainScreen />
  return (
    <>
      {screen}
    </>
  )
}