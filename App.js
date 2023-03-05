import { SafeAreaView } from 'react-native';
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

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <TestMapVehicleDetailPage /> */}
      {/* <TestDeviceDetailPage /> */}
      {/* <TestDeviceModelSettingPage /> */}
      {/* <TestDeviceIDSettingPage /> */}
      {/* <TestDeviceObjectBindingPage /> */}
      {/* <TestMessagePage /> */}
      {/* <TestAlertList /> */}
      {/* <TestAlertDetailPage /> */}
      <TestMapPage />
      {/* <TestMapDeviceSearchResultPage /> */}
      {/* <TestMapDeviceBindPage /> */}
    </SafeAreaView>
    // <LoginPage />
  );
}
