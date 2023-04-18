import React from "react";
import WebView from "react-native-webview";
import { StyleSheet, View } from "react-native";
// import mapHtml from '../../resource/fmmap/test.html';
import mapHtml from "../../resource/fmmap/index";

var webView;

function FMMapWidget({ mapInfo, onMapReady }) {
  return (
    <View style={styles.container}>
      <WebView style={styles.webview}
        allowUniversalAccessFromFileURLs={true}
        allowingReadAccessToURL={true}
        allowFileAccess={true}
        allowFileAccessFromFileURLs={true}
        ref={c => webView = c}
        source={{ html: mapHtml(mapInfo) }}
        // source={{ uri: '../../resource/fmmap/test.html' }}
        // nativeConfig={{ props: { webContentsDebuggingEnabled: true } }}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    // backgroundColor: '#ff0',
  }
})

export default FMMapWidget;
export var webView;