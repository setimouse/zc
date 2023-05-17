import React, { useContext, useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View, Pressable, ActivityIndicator, RefreshControl } from "react-native";
import AlertPending from '../../../assets/alert_pending.png';
import AlertDone from '../../../assets/alert_done.png';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AlarmContext } from "../../../webserve/AlarmContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import AlertListPending from "./list/AlertListPending";
import AlertListDone from "./list/AlertListDone";
import AlertListHistory from "./list/AlertListHistory";

const Tab = createMaterialTopTabNavigator();

export default function AlertListPage() {
  const { alarmingCount, alarmEndCount, alarmingList, alarmEndList, refreshAlarming, refreshAlarmEnd, requestAlarming, requestAlarmEnd } = useContext(AlarmContext);

  useEffect(() => {
    // console.log(refreshAlarming)
    // console.log(refreshAlarmEnd)
  }, [])

  let alarmBadge = (text) => {
    const styles = StyleSheet.create({
      pos: {
        marginTop: 4, marginRight: 4,
      },
      container: {
        backgroundColor: '#F72727',
        paddingHorizontal: 4, borderRadius: 7,
        // marginLeft: -20,
      },
      text: {
        color: '#fff', fontSize: 10,
      }
    });
    if (text == '' || text == '0') {
      return (<></>)
    }
    return (
      <View style={styles.pos}>
        <View style={styles.container}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    )
  }

  return (
    <Tab.Navigator screenOptions={{ tabBarPressColor: 'rgba(0 0 0/ 0)', tabBarLabelStyle: { fontSize: 16 }, tabBarActiveTintColor: '#2882FF', tabBarInactiveTintColor: '#3E4146' }}>
      <Tab.Screen name="pending" component={AlertListPending} options={{ title: '正在告警', tabBarBadge: () => alarmBadge(alarmingCount) }} />
      <Tab.Screen name="done" component={AlertListDone} options={{ title: '告警记录', tabBarBadge: () => alarmBadge(alarmEndCount) }} />
      <Tab.Screen name="history" component={AlertListHistory} initialParams={{}} options={{ title: '处理记录' }} />
    </Tab.Navigator>
  )
}