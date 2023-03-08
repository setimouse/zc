import React from "react";
import { StyleSheet, View, Text, SectionList } from "react-native";

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 13,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  textMiddle: {
    verticalAlign: 'middle',
    fontSize: 14,
  }
})

const Item = ({ info, index }) => {
  let value;
  if (typeof info.value === 'string') {
    value = <Text style={styles.textMiddle}>{info.value}</Text>
  } else {
    value = info.value;
  }
  return (
    <View style={styles.item}>
      <Text style={styles.textMiddle}>{info.key}</Text>
      {value}
    </View>
  )
};

export default function SectionGroupList(props) {
  return (
    <SectionList
      scrollEnabled={false}
      style={{ marginBottom: 24, }}
      sections={props.data}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item, index }) => <Item info={item} index={index} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={{ fontSize: 12, color: '#B0B1B3', padding: 8 }}>{title}</Text>
      )}
    />
  )

}