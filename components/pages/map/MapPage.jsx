import { Platform, Pressable, StatusBar, StyleSheet, View } from 'react-native';
import MapSearchWidget from '../../widgets/MapSearchWidget';
import MapButtonWidget from '../../widgets/MapButtonWidget';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import FMMapWidget, { webView } from '../../widgets/FMMapWidget';
import { useContext, useEffect, useState } from 'react';
import { MapContext } from '../../../webserve/MapContext';
import { AuthContext } from '../../../webserve/AuthContext';
import { Dimensions } from 'react-native';

export default function MapPage({ route, navigation }) {
  const { requestDefaultMap, requestMapList, requestIndoorMap,
    requestListTargetReals } = useContext(MapContext)
  const { siteSetting } = useContext(AuthContext)
  const [displayMap, setDisplayMap] = useState()
  const [mapInfo, setMapInfo] = useState()
  const [deviceList, setDeviceList] = useState([])
  const [mapReady, setMapReady] = useState();

  const refreshDevice = () => {
    console.log('refresh device')
    requestListTargetReals({ consumerStatus: 1, deviceList: deviceList }).then((resp) => {
      // console.log('list target reals:', resp)
      let list = resp.data
      console.log("device list:", list.map(e => e.deviceId))
      let deviceListJson = JSON.stringify(list)
      // console.log('move devices:', list)
      webView.injectJavaScript(`moveMarkers(${deviceListJson})`)
    })
  }

  useEffect(() => {
    console.log('params:', route.params)
    if (route.params && route.params.map) {
      console.log("param[map]: ", route.params.map)
      setDisplayMap(route.params.map)
    } else if (route.params && route.params.deviceId) {
      console.log('deviceId:', route.params.deviceId)
      const deviceId = route.params.deviceId
      requestListTargetReals({ deviceList: [deviceId] })
        .then(resp => resp.data.filter(e => e.deviceId == deviceId))
        .then(list => {
          console.log(list)
          if (list.length > 0) {
            let device = list[0]
            console.log(device);
            const x = device.x
            const y = device.y
            webView.injectJavaScript(`setMapCenter(${x}, ${y})`)
          }
        })
    } else {
      requestMapList({ pageNum: 1, pageSize: 1000 })
        .then(response => response.data.list)
        .then(list => list.filter(e => e.id != '-101'))
        .then(list => {
          if (list.length < 1) {
            return
          }
          let map = list[0]
          let defaultMaps = list.filter(e => e.defaultFlag)
          console.log('default maps:', defaultMaps);
          map = defaultMaps.length > 0 ? defaultMaps[0] : map;
          setDisplayMap(map);
        })
    }
  }, [route.params])

  useEffect(() => {
    if (displayMap) {
      // 获取室内地图
      requestIndoorMap({ id: displayMap.id }).then(resp => {
        setMapInfo(resp.data)
      }).catch(error => console.log("Oops", error.message))
    }
  }, [displayMap])

  useEffect(() => {
    if (mapReady === undefined) {
      return
    }
    console.log("start once map ready, map=", mapReady)
    setTimeout(() => {
      refreshDevice()
    }, 500);
    console.log("reload interval:", siteSetting.realDataLoopInterval)
    const timer = setInterval(() => {
      refreshDevice()
    }, parseFloat(siteSetting.realDataLoopInterval));
    return () => { clearInterval(timer) }
  }, [mapReady])

  return (
    // <SafeAreaView>
    <View style={styles.container}>
      <StatusBar translucent={true} />
      <View style={styles.map}>
        <FMMapWidget mapInfo={mapInfo}
          onMapReady={() => { setMapReady(new Date()) }}
        />
      </View>
      <View style={styles.search}>
        <MapSearchWidget placeholder="请输入车号、设备编号"
          onFocus={e => { navigation.navigate('mapsearch') }}
        />
      </View>
      <View style={styles.sidebar}>
        <View>
          <MapButtonWidget title="切换" icon={<FontAwesome name="exchange" size={16} />}
            onPress={() => navigation.navigate('switchmap', {
              currentMap: displayMap
            })}
          />
        </View>
        <View style={{ height: 1, backgroundColor: '#dddedf', marginHorizontal: 4 }}></View>
        <View>
          <MapButtonWidget title="设备" icon={<FontAwesome name="chain" size={16} />}
            onPress={() => navigation.navigate('devicesearch')}
          />
        </View>
      </View>
      <Pressable style={styles.locate}
        onPress={() => {
          webView.injectJavaScript('resetMapLocation()')
        }}
      >
        <View>
          <MaterialCommunityIcons name="target" size={28} color='#2882FF' />
        </View>
      </Pressable>
    </View>
    // </SafeAreaView>
  );
}
const { height } = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#F4F6F8",
    height: height - 40,
  },
  map: {
    // flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'lightgrey',
  },
  search: {
    flex: 1,
    position: 'absolute',
    paddingHorizontal: 12,
    top: Platform.OS === 'ios' ? 48 : 12,
    width: '100%',
    height: 44,
    zIndex: 1,
    elevation: 1
  },
  sidebar: {
    position: 'absolute',
    right: 12, top: 128,
    width: 36, height: 88,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  locate: {
    position: 'absolute',
    right: 12,
    bottom: Platform.OS == 'android' ? 120 : 64,
    backgroundColor: '#fff',
    width: 40, height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});