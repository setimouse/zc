import React, { useContext, useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View, Pressable, ActivityIndicator, RefreshControl } from "react-native";
import AlertPending from '../../../assets/alert_pending.png';
import AlertDone from '../../../assets/alert_done.png';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AlarmContext } from "../../../webserve/AlarmContext";
import { useNavigation } from "@react-navigation/native";

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
        <Pressable onPress={() => {
          navigation.navigate('alertdetail', {
            id: data.alarmEventId,
            onGoBack: () => { console.log('go back!!!!!') }
          })
        }}>
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

function AlertList(props) {
  const { alarmEvent, alarmItems } = useContext(AlarmContext)
  const params = props.route.params;
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [loadError, setLoadError] = useState()

  const loadAlarmEvent = () => {
    setIsLoading(true)
    alarmEvent({ processingStatus: params.processingStatus, pageSize: 1000, })
      .then(resp => { console.log('resp', resp); setData(resp.list) })
      .then(() => {
        setIsLoading(false)
        setIsRefreshing(false)
      })
      .catch(error => {
        console.log('alert list error', error)
        setLoadError(error.message)
        setIsLoading(false)
        setIsRefreshing(false)
      })
  }

  useEffect(function () {
    loadAlarmEvent()
    return () => {
    }
  }, [alarmItems])

  return (
    <View style={{ flex: 1, backgroundColor: '#F4F6F8', }}>
      {(isLoading && !isRefreshing)
        && <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator></ActivityIndicator>
        </View>
        || (data.length > 0 &&
          <FlatList
            data={data}
            refreshControl={
              <RefreshControl refreshing={isRefreshing}
                onRefresh={() => {
                  setIsRefreshing(true)
                  loadAlarmEvent()
                }}
              />
            }
            keyExtractor={item => item.alarmEventId}
            renderItem={({ item }) => <Item item={item} navigation={props.navigation} />}
          />)
        || (loadError &&
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ color: '#f00', textAlign: 'center', marginHorizontal: 24, }}>{loadError}</Text>
          </View>)
        || (data.length == 0 &&
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center', marginHorizontal: 24 }}>没有告警信息</Text>
          </View>)
      }
    </View>
  )
}

export default function AlertListPage() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="pending" component={AlertList} initialParams={{ processingStatus: 0 }} options={{ title: '未处理' }} />
      <Tab.Screen name="done" component={AlertList} initialParams={{ processingStatus: 1 }} options={{ title: '已完成' }} />
      <Tab.Screen name="all" component={AlertList} initialParams={{}} options={{ title: '全部' }} />
    </Tab.Navigator>
  )
}