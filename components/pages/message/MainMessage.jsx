import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TestMessagePage from "../../../test/TestMessageList";
import TestAlertList from "../../../test/TestAlertList";
import TestAlertDetailPage from "../../../test/TestAlertDetailPage";
import headBar from '../../../common/global';

const Stack = createNativeStackNavigator();

export default function MainMessage({ navigation }) {
  return (
    <Stack.Navigator initialRouteName='messagemain'>
      <Stack.Screen name="messagemain" component={TestMessagePage} options={headBar({ title: '消息' })} />
      <Stack.Screen name="alertlist" component={TestAlertList} options={headBar({ title: '告警提醒', })} />
      <Stack.Screen name="alertdetail" component={TestAlertDetailPage} options={headBar({ title: '告警详情' })} />
    </Stack.Navigator>
  )
}