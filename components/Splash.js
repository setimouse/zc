import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../webserve/AuthContext";
import LoginPage from "./pages/login/LoginPage";
import MainScreen from "./pages/MainScreen";
import { View, Image, Dimensions, StatusBar, ImageBackground, Text } from "react-native";

function SplashScreen() {
  const { width, height } = Dimensions.get("screen")
  console.log('width', width, 'heigth', height)

  return (
    <View style={{ backgroundColor: 'red', flex: 1 }}>
      <StatusBar hidden={true} />
      {/* <Image style={{ width: width, height: height, }}
        source={require('../assets/splash_1284.png')}
      /> */}
      <ImageBackground source={require('../assets/splash_bg.png')} resizeMethod="resize"
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{
          // backgroundColor: 'yellow',
          flex: 1, width: '100%', justifyContent: 'space-between'
        }}>
          <View style={{
            alignItems: 'center', flex: 0.764, justifyContent: 'center',
            // backgroundColor: 'green'
          }}>
            <Image source={require('../assets/splash_icon.png')} style={{ width: '23.8%', height: undefined, aspectRatio: 1, }} />
            <Text style={{ color: '#3E4146', fontSize: 20, fontWeight: 600, marginTop: 20, }}>定位业务管理系统</Text>
          </View>
          <View style={{
            // backgroundColor: 'pink',
            position: "absolute", bottom: 44, width: '100%', alignItems: 'center'
          }}>
            <Image source={require('../assets/logo.png')} style={{ height: 63 }} resizeMode="contain" />
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

export default function Splash() {
  const { accessToken } = useContext(AuthContext);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, __DEV__ ? 330 : 3000);
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