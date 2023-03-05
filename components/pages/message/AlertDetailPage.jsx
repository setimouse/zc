import React from "react";
import { StyleSheet, View, Text, SectionList, ScrollView } from "react-native";
import ButtonWidget from "../../widgets/ButtonWidget";
import SectionGroupList from "../../widgets/SectionGroupList";

export default function AlertDetailPage(props) {
  const device = props.device;
  return (
    <View style={{ flex: 1, padding: 12, backgroundColor: '#F4F6F8' }}>
      <ScrollView>
        <SectionGroupList data={device} />
      </ScrollView>
    </View>
  )
}
