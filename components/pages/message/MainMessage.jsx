import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TestSwitchMapPage from "../../../test/TestSwitchMapPage";
import TestMapPage from "../../../test/TestMap";
import TestMapDeviceSearchResultPage from "../../../test/TestMapDeviceSearchResultPage";
import TestMessagePage from "../../../test/TestMessageList";
import TestAlertList from "../../../test/TestAlertList";
import TestAlertDetailPage from "../../../test/TestAlertDetailPage";
import IconBack from '../../../assets/back.png';
import headBar from '../../../common/global';

const Stack = createNativeStackNavigator();

// function headBar({ title }) {
//   return {
//     title: title,
//     headerTitleStyle: { color: '#FFFFFF' },
//     headerStyle: { backgroundColor: '#2882FF' },
//     statusBarColor: '#2882FF',
//     headerBackImageSource: IconBack,
//   }
// }

export default function MainMessage({ navigation }) {
  return (
    <Stack.Navigator initialRouteName='messagemain'>
      <Stack.Screen name="messagemain" component={TestMessagePage} options={headBar({ title: '消息' })} />
      <Stack.Screen name="alertlist" component={TestAlertList} options={headBar({ title: '告警提醒', })} />
      <Stack.Screen name="alertdetail" component={TestAlertDetailPage} options={headBar({ title: '告警详情' })} />
    </Stack.Navigator>
  )
}