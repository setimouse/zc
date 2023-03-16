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
const Stack = createNativeStackNavigator();

export default function MainMessage({ navigation }) {
  return (
    <AlarmProvider>
      <Stack.Navigator initialRouteName='messagemain'>
        <Stack.Screen name="messagemain" component={MessagePage} options={headBar({ title: '消息', })} />
        <Stack.Screen name="alertlist" component={AlertListPage} options={headBar({ title: '告警提醒', })} />
        <Stack.Screen name="alertdetail" component={AlertDetailPage} options={headBar({ title: '告警详情' })} />
      </Stack.Navigator>
    </AlarmProvider>
  )
}