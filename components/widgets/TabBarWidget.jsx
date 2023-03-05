import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import IconMessage from '../../assets/icon_message.png';
import IconMessageChecked from '../../assets/icon_message_checked.png';
import IconMap from '../../assets/icon_map.png';
import IconMapChecked from '../../assets/icon_map_checked.png';
import IconProfile from '../../assets/icon_profile.png';
import IconProfileChecked from '../../assets/icon_profile_checked.png';

const styles = StyleSheet.create({
  bar: {
    justifyContent: "space-between",
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 56,
  },
  item: {
    alignItems: "center",
    flex: 1,
    height: '100%',
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

export default function TabBarWidget(props) {
  const icons = [
    { title: '消息', icon: IconMessage, checked: IconMessageChecked, },
    { title: '地图', icon: IconMap, checked: IconMapChecked, },
    { title: '我的', icon: IconProfile, checked: IconProfileChecked, },
  ]
  return (
    <View style={styles.bar}>
      {
        icons.map((e, i) => (
          <View key={i} style={[styles.item]}>
            <Icon icon={i === props.checked ? e.checked : e.icon} title={e.title} />
          </View>))
      }
    </View>
  )
}

function Icon(props) {
  const s = StyleSheet.create({
    image: {
      width: 28,
      height: 28,
    },
    text: {
      fontSize: 10,
      textAlign: "center",
    }
  })
  return (
    <View>
      <View style={{ marginTop: 7 }}>
        <Image style={s.image} source={props.icon} />
      </View>
      <View>
        <Text style={s.text}>{props.title}</Text>
      </View>
    </View>
  )
}
