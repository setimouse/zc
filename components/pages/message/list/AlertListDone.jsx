/**
 * 告警记录页面
 */
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { AlarmContext } from '../../../../webserve/AlarmContext';
import AlarmItemWidget from '../../../widgets/AlarmItemWidget';
import { useNavigation } from '@react-navigation/native';

export default function AlertListDone() {
  const navigation = useNavigation();

  const {
    alarmEndList,
    requestAlarmEnd,
    refreshAlarmEnd,
  } = useContext(AlarmContext)

  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    console.log('refreshing')
    refreshAlarmEnd()
  }, [])

  useEffect(() => {
    setIsRefreshing(false)
  }, [alarmEndList])

  return (
    <View style={{ flex: 1, backgroundColor: '#F4F6F8', }}>
      {
        (alarmEndList.length > 0 &&
          <FlatList
            data={alarmEndList}
            refreshControl={
              <RefreshControl refreshing={isRefreshing}
                onRefresh={() => {
                  // setIsRefreshing(true)
                  refreshAlarmEnd()
                }}
              />
            }
            onEndReached={requestAlarmEnd}
            onEndReachedThreshold={2}
            keyExtractor={item => item.alarmEventId}
            renderItem={({ item }) => (<AlarmItemWidget item={item}
              onPress={() => { navigation.navigate('alertdetail', { id: item.alarmEventId, type: 'done' }) }}
              onLocate={() => { navigation.navigate('history_map', { alert: item, type: 'history' }) }}
              statusMap={{
                0: { display: <Text style={{ fontSize: 12, color: '#F72727' }}>·未处理</Text> },
                1: { display: <Text style={{ fontSize: 12, color: '#2882FF' }}>·已处理</Text> },
              }}
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
