import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TestMessagePage from "../../../test/TestMessageList";
import TestAlertList from "../../../test/TestAlertList";
import TestAlertDetailPage from "../../../test/TestAlertDetailPage";
import headBar from '../../../common/global';
import { AlarmProvider } from "../../../webserve/AlarmContext";
import MessagePage from "./MessagePage";
import AlertListPage from "./AlertListPage";
import AlertDetailPage from "./AlertDetailPage";
import VehicleMapPage from "../map/VehicleMapPage";
import { MapProvider } from "../../../webserve/MapContext";
import HistoryMapPage from "./HistoryMapPage";
const Stack = createNativeStackNavigator();

export default function MainMessage({ navigation }) {
  return (
    <AlarmProvider>
      <MapProvider>
        <Stack.Navigator initialRouteName='messagemain'>
          <Stack.Screen name="messagemain" component={MessagePage} options={headBar({ title: '消息', })} />
          <Stack.Screen name="alertlist" component={AlertListPage} options={headBar({ title: '告警提醒', })} />
          <Stack.Screen name="alertdetail" component={AlertDetailPage} options={headBar({ title: '告警详情' })} />
          <Stack.Screen name="vehicle_map" component={VehicleMapPage} options={headBar({ title: '车辆定位' })} />
          <Stack.Screen name="history_map" component={HistoryMapPage} options={headBar({ title: '告警时刻车辆定位' })} />
        </Stack.Navigator>
      </MapProvider>
    </AlarmProvider>
  )
}