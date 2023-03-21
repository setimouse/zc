import React from "react";
import WebView from "react-native-webview";
import { StyleSheet, View } from "react-native";
import mapHtml from '../../resource/fmmap/index.js';

function FMMapWidget({ mapInfo }) {
  console.log(mapInfo)
  return (
    <View style={styles.container}>
      <WebView style={styles.webview}
        source={{ html: mapHtml(mapInfo) }}
        // nativeConfig={{ props: { webContentsDebuggingEnabled: true } }}
        javaScriptEnabled={true}
        scrollEnabled={false}
      // onMessage={this.onWebViewMessage}
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