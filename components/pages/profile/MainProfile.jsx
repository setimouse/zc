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
import headBar from '../../../common/global';
import ProfilePage from './ProfilePage';
import AlertDetailPage from '../message/AlertDetailPage';
import DeviceSearchPage from '../device/DeviceSearchPage';
import DeviceDetailPage from '../device/DeviceDetailPage';
import DeviceModelSettingPage from '../device/DeviceModelSettingPage';
import DeviceIDSettingPage from '../device/DeviceIDSettingPage';
import DeviceObjectBindingPage from '../device/DeviceObjectBindingPage';
import { AlarmProvider } from '../../../webserve/AlarmContext';
import { MapProvider } from '../../../webserve/MapContext';

const Stack = createNativeStackNavigator();

export default function MainProfile(props) {
  return (
    <AlarmProvider>
      <MapProvider>
        <Stack.Navigator initialRouteName='profile_home'>
          <Stack.Screen name="profile_home" component={ProfilePage} options={{ header: () => null }} />
          <Stack.Screen name="profile_alert_list" component={AlertListPage} options={headBar({ title: '告警信息' })} />
          <Stack.Screen name="alertdetail" component={AlertDetailPage} options={headBar({ title: '告警详情' })} />
          <Stack.Screen name="profile_device_manage" component={DeviceSearchPage} options={headBar({ title: '设备管理' })} />
          <Stack.Screen name="devicedetail" component={DeviceDetailPage} options={headBar({ title: '设备详情' })} />
          <Stack.Screen name="devicepic" component={DeviceModelSettingPage} options={headBar({ title: '设备类型图片' })} />
          <Stack.Screen name="deviceid" component={DeviceIDSettingPage} options={headBar({ title: '设置标签编码' })} />
          <Stack.Screen name="objectbinding" component={DeviceObjectBindingPage} options={headBar({ title: '绑定对象' })} />
        </Stack.Navigator>
      </MapProvider>
    </AlarmProvider>
  )
}
