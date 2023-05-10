/**
 * 正在告警页面
 */
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { AlarmContext } from '../../../../webserve/AlarmContext';
import AlarmItemWidget from '../../../widgets/AlarmItemWidget';
import { useNavigation } from '@react-navigation/native';
import LoadingPage from '../../common/LoadingPage';

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
            onEndReached={requestAlarmHistory}
            onEndReachedThreshold={1}
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
