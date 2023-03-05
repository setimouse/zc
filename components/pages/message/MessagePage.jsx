import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import AlertImage from "../../../assets/alert.png"
import TaskImage from "../../../assets/task.png"

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
  },
  icon: {
    width: 48,
    height: 48,
    marginHorizontal: 12,
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  barge: {
    backgroundColor: '#F72727',
    position: 'absolute',
    right: -6,
    borderRadius: 7,
    paddingHorizontal: 4,
  },
  bargeText: {
    fontSize: 10,
    color: '#ffffff',
  },
  info: {
    borderBottomColor: '#DDDEDF',
    borderBottomWidth: 0.5,
    flex: 1,
  },
  title: {
    paddingTop: 11,
    fontWeight: 'bold',
    fontSize: 14,
    paddingBottom: 4,
    color: '#3E4146',

  },
  subtitle: {
    color: '#B0B1B3',
    fontSize: 12,
    marginBottom: 11,
  }
})

function Item(props) {
  return (
    <View style={styles.item}>
      <View style={styles.icon}>
        <Image style={styles.image} source={props.icon} />
        <View style={styles.barge}>
          <Text style={styles.bargeText}>{props.barge}</Text>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.subtitle}>{props.subtitle}</Text>
      </View>
    </View>
  )
}

export default function MessagePage(props) {
  return (
    <ScrollView style={{ backgroundColor: '#F4F6F8' }}>
      <Item barge={6} icon={AlertImage} title="告警提醒" subtitle="副标题文字" />
      <Item barge={99} icon={TaskImage} title="任务消息" subtitle="副标题文字" />
    </ScrollView>
  )
}