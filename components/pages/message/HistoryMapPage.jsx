/**
 * 历史告警地图
 */
import { useRoute } from '@react-navigation/native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import mapHtml from '../../../resource/fmmap';
import { MapContext } from '../../../webserve/MapContext';
import { AlarmContext } from '../../../webserve/AlarmContext';

export default function HistoryMapPage() {
  const route = useRoute();
  console.log('route', route);
  const [mapInfo, setMapInfo] = useState();
  const [mapReady, setMapReady] = useState(false);
  // const [webView, setWebView] = useState();
  // const webView = useRef()
  const [coordinate, setCoordinate] = useState();
  const { requestIndoorMap, } = useContext(MapContext)
  const { requestAlarmRecordDetail } = useContext(AlarmContext)

  const alert = route.params.alert ?? {}

  var webView;

  useEffect(() => {
    requestIndoorMap({ id: alert.mapId }).then(resp => {
      setMapInfo(resp.data)
    }).catch(error => console.log("Oops", error.message))
    requestAlarmRecordDetail({ eventId: alert.alarmEventId })
      .then(data => setCoordinate({ x: data.orginalData.x, y: data.orginalData.y }))
  }, [])

  useEffect(() => {
    if (coordinate === undefined || mapReady !== true || webView === null || mapInfo == undefined) {
      return
    }
    let device = {
      consumerName: alert.targetName,
      consumerTypeIcon: '/static/images/pages/truck.png',
      deviceId: alert.deviceId,
      x: coordinate.x, y: coordinate.y,
      baseFloor: 1, // 中车的先固定用1吧
    }
    let deviceJson = JSON.stringify(device)
    console.log(deviceJson)
    webView.injectJavaScript(`addMarker(${deviceJson})`)
    webView.injectJavaScript(`setMapCenter(${coordinate.x}, ${coordinate.y})`)
  }, [coordinate, mapReady, webView, mapInfo])

  return (
    <View style={{ flex: 1 }}>
      <MapView mapInfo={mapInfo}
        onMapReady={() => { setMapReady(true) }}
        onWebViewRef={c => webView = c}
      />
    </View>
  )
}

function MapView({ mapInfo, onMapReady, onWebViewRef }) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  })

  return (
    <View style={styles.container}>
      <WebView style={styles.webview}
        allowUniversalAccessFromFileURLs={true}
        allowingReadAccessToURL={true}
        allowFileAccess={true}
        allowFileAccessFromFileURLs={true}
        ref={c => { onWebViewRef(c) }}
        source={{ html: mapHtml(mapInfo) }}
        javaScriptEnabled={true}
        scrollEnabled={false}
        onMessage={event => {
          const message = event.nativeEvent.data;
          console.log("webview message received:", message)
          switch (message) {
            case "mapready":
              onMapReady && onMapReady()
              break;

            default:
              console.log("webview message received:", message)
              break;
          }
        }}
      />
    </View>
  )
}