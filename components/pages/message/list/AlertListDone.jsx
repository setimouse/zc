/**
 * 告警记录页面
 */
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { AlarmContext } from '../../../../webserve/AlarmContext';
import AlarmItemWidget from '../../../widgets/AlarmItemWidget';
import { useNavigation } from '@react-navigation/native';
import ErrorPage, { ErrorType } from '../../common/ErrorPage';
import LoadingPage from '../../common/LoadingPage';

export default function AlertListDone() {
  const navigation = useNavigation();

  const {
    alarmEndList,
    requestAlarmEnd,
    refreshAlarmEnd,
  } = useContext(AlarmContext)

  const [isRefreshing, setIsRefreshing] = useState(false);

  let refreshCallback = () => {
    setIsRefreshing(false)
  }

  useEffect(() => {
    setIsRefreshing(true)
    console.log('refreshing')
    refreshAlarmEnd(refreshCallback)
  }, [])

  let listView = (
    <>
      <FlatList
        data={alarmEndList}
        refreshControl={
          <RefreshControl refreshing={isRefreshing}
            onRefresh={() => {
              setIsRefreshing(true)
              refreshAlarmEnd(refreshCallback)
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
      />
      {alarmEndList.length == 0 &&
        <ErrorPage type={ErrorType.NoData} style={{ position: 'absolute', zIndex: -1, backgroundColor: '#fff' }} />
      }
    </>
  )

  return (
    <View style={{ flex: 1, backgroundColor: '#F4F6F8', }}>
      {isRefreshing && <LoadingPage /> || (listView)}
    </View>
  )
}
