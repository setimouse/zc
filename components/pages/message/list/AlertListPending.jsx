/**
 * 正在告警页面
 */
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { AlarmContext } from '../../../../webserve/AlarmContext';
import AlarmItemWidget from '../../../widgets/AlarmItemWidget';
import { useNavigation } from '@react-navigation/native';
import ErrorPage, { ErrorType } from '../../common/ErrorPage';
import LoadingPage from '../../common/LoadingPage';

export default function AlertListPending() {
  const navigation = useNavigation();

  const {
    alarmingList,
    requestAlarming,
    refreshAlarming,
  } = useContext(AlarmContext)

  const [isRefreshing, setIsRefreshing] = useState(false);

  let refreshCallback = () => {
    setIsRefreshing(false)
  }

  useEffect(() => {
    console.log('refreshing pending')
    setIsRefreshing(true)
    refreshAlarming(refreshCallback)
  }, [])

  let listView = (
    <>
      <FlatList
        data={alarmingList}
        refreshControl={
          <RefreshControl refreshing={isRefreshing}
            onRefresh={() => {
              setIsRefreshing(true)
              refreshAlarming(refreshCallback)
            }}
          />
        }
        onEndReached={requestAlarming}
        onEndReachedThreshold={2}
        keyExtractor={item => item.alarmEventId + '' + item.alarmModelId + item.alarmModelName}
        renderItem={({ item }) => (<AlarmItemWidget item={item}
          onPress={() => { navigation.navigate('alertdetail', { id: item.alarmEventId, type: 'pending' }) }}
          onLocate={() => navigation.navigate('vehicle_map', { deviceId: item.deviceId })}
          statusMap={{}}
        />)}
      />
      {alarmingList.length == 0 &&
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
