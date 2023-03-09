import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TestSwitchMapPage from "../../../test/TestSwitchMapPage";
import TestMapPage from "../../../test/TestMap";
import TestMapDeviceSearchResultPage from "../../../test/TestMapDeviceSearchResultPage";
import TestMessagePage from "../../../test/TestMessageList";
import TestAlertList from "../../../test/TestAlertList";
import TestAlertDetailPage from "../../../test/TestAlertDetailPage";

const Stack = createNativeStackNavigator();

export default function MainMessage({ navigation }) {
  return (
    <Stack.Navigator initialRouteName='messagemain'>
      <Stack.Screen name="messagemain" component={TestMessagePage} options={{ title: '消息' }} />
      <Stack.Screen name="alertlist" component={TestAlertList} options={{ title: '告警提醒', }} />
      <Stack.Screen name="alertdetail" component={TestAlertDetailPage} options={{ title: '告警详情' }} />
    </Stack.Navigator>
  )
}