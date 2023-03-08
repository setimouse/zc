import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TestSwitchMapPage from "../../../test/TestSwitchMapPage";
import TestMapPage from "../../../test/TestMap";
import TestMapVehicleDetailPage from "../../../test/TestMapVehicleDetailPage";
import MapSearchPage from "./MapSearchPage";
import DeviceSearchPage from "../device/DeviceSearchPage";
import TestDeviceSearchPage from "../../../test/TestDeviceSearchPage";
import TestDeviceDetailPage from "../../../test/TestDeviceDetailPage";

const Stack = createNativeStackNavigator();

export default function MainMap() {
  return (
    // <NavigationContainer>
    <Stack.Navigator initialRouteName='map'>
      <Stack.Screen name="mapmain" component={TestMapPage} options={{ header: () => null }} />
      <Stack.Screen name="mapsearch" component={MapSearchPage} options={{ title: '地图搜索' }} />
      <Stack.Screen name="switchmap" component={TestSwitchMapPage} options={{ title: '切换地图' }} />
      <Stack.Screen name="vehicledetail" component={TestMapVehicleDetailPage} options={{ title: '车辆详情' }} />
      <Stack.Screen name="devicesearch" component={TestDeviceSearchPage} options={{ title: '设备搜索' }} />
      <Stack.Screen name="devicedetail" component={TestDeviceDetailPage} options={{ title: '设备详情' }} />
    </Stack.Navigator>
    // </NavigationContainer>
  )
}