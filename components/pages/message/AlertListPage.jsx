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

const styles = StyleSheet.create({
  item: {
    marginTop: 16,
  },
  header: {
    marginBottom: 8,
  },
  headerText: {
    textAlign: 'center',
    color: '#B0B1B3',
    fontSize: 12,
  },
})

function Header({ title }) {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  )
}

function Body(props) {
  const s = StyleSheet.create({
    body: {
      backgroundColor: '#fff',
      height: 108,
      marginHorizontal: 12,
      borderRadius: 8,
      paddingHorizontal: 12, paddingVertical: 9,
    },
    headline: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomColor: '#DDDEDF',
      borderBottomWidth: 0.5,
      paddingBottom: 10,
    },
    status: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      width: 16, height: 16,
      marginRight: 4,
    },
    statusText: {
      color: '#3E4146',
      fontSize: 12,
    },
    detail: {
      fontSize: 12,
      color: '#B0B1B3',
    },
    alert: {
      marginTop: 12,
    },
    title: {
      color: '#333333',
      fontWeight: 'bold',
      fontSize: 14,
      marginBottom: 4,
    },
    brief: {
      color: '#B0B1B3',
      fontSize: 12,
    }
  })

  const data = props.data

  const statusMap = {
    0: { title: '告警消息待处理', icon: AlertPending, },
    1: { title: '告警消息已处理', icon: AlertDone, }
  }

  const status = statusMap[data.processingStatus];
  const title = status['title'] ?? '未知状态';
  const icon = status['icon'] ?? <></>;
  const navigation = useNavigation();
  return (
    <View style={s.body}>
      <View style={s.headline}>
        <View style={s.status}>
          <Image style={s.icon} source={icon} />
          <Text style={s.statusText}>{title}</Text>
        </View>
        <Pressable onPress={() => { navigation.navigate('alertdetail', { id: data.alarmEventId, }) }}>
          <View>
            <Text style={s.detail}>告警详情 &raquo;</Text>
          </View>
        </Pressable>
      </View>
      <View style={s.alert}>
        <Text style={s.title}>{data.alarmModelName}</Text>
        <Text style={s.brief}>{data.triggerTypeName}</Text>
      </View>
    </View>
  )
}

function Item(props) {
  return (
    <View style={styles.item}>
      <Header title={props.item.createTime} />
      <Body data={props.item} navigation={props.navigation} />
    </View>
  )
}

function AlertList() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F4F6F8', }}>
      {
        isRefreshing && <LoadingPage /> ||
        (alarmHistoryList.length > 0 &&
          <FlatList
            data={alarmHistoryList}
            refreshControl={
              <RefreshControl refreshing={isRefreshing}
                onRefresh={() => {
                  setIsRefreshing(true)
                  refreshAlarmHistory()
                }}
              />
            }
            keyExtractor={item => item.alarmEventId + '' + item.alarmModelId + item.alarmModelName}
            renderItem={({ item }) => (<AlarmItemWidget item={item}
              onPress={() => { navigation.navigate('alertdetail', { id: item.alarmEventId }) }}
            />)}
          />)
        // || (loadError &&
        //   <View style={{ flex: 1, justifyContent: 'center' }}>
        //     <Text style={{ color: '#f00', textAlign: 'center', marginHorizontal: 24, }}>{loadError}</Text>
        //   </View>)
        // || (data.length == 0 &&
        //   <View style={{ flex: 1, justifyContent: 'center' }}>
        //     <Text style={{ textAlign: 'center', marginHorizontal: 24 }}>没有告警信息</Text>
        //   </View>)
      }
    </View>
  )
}

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
    return (
      <View style={styles.pos}>
        <View style={styles.container}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    )
  }

  return (
    <Tab.Navigator>
      <Tab.Screen name="pending" component={AlertListPending} options={{ title: '正在告警', tabBarBadge: () => alarmBadge(alarmingCount) }} />
      <Tab.Screen name="done" component={AlertListDone} options={{ title: '告警记录', tabBarBadge: () => alarmBadge(alarmEndCount) }} />
      <Tab.Screen name="history" component={AlertListHistory} initialParams={{}} options={{ title: '处理记录' }} />
    </Tab.Navigator>
  )
}