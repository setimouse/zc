import React, { useContext, useEffect } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconMessage from '../../assets/icon_message.png';
import IconMessageChecked from '../../assets/icon_message_checked.png';
import IconMap from '../../assets/icon_map.png';
import IconMapChecked from '../../assets/icon_map_checked.png';
import IconProfile from '../../assets/icon_profile.png';
import IconProfileChecked from '../../assets/icon_profile_checked.png';
import { Image } from "react-native";
import MainMap from "./map/MainMap";
import MainMessage from "./message/MainMessage";
import MainProfile from "./profile/MainProfile";
import { NavigationContainer, getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { AlarmContext } from "../../webserve/AlarmContext";

const Tab = createBottomTabNavigator();

const tabs = {
  'message': {
    icon: IconMessage,
    activeIcon: IconMessageChecked,
    name: '消息',
  },
  'map': {
    icon: IconMap,
    activeIcon: IconMapChecked,
    name: '地图',
  },
  'profile': {
    icon: IconProfile,
    activeIcon: IconProfileChecked,
    name: '我的',
  },
};

export default function MainScreen() {
  const { alarmCount, reminder } = useContext(AlarmContext)
  useEffect(() => {
    reminder()
  }, [])
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="map"
        screenOptions={({ route }) => {
          return ({
            tabBarStyle: (() => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? ""
              console.log('route name:', routeName, 'name:', route.name)
              if ('' == routeName) return
              if (!['mapmain', 'messagemain', 'profile_home'].includes(routeName))
                return { display: 'none', flex: 0 }
            })(),
            tabBarIcon: ({ focused, size, color }) => {
              let tab = tabs[route.name];
              let icon = focused ? tab.activeIcon : tab.icon
              return <Image source={icon} style={{ width: 28, height: 28 }} />;
            },
            headerShown: false,
            tabBarHideOnKeyboard: true,
          })
        }}
      >
        <Tab.Screen name="message" component={MainMessage} options={() => {
          return {
            tabBarLabel: '消息',
            tabBarBadge: (alarmCount === undefined || alarmCount == 0 ? null : '.'),
            tabBarBadgeStyle: { fontSize: 82, left: -2, top: 0, lineHeight: 32, backgroundColor: 'rgba(0 0 0 / 0)', color: '#f00' }
          }
        }} />
        <Tab.Screen name="map" component={MainMap} options={() => {
          return {
            tabBarLabel: '地图',
          }
        }} />
        <Tab.Screen name="profile" component={MainProfile} options={() => {
          return {
            tabBarLabel: '我的',
          }
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}