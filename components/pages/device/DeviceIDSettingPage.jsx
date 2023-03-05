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
  return (
    <View style={{ width: '100%', flex: 1, backgroundColor: '#F4F6F8' }}>
      <View style={{ marginBottom: 44, }}>
        <TextInput style={styles.input} clearButtonMode='always' placeholder="设置设备ID" />
      </View>
    </View>
  )
}
