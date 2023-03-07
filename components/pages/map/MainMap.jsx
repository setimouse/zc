import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TestSwitchMapPage from "../../../test/TestSwitchMapPage";
import TestMapPage from "../../../test/TestMap";
import TestMapDeviceSearchResultPage from "../../../test/TestMapDeviceSearchResultPage";

const Stack = createNativeStackNavigator();

export default function MainMap() {
  return (
    // <NavigationContainer>
    <Stack.Navigator initialRouteName='map'>
      <Stack.Screen name="mapmain" component={TestMapPage} options={{ header: () => null }} />
      <Stack.Screen name="switchmap" component={TestSwitchMapPage} options={{ title: '切换地图' }} />
      <Stack.Screen name="mapsearch" component={TestMapDeviceSearchResultPage} options={{ title: '地图搜索结果' }} />
    </Stack.Navigator>
    // </NavigationContainer>
  )
}