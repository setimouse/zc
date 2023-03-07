import { StyleSheet, Text, View, TextInput, Pressable, Image, Button } from 'react-native';
import MapSearchWidget from '../../widgets/MapSearchWidget';
import MapButtonWidget from '../../widgets/MapButtonWidget';
import IconSwitch from '../../../assets/alert_pending.png';
import IconDevice from '../../../assets/alert_done.png';
import TabBarWidget from '../../widgets/TabBarWidget';

export default function MapPage({ route, navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.map}></View>
      <View style={styles.search}>
        <MapSearchWidget placeholder="请输入车号、设备编号"
          onSubmitText={word => navigation.navigate('mapsearch')}
        />
      </View>
      <View style={styles.sidebar}>
        <View>
          <MapButtonWidget title="切换" icon={IconSwitch}
            onPress={() => navigation.navigate('switchmap')} />
        </View>
        <View style={{ height: 1, backgroundColor: '#dddedf', marginHorizontal: 4 }}></View>
        <View>
          <MapButtonWidget title="设备" icon={IconDevice}
            onPress={() => navigation.navigate('devicesearch')}
          />
        </View>
      </View>
      <View style={styles.locate}>
        <Image source={IconSwitch} />
      </View>
      {/* <TabBarWidget checked={1} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#00ffff',
  },
  search: {
    flex: 1,
    position: 'absolute',
    paddingHorizontal: 12,
    top: 12,
    width: '100%',
    height: 44,
    zIndex: 1,
    elevation: 1
  },
  sidebar: {
    position: 'absolute',
    right: 9, top: 128,
    width: 36, height: 88,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  locate: {
    position: 'absolute',
    right: 9, bottom: 130,
    backgroundColor: '#fff',
    width: 40, height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});