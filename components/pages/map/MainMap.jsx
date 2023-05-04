import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TestSwitchMapPage from "../../../test/TestSwitchMapPage";
import SwitchMapPage from "./SwitchMapPage";
import TestMapPage from "../../../test/TestMap";
import MapPage from "./MapPage";
import TestMapVehicleDetailPage from "../../../test/TestMapVehicleDetailPage";
import MapSearchPage from "./MapSearchPage";
import DeviceDetailPage from "../device/DeviceDetailPage";
import DeviceSearchPage from "../device/DeviceSearchPage";
import TestDeviceSearchPage from "../../../test/TestDeviceSearchPage";
import TestDeviceDetailPage from "../../../test/TestDeviceDetailPage";
import TestDeviceModelSettingPage from "../../../test/TestDeviceModelSettingPage";
import TestDeviceIDSettingPage from '../../../test/TestDeviceIDSettingPage';
import TestDeviceObjectBindingPage from '../../../test/TestDeviceObjectBindingPage';
import DeviceObjectBindingPage from "../device/DeviceObjectBindingPage";
import TestMapSearch from "../../../test/TestMapSearch";
import VehicleDetailPage from "./VehicleDetailPage";
import headBar from "../../../common/global";
import { MapProvider } from "../../../webserve/MapContext";
import VehicleMapPage from "./VehicleMapPage";

const Stack = createNativeStackNavigator();

export default function MainMap() {
  return (
    <MapProvider>
      <Stack.Navigator initialRouteName='mapmain'>
        <Stack.Screen name="mapmain" component={MapPage} options={headBar({ header: () => null })} />
        <Stack.Screen name="mapsearch" component={MapSearchPage} options={headBar({ title: '搜索车号' })} />
        <Stack.Screen name="switchmap" component={SwitchMapPage} options={headBar({ title: '地图', })} />
        <Stack.Screen name="vehicledetail" component={VehicleDetailPage} options={headBar({ title: '车辆详情' })} />
        <Stack.Screen name="devicesearch" component={DeviceSearchPage} options={headBar({ title: '设备' })} />
        <Stack.Screen name="devicedetail" component={DeviceDetailPage} options={headBar({ title: '设备详情' })} />
        <Stack.Screen name="devicepic" component={TestDeviceModelSettingPage} options={headBar({ title: '设置型号图片' })} />
        <Stack.Screen name="deviceid" component={TestDeviceIDSettingPage} options={headBar({ title: '设置标签编码' })} />
        <Stack.Screen name="objectbinding" component={DeviceObjectBindingPage} options={headBar({ title: '绑定对象' })} />
        <Stack.Screen name="vehicle_map" component={VehicleMapPage} options={headBar({ title: '车辆定位' })} />
      </Stack.Navigator>
    </MapProvider>
  )
}