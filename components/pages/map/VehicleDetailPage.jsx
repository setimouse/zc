import React from "react";
import { StyleSheet, View, Text, SectionList, Pressable, ScrollView } from "react-native";
import ButtonWidget from "../../widgets/ButtonWidget";
import SectionGroupList from "../../widgets/SectionGroupList";

export default function VehicleDetailPage(props) {
  const vehicle = props.vehicle;
  return (
    <View style={{ flex: 1, padding: 12, backgroundColor: '#F4F6F8' }}>
      <ScrollView>
        <SectionGroupList data={vehicle} />
        <ButtonWidget title="定位" />
      </ScrollView>
    </View>
  )
}
