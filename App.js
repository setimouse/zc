import { SafeAreaView } from 'react-native';
import LoginPage from './components/pages/login/LoginPage'
import SwitchMapPage from './components/pages/map/SwitchMapPage'
// import TestMapDeviceSearchResultPage from './test/TestMapDeviceSearchResultPage';
// import TestMapDeviceBindPage from './test/TestMapDeviceBindPage';
import TestMapVehicleDetailPage from './test/TestMapVehicleDetailPage';
import TestDeviceDetailPage from './test/TestDeviceDetailPage';
import TestDeviceModelSettingPage from './test/TestDeviceModelSettingPage';
import TestDeviceIDSettingPage from './test/TestDeviceIDSettingPage';
import TestDeviceObjectBindingPage from './test/TestDeviceObjectBindingPage';
import TestMessagePage from './test/TestMessageList';
import TestAlertList from './test/TestAlertList';
import TestAlertDetailPage from './test/TestAlertDetailPage';
import TestMapPage from './test/TestMap';
import TestSwitchMapPage from './test/TestSwitchMapPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapPage from './components/pages/map/MapPage';
import TestMapDeviceSearchResultPage from './test/TestMapDeviceSearchResultPage';
import MainScreen from './components/pages/MainScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='login'>
          <Stack.Screen name='login' component={LoginPage} options={{ header: () => null }} />
          {/* <Stack.Screen name="map" component={TestMapPage} options={{ header: () => null }} />
          <Stack.Screen name="switchmap" component={TestSwitchMapPage} options={{ title: '切换地图' }} />
          <Stack.Screen name="mapsearch" component={TestMapDeviceSearchResultPage} options={{ title: '地图搜索结果' }} /> */}
          <Stack.Screen name='main' component={MainScreen} options={{ header: () => null }} />
        </Stack.Navigator>
      </NavigationContainer>

      {/* <TestMapVehicleDetailPage /> */}
      {/* <TestDeviceDetailPage /> */}
      {/* <TestDeviceModelSettingPage /> */}
      {/* <TestDeviceIDSettingPage /> */}
      {/* <TestDeviceObjectBindingPage /> */}
      {/* <TestMessagePage /> */}
      {/* <TestAlertList /> */}
      {/* <TestAlertDetailPage /> */}
      {/* <TestMapPage /> */}
      {/* <TestMapDeviceSearchResultPage /> */}
      {/* <TestMapDeviceBindPage /> */}
    </SafeAreaView>
    // <LoginPage />
  );
}
