import React from "react";
import { StyleSheet, View, Text, SectionList } from "react-native";

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 13,
    paddingHorizontal: 12,
  },
  textKey: {
    fontSize: 14, fontWeight: 400,
    textAlign: "right",
    color: '#B0B1B3',
  },
  textValue: {
    fontSize: 14, fontWeight: 400,
    color: '#3E4146',
    textAlign: 'right',
  },
  roundTop: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  roundBottom: {
    borderBottomLeftRadius: 8, borderBottomRightRadius: 8,
  }
})

const Item = ({ info, index, section }) => {
  // console.log(index, "info=" + info, section.data)
  let value;
  if (typeof info.value === 'string') {
    value = <Text style={styles.textValue}>{info.value}</Text>
  } else {
    value = info.value;
  }
  return (
    <View style={[styles.item, index == 0 ? styles.roundTop : (index == section.data.length - 1 ? styles.roundBottom : null)]}>
      <Text style={styles.textKey}>{info.key}</Text>
      <View style={{ marginLeft: 12, flex: 1 }}>
        {value}
      </View>
    </View>
  )
};

export default function SectionGroupList({ data }) {
  const styles = StyleSheet.create({
    header: {
      borderLeftColor: '#2882FF', borderLeftWidth: 2,
      marginVertical: 8, paddingLeft: 8,
    },
    headerText: {
      fontSize: 14, color: '#3E4146', fontWeight: 500,
    },
  });
  return (
    <SectionList
      stickySectionHeadersEnabled={true}
      scrollEnabled={false}
      style={{ marginBottom: 24, }}
      sections={data}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item, index, section }) => <Item info={item} index={index} section={section} />}
      renderSectionHeader={({ section: { title } }) => (
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
      )}
      ItemSeparatorComponent={() => (<View style={{ height: 1, backgroundColor: '#fff', paddingHorizontal: 12, }}>
        <View style={{ height: 1, backgroundColor: '#DDDEDF', }}></View>
      </View>)}
    />
  )

}