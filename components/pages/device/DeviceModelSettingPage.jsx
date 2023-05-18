/**
 * 设置型号图片
 */
import { useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Image, View } from "react-native";

const styles = StyleSheet.create({
  frame: {
    // justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: '85.4%',
    height: undefined,
    aspectRatio: 1,
  }
});
export default function DeviceModelSettingPage() {
  const route = useRoute()
  const device = route.params.device

  return (
    <View style={{ flex: 1, width: '100%', backgroundColor: '#F4F6F8' }}>
      <View style={styles.frame}>
        <Image source={device.img} style={styles.image} />
      </View>
      {/* <View style={{ paddingHorizontal: 12 }}>
        <ButtonWidget title="上传图片" />
      </View> */}
    </View>
  )
}
