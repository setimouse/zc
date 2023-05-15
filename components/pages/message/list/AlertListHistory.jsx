/**
 * 正在告警页面
 */
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { AlarmContext } from '../../../../webserve/AlarmContext';
import AlarmItemWidget from '../../../widgets/AlarmItemWidget';
import { useNavigation } from '@react-navigation/native';
import LoadingPage from '../../common/LoadingPage';
import ErrorPage, { ErrorType } from '../../common/ErrorPage';

export default function AlertListHistory() {
  const navigation = useNavigation();

  const {
    alarmHistoryList,
    requestAlarmHistory,
    refreshAlarmHistory,
  } = useContext(AlarmContext)

  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    console.log('refreshing')
    refreshAlarmHistory()
  }, [])

  useEffect(() => {
    if (alarmHistoryList.length > 0) {
      setIsRefreshing(false)
    }
    console.log('done')
  }, [alarmHistoryList])

  return (
    <View style={{ flex: 1, backgroundColor: '#F4F6F8', }}>
      {
        isRefreshing && <LoadingPage /> ||
        (
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
            onEndReached={requestAlarmHistory}
            onEndReachedThreshold={2}
            keyExtractor={item => item.alarmEventId + '' + item.alarmModelId + item.alarmModelName}
            renderItem={({ item }) => (<AlarmItemWidget item={item}
              onPress={() => { navigation.navigate('alertdetail', { id: item.alarmEventId, type: 'history' }) }}
              onLocate={() => { navigation.navigate('history_map', { alert: item, type: 'history' }) }}
            />)}
          />)
        || alarmHistoryList.length == 0 &&
        <ErrorPage type={ErrorType.NoData} style={{ position: 'absolute', zIndex: -1, backgroundColor: '#fff' }} />
      }
    </View>
  )
}
