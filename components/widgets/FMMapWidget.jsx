import React, { useEffect, useState } from "react";
import WebView from "react-native-webview";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import mapHtml from "../../resource/fmmap/index";

function FMMapWidget({ mapInfo, onMapReady, onWebViewRef }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.container}>
      {isLoading && <LoadingView />}
      <WebView style={styles.webview}
        allowUniversalAccessFromFileURLs={true}
        allowingReadAccessToURL={true}
        allowFileAccess={true}
        allowFileAccessFromFileURLs={true}
        ref={c => onWebViewRef && onWebViewRef(c)}
        source={{ html: mapHtml(mapInfo) }}
        // source={{ uri: '../../resource/fmmap/test.html' }}
        // nativeConfig={{ props: { webContentsDebuggingEnabled: true } }}
        javaScriptEnabled={true}
        scrollEnabled={false}
        onLoadStart={() => { setIsLoading(true) }}
        onLoadEnd={() => { setIsLoading(false) }}
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

function LoadingView() {
  return (
    <View style={{ position: 'absolute', top: '38.2%', center: '50%', alignSelf: 'center', zIndex: 100, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <View style={{
        backgroundColor: 'rgba(0 0 0 / .618)', padding: 12, borderRadius: 6,
      }}>
        <ActivityIndicator></ActivityIndicator>
        <Text style={{ marginTop: 8, color: '#fff' }}>正在载入地图</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    // backgroundColor: '#ff0',
  }
})

export default FMMapWidget;
