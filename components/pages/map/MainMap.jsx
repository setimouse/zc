import React, { useContext, useEffect } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SwitchMapPage from "./SwitchMapPage";
import MapPage from "./MapPage";
import MapSearchPage from "./MapSearchPage";
import DeviceDetailPage from "../device/DeviceDetailPage";
import DeviceSearchPage from "../device/DeviceSearchPage";
import TestDeviceModelSettingPage from "../../../test/TestDeviceModelSettingPage";
import TestDeviceIDSettingPage from '../../../test/TestDeviceIDSettingPage';
import DeviceObjectBindingPage from "../device/DeviceObjectBindingPage";
import ScanPage from '../device/ScanPage'
import VehicleDetailPage from "./VehicleDetailPage";
import headBar from "../../../common/global";
import { MapProvider } from "../../../webserve/MapContext";
import VehicleMapPage from "./VehicleMapPage";
import DeviceBindHistoryPage from "../device/DeviceBindHistoryPage";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import IconBack from '../../../assets/back.png';
import { AuthContext } from "../../../webserve/AuthContext";
import DeviceModelSettingPage from "../device/DeviceModelSettingPage";

const Stack = createNativeStackNavigator();

export default function MainMap() {
  const navigation = useNavigation();
  const { loadMe } = useContext(AuthContext)

  useEffect(() => {
    loadMe()
  }, [])

  return (
    <MapProvider>
      <Stack.Navigator initialRouteName='mapmain'>
        <Stack.Screen name="mapmain" component={MapPage} options={headBar({ header: () => null })} />
        <Stack.Screen name="mapsearch" component={MapSearchPage} options={headBar({ title: '搜索车号', animation: 'fade' })} />
        <Stack.Screen name="switchmap" component={SwitchMapPage} options={headBar({ title: '地图', })} />
        <Stack.Screen name="vehicledetail" component={VehicleDetailPage} options={headBar({ title: '车辆详情' })} />
        <Stack.Screen name="devicesearch" component={DeviceSearchPage} options={headBar({
          title: '设备绑定', headerRight: () => (
            <Pressable onPress={() => { navigation.navigate("scan") }}>
              <MaterialCommunityIcons name="line-scan" size={24} color="white" />
            </Pressable>
          ),
        })} />
        <Stack.Screen name="scan" component={ScanPage} options={{
          title: '',
          headerTransparent: true,
          headerBackImageSource: IconBack,
        }} />
        <Stack.Screen name="devicedetail" component={DeviceDetailPage} options={headBar({ title: '设备详情' })} />
        <Stack.Screen name="devicepic" component={DeviceModelSettingPage} options={headBar({ title: '设备型号图片' })} />
        <Stack.Screen name="deviceid" component={TestDeviceIDSettingPage} options={headBar({ title: '设置标签编码' })} />
        <Stack.Screen name="objectbinding" component={DeviceObjectBindingPage} options={headBar({ title: '绑定对象' })} />
        <Stack.Screen name="vehicle_map" component={VehicleMapPage} options={headBar({ title: '车辆定位' })} />
        <Stack.Screen name="device_bind_history" component={DeviceBindHistoryPage} options={headBar({ title: '绑定记录' })} />
      </Stack.Navigator>
    </MapProvider>
  )
}