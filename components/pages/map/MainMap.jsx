import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TestSwitchMapPage from "../../../test/TestSwitchMapPage";
import TestMapPage from "../../../test/TestMap";
import TestMapVehicleDetailPage from "../../../test/TestMapVehicleDetailPage";
import MapSearchPage from "./MapSearchPage";
import DeviceSearchPage from "../device/DeviceSearchPage";
import TestDeviceSearchPage from "../../../test/TestDeviceSearchPage";
import TestDeviceDetailPage from "../../../test/TestDeviceDetailPage";
import TestDeviceModelSettingPage from "../../../test/TestDeviceModelSettingPage";
import TestDeviceIDSettingPage from '../../../test/TestDeviceIDSettingPage';
import TestDeviceObjectBindingPage from '../../../test/TestDeviceObjectBindingPage';

const Stack = createNativeStackNavigator();

export default function MainMap() {
  return (
    // <NavigationContainer>
    <Stack.Navigator initialRouteName='mapmain'>
      <Stack.Screen name="mapmain" component={TestMapPage} options={{ header: () => null }} />
      <Stack.Screen name="mapsearch" component={MapSearchPage} options={{ title: '搜索车号及设备' }} />
      <Stack.Screen name="switchmap" component={TestSwitchMapPage} options={{ title: '地图', }} />
      <Stack.Screen name="vehicledetail" component={TestMapVehicleDetailPage} options={{ title: '车辆详情' }} />
      <Stack.Screen name="devicesearch" component={TestDeviceSearchPage} options={{ title: '设备' }} />
      <Stack.Screen name="devicedetail" component={TestDeviceDetailPage} options={{ title: '设备详情' }} />
      <Stack.Screen name="devicepic" component={TestDeviceModelSettingPage} options={{ title: '设置型号图片' }} />
      <Stack.Screen name="deviceid" component={TestDeviceIDSettingPage} options={{ title: '设置设备ID' }} />
      <Stack.Screen name="objectbinding" component={TestDeviceObjectBindingPage} options={{ title: '绑定对象' }} />
    </Stack.Navigator>
    // </NavigationContainer>
  )
}