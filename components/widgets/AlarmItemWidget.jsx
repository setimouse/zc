import React, { } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import MapIcon from '../../assets/map_icon.png';
import LocateIcon from '../../assets/locate.png';

export default function AlarmItemWidget({ item, onPress, onLocate, statusMap }) {
  const styles = StyleSheet.create({
    item: {
      marginTop: 16,
      backgroundColor: '#fff', marginHorizontal: 12, borderRadius: 8,
    },
    head: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingVertical: 10, marginHorizontal: 12,
      borderBottomColor: '#DDDEDF', borderBottomWidth: 1,
    },
    mapIcon: {
      width: 16, height: 16,
      marginRight: 4,
    },
    mapName: {
      flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    },
    body: {
      paddingHorizontal: 12, paddingVertical: 10,
    },
    titleView: {
      marginBottom: 8,
    },
    title: {
      fontSize: 14, fontWeight: 500, color: '#333333',
    },
    info: {
      flexDirection: 'row',
    },
    infoText: {
      color: '#3E4146', fontSize: 12, fontWeight: 400,
      lineHeight: 20,
    },
    icon: {
      width: 40, height: 24,
    }
  })

  // const statusMap = 
  if (statusMap == undefined) {
    statusMap = {
      0: { display: <Text style={{ fontSize: 12, color: '#FF903C' }}>·待处理</Text> },
      1: { display: <Text style={{ fontSize: 12, color: '#2882FF' }}>·已处理</Text> },
    }
  }
  let processingStatus = statusMap[item.processingStatus]

  return (
    <View style={styles.item}>
      <View style={styles.head}>
        <View style={styles.mapName}>
          <Image style={styles.mapIcon} source={MapIcon} />
          <Text style={{ fontSize: 12, color: '#3E4146', }}>{item.mapName}</Text></View>
        <View style={styles.status}>{processingStatus && processingStatus.display}</View>
      </View>
      <View style={styles.body}>
        <Pressable onPress={onPress}>
          <View style={styles.titleView}>
            <Text style={styles.title}>{item.alarmModelName}</Text>
          </View>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <View>
              <View style={styles.info}><Text style={styles.infoText}>告警车辆：</Text><Text style={styles.infoText}>{item.targetName}</Text></View>
              <View style={styles.info}><Text style={styles.infoText}>告警时间：</Text><Text style={styles.infoText}>{item.createTime}</Text></View>
            </View>
            {
              // item.mapId != '0' &&
              <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center', }}>
                <Pressable onPress={onLocate} style={{ paddingLeft: 18, paddingVertical: 12, alignItems: 'flex-end' }}>
                  <Image style={styles.icon} source={LocateIcon} />
                </Pressable>
              </View>
            }
          </View>
        </Pressable>
      </View >
    </View >
  )
}