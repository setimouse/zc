/**
 * 我的(Navigator)
 */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TestProfilePage from '../../../test/TestProfilePage';
import AlertListPage from '../message/AlertListPage';
import TestAlertList from '../../../test/TestAlertList';
import TestDeviceSearchPage from '../../../test/TestDeviceSearchPage';
import TestDeviceDetailPage from '../../../test/TestDeviceDetailPage';
import TestDeviceModelSettingPage from '../../../test/TestDeviceModelSettingPage';
import TestDeviceIDSettingPage from '../../../test/TestDeviceIDSettingPage';
import TestDeviceObjectBindingPage from '../../../test/TestDeviceObjectBindingPage';
import TestAlertDetailPage from '../../../test/TestAlertDetailPage';
import MainMap from '../map/MainMap';

const Stack = createNativeStackNavigator();

export default function MainProfile(props) {
  return (
    <Stack.Navigator initialRouteName='profile_home'>
      <Stack.Screen name="profile_home" component={TestProfilePage} options={{ header: () => null }} />
      <Stack.Screen name="profile_alert_list" component={TestAlertList} options={{ title: '告警信息' }} />
      <Stack.Screen name="alertdetail" component={TestAlertDetailPage} options={{ title: '告警详情' }} />
      <Stack.Screen name="profile_device_manage" component={TestDeviceSearchPage} options={{ title: '设备管理' }} />
      <Stack.Screen name="devicedetail" component={TestDeviceDetailPage} options={{ title: '设备详情' }} />
      <Stack.Screen name="devicepic" component={TestDeviceModelSettingPage} options={{ title: '设置型号图片' }} />
      <Stack.Screen name="deviceid" component={TestDeviceIDSettingPage} options={{ title: '设置设备ID' }} />
      <Stack.Screen name="objectbinding" component={TestDeviceObjectBindingPage} options={{ title: '绑定对象' }} />
    </Stack.Navigator>
  )
}
