import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, Image, RefreshControl, Keyboard, } from 'react-native';
import SearchBarWidget from '../../widgets/SearchBarWidget';
import { MapContext } from '../../../webserve/MapContext';
import { FontAwesome } from '@expo/vector-icons';
import LoadingPage from '../common/LoadingPage';

export default function DeviceSearchPage() {
  const navigation = useNavigation();

  const { requestTargets, requestListTargetRealsDevice, requestStation } = useContext(MapContext)
  const [loading, setLoading] = useState(false);
  const [stageInfo, setStageInfo] = useState({ id: '', stage: null })

  const [result, setResult] = useState([])
  const keyword = useRef('')
  const pageNum = useRef(0)

  const [suggests, setSuggests] = useState([]);

  function reset() {
    pageNum.current = 0
    setResult([])
  }

  async function search() {
    setLoading(true)
    pageNum.current++
    requestTargets({ keywords: keyword.current, pageNum: pageNum.current, pageSize: 50 }).then(resp => resp.data.list)
      .then(data => data.map(r => {
        return {
          id: r.deviceId,
          device: {
            vehicleNo: r.consumerName,
            stage: '-',
            deviceId: r.deviceId,
          },
          info: r,
          stageTag: null,
        }
      }))
      .then(result => { console.log('result', result); return result })
      .then(data => pageNum.current > 1 ? result.concat(data) : data)
      .then(setResult)
      .then(() => { setLoading(false); })
      .catch(error => {
        console.log('error', error.message)
        setLoading(false)
      })
  }

  useEffect(() => {
    let deviceList = result.filter(e => e.stageTag === null).map(e => e.info.deviceId)
    if (deviceList.length < 1) return
    console.log('即将获取如下设备的实时信息', deviceList)
    result.forEach(e => e.stageTag = 1)
    requestListTargetRealsDevice({ deviceList: deviceList })
      .then(resp => resp.data)
      .then(list => {
        console.log("获取到设备实时信息", list)
        list.forEach(e => {
          requestStation({ x: e.x, y: e.y }).then(resp => resp.data)
            .then(data => {
              console.log('stage data', data)
              const stage = data.length > 0 ? data[0].fenceName ?? '-' : '-'
              console.log('stage', stage, e.deviceId, e.x, e.y)
              setStageInfo({ id: e.deviceId, stage: stage })
            })
            .catch(console.log)
        });
      })
  }, [result])

  useEffect(() => {
    result.forEach(e => {
      if (e.id !== stageInfo.id) return
      e.device.stage = stageInfo.stage ?? '-'
    })
    setResult(result)
  }, [stageInfo])

  useEffect(() => {
    reset()
    search()
  }, [])

  return (
    <View style={[styles.container]}>
      <SearchBarWidget
        placeholder="请输入标签编码"
        initStatus={{ isSearching: false, isResult: true }}
        resultPage={<Page result={result} isLoading={loading}
          onRefresh={() => {
            reset()
            search()
          }}
          onEndReached={() => {
            console.log('end reached')
            search()
          }}
        />}
        storeKey='device-search'
        onSubmit={(kw) => {
          reset()
          console.log('keyword', kw)
          keyword.current = kw
          search()
        }}
        rightButton={<BindHistory onPress={() => { navigation.navigate('device_bind_history') }} />}
        onChangeText={text => {
          if (text == '') {
            setSuggests([])
            return { isSearching: false, isResult: true }
          }
          requestTargets({ keywords: text, pageNum: 1, pageSize: 10 }).then(resp => resp.data.list)
            .then(list => list.map(e => e.deviceId).filter(e => e.indexOf(text) > -1).slice(0, 5))
            .then(setSuggests)
          return { isSearching: true, isResult: false }
        }}
        suggests={suggests}
      />
    </View>
  );
}

function BindHistory({ onPress }) {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 10, paddingVertical: 8,
      marginHorizontal: 8, marginVertical: 6,
      borderRadius: 4,
      justifyContent: 'center',
    }
  });

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={{ fontSize: 14, color: '#2882FF', fontWeight: 400 }}><FontAwesome name="history" size={14} color="#2882FF" /> 绑定记录</Text>
    </Pressable>
  )
}

function Item({ item, onDetailPress, onTargetPress }) {
  const styles = StyleSheet.create({
    searchbox: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      padding: 12,
      marginHorizontal: 12,
      marginTop: 8,
      backgroundColor: '#ffffff',
      borderRadius: 12,
    },
    left: {
      flex: 1,
      overflow: 'hidden',
      // backgroundColor: 'yellow',
    },
    right: {
      flex: 0,
      justifyContent: 'center',
      alignItems: 'flex-end',
      // backgroundColor: 'red',
      paddingLeft: 12,
    },
    infoText: {
      overflow: 'hidden',
      flexWrap: 'wrap',
      flex: 1,
    },
    icon: {
      width: 40,
      height: 24,
    },
    row: {
      flexDirection: 'row',
    },
    vehicle: {
      color: '#3E4146',
      lineHeight: 22,
    },
    vehicleNo: {
      color: '#2882FF',
    },
    vehicleFont: {
      fontSize: 14,
      fontWeight: 500,
    },
    infoFont: {
      fontSize: 12,
      lineHeight: 20,
    },
    unbind: {
      color: '#FF903C',
    }
  });

  return (
    <View style={styles.searchbox}>
      <View style={styles.left}>
        <Pressable onPress={() => onDetailPress && onDetailPress()}>
          <View style={[styles.row,]}>
            <Text style={[styles.vehicle, styles.vehicleFont]}>车号：</Text>
            <Text style={[styles.vehicle, styles.vehicleNo, styles.vehicleFont, styles.infoText, item.device.vehicleNo ? null : styles.unbind]}>
              {item.device.vehicleNo ?? '未绑定'}
            </Text>
          </View>
          <View style={[styles.row,]}>
            <Text style={[styles.infoFont]}>当前台位：{item.device.stage}</Text>
          </View>
          <View style={[styles.row,]}>
            <Text style={[styles.infoFont]}>标签编码：{item.device.deviceId}</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.right}>
        {item.info.consumerName &&
          <Pressable onPress={() => onTargetPress && onTargetPress()}>
            <Image style={styles.icon} source={require('../../../assets/locate.png')} />
          </Pressable>
        }
      </View>
    </View>
  )
}

function Page({ result, isLoading, onRefresh, onEndReached }) {
  const navigation = useNavigation();
  const [showRefresher, setShowRefresher] = useState(true);
  useEffect(() => {
    return () => {
      setShowRefresher(false)
      console.log('destruct')
    }
  }, [])

  return (
    <View style={{ width: '100%', flex: 1, }}>
      {result.length > 0 &&
        <FlatList style={{}}
          data={result}
          renderItem={({ item }) => (
            <Item item={item}
              onTargetPress={() => navigation.navigate('vehicle_map', { deviceId: item.info.deviceId })}
              onDetailPress={() => navigation.navigate('devicedetail', { targetId: item.info.id })}
            />
          )}
          keyExtractor={item => item.id}
          refreshControl={showRefresher &&
            <RefreshControl
              onRefresh={() => { onRefresh && onRefresh() }}
            />
          }
          onEndReached={onEndReached}
          onEndReachedThreshold={1}
          onScroll={() => { Keyboard.dismiss() }}
        />
        || (isLoading && <LoadingPage />)
        ||
        <View style={{ flex: 0.618, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#666' }}>暂无信息</Text>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  statusbar: {
    height: 44,
  },
  container: {
    backgroundColor: '#F7F8F8',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});