/**
 * 车辆定位
 */
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import FMMapWidget, { webView } from '../../widgets/FMMapWidget';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { MapContext } from '../../../webserve/MapContext';
import { AuthContext } from '../../../webserve/AuthContext';

export default function VehicleMapPage({ route }) {
  const [mapInfo, setMapInfo] = useState();
  const [target, setTarget] = useState({});
  const [mapReady, setMapReady] = useState();

  const { requestTargetInsideMap, requestIndoorMap,
    requestListTargetRealsDevice } = useContext(MapContext);
  const { siteSetting } = useContext(AuthContext)

  const deviceId = route.params['deviceId']

  useEffect(() => {
    requestTargetInsideMap({ deviceId: deviceId }).then(json => json.data).then(setTarget)
  }, [])

  useEffect(() => {
    console.log('target is', target)
    if (target.mapId == undefined) return
    requestIndoorMap({ id: target.mapId }).then(json => json.data).then(setMapInfo)
  }, [target])

  useEffect(() => {
    if (mapReady == undefined) {
      return;
    }
    console.log('map ready')
    const timeout = setTimeout(() => {
      refreshDevice()
    }, 500);
    const interval = __DEV__ ? 3 * 1000 : siteSetting.realDataLoopInterval;
    let timer = setInterval(() => {
      refreshDevice()
    }, interval);
    return () => {
      clearInterval(timer)
      clearTimeout(timeout)
    }
  }, [mapReady])

  const refreshDevice = () => {
    console.log('refresh device')
    requestListTargetRealsDevice({ consumerStatus: 1, deviceList: [deviceId] })
      .then(resp => resp.data)
      .then(list => {
        let deviceListJson = JSON.stringify(list)
        console.log('move devices:', list)
        if (list.length < 1) {
          return
        }
        webView.injectJavaScript(`moveMarkers(${deviceListJson})`)
        let device = list[0];
        webView.injectJavaScript(`focusDevice(${JSON.stringify(device)})`)
      })
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.map}>
        <FMMapWidget mapInfo={mapInfo}
          onMapReady={() => { setMapReady(new Date()) }}
        />
      </View>
      {mapInfo && mapInfo.name &&
        <View style={styles.current}>
          <Text style={styles.currentText}>当前地图: {mapInfo.name}</Text>
        </View>
      }
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },
  map: {
    // flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'lightgrey',
  },
  current: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  currentText: {
    fontSize: 14,
    fontWeight: 500,
    color: '#B0B1B3',
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
    right: 12,
    top: Platform.OS == 'android' ? 80 : 128,
    width: 36, height: 88,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  locate: {
    position: 'absolute',
    right: 9,
    bottom: Platform.OS == 'android' ? 110 : 32,
    backgroundColor: '#fff',
    width: 40, height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});