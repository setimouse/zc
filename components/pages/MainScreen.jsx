import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapPage from "./map/MapPage";
import MessagePage from "./message/MessagePage";
import IconMessage from '../../assets/icon_message.png';
import IconMessageChecked from '../../assets/icon_message_checked.png';
import IconMap from '../../assets/icon_map.png';
import IconMapChecked from '../../assets/icon_map_checked.png';
import IconProfile from '../../assets/icon_profile.png';
import IconProfileChecked from '../../assets/icon_profile_checked.png';
import { Image } from "react-native";
import MainMap from "./map/MainMap";
import MainMessage from "./message/MainMessage";

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

  return (
    <Tab.Navigator initialRouteName="message"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let tab = tabs[route.name];
          let icon = focused ? tab.activeIcon : tab.icon
          return <Image source={icon} style={{ width: 28, height: 28 }} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="message" component={MainMessage} options={() => {
        return {
          tabBarLabel: '消息',
        }
      }} />
      <Tab.Screen name="map" component={MainMap} options={() => {
        return {
          tabBarLabel: '地图',
        }
      }} />
      <Tab.Screen name="profile" component={MapPage} options={() => {
        return {
          tabBarLabel: '我的',
        }
      }} />
    </Tab.Navigator>
  );
}