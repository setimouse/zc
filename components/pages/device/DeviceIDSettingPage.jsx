/**
 * 设置标签编码
 */
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Image, View, Text, SectionList, ScrollView, TextInput } from "react-native";
import ButtonWidget from "../../widgets/ButtonWidget";

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 48,
    backgroundColor: 'white',
    padding: 12,
  }
});

export default function DeviceIDSettingPage(props) {
  const navigation = useNavigation();

  return (
    <View style={{ width: '100%', flex: 1, backgroundColor: '#F4F6F8' }}>
      <View style={{ marginBottom: 44, }}>
        <TextInput style={styles.input} clearButtonMode='always' placeholder="设置标签编码" />
      </View>
      <View style={{ marginHorizontal: 12 }}>
        <ButtonWidget title="保存" onPress={() => navigation.goBack()} />
      </View>
    </View>
  )
}
