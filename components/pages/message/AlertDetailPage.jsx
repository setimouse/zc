import React from "react";
import { StyleSheet, View, Text, SectionList, ScrollView } from "react-native";
import ButtonWidget from "../../widgets/ButtonWidget";
import SectionGroupList from "../../widgets/SectionGroupList";

export default function AlertDetailPage(props) {
  const device = props.device;
  return (
    <View style={{ flex: 1, backgroundColor: '#F4F6F8' }}>
      <ScrollView style={{ padding: 12 }} showsVerticalScrollIndicator={false}>
        <SectionGroupList data={device} />
      </ScrollView>
    </View>
  )
}
