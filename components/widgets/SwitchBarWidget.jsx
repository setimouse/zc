import React from "react";
import { StyleSheet, View, Text } from "react-native";

const styles = StyleSheet.create({
  bar: {
    justifyContent: "space-between",
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  item: {
    alignItems: "center",
    flex: 1,
    height: 42,
  },
  text: {
    flex: 1,
    textAlignVertical: "center",
    padding: 8,
    fontSize: 16,
    color: '#3E4146',
    fontWeight: 400,
  },
  checked: {
    color: '#2882FF',
    borderBottomColor: '#2882FF',
    borderBottomWidth: 2,
    fontWeight: 500,
  }
})

export default function SwitchBarWidget(props) {
  return (
    <View style={styles.bar}>
      <View style={[styles.item,]}>
        <Text style={[styles.text, styles.checked]}>全部</Text>
      </View>
      <View style={[styles.item]}>
        <Text style={styles.text}>待处理</Text>
      </View>
      <View style={[styles.item]}>
        <Text style={styles.text}>已完成</Text>
      </View>
    </View>
  )
}