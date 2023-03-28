/**
 * 设置型号图片
 */
import { useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Image, View, Text, SectionList, ScrollView } from "react-native";
import ButtonWidget from "../../widgets/ButtonWidget";

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  }
});
export default function DeviceModelSettingPage() {
  const route = useRoute()
  const device = route.params.device

  return (
    <View style={{ width: '100%', flex: 1, backgroundColor: '#F4F6F8' }}>
      <View style={{ marginBottom: 44, }}>
        <Image source={device.img} style={styles.image} />
      </View>
      <View style={{ paddingHorizontal: 12 }}>
        <ButtonWidget title="上传图片" />
      </View>
    </View>
  )
}
