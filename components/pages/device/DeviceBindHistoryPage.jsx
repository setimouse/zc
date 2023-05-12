/**
 * 绑定记录
 */
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, Image } from 'react-native';
import SearchBarWidget from '../../widgets/SearchBarWidget';
import { MapContext } from '../../../webserve/MapContext';
import LoadingPage from '../common/LoadingPage';

export default function DeviceBindHistoryPage() {
  const navigation = useNavigation();

  const { requestBindedTargets } = useContext(MapContext)

  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false);

  async function search(keywords) {
    setLoading(true)
    requestBindedTargets({ keywords: keywords }).then(resp => resp.data.list)
      .then(data => data.map(r => {
        return {
          id: r.id,
          device: {
            vehicleNo: r.consumerName,
            stage: '',
            deviceId: r.deviceId,
            bindTime: r.consumerTime,
          },
          info: r,
        }
      }))
      .then(setResult)
      .then(() => setLoading(false))
      .catch(error => { console.log('error', error.message); setLoading(false) })
  }

  useEffect(() => {
    search('')
  }, [])

  return (
    <View style={[styles.container]}>
      <SearchBarWidget
        placeholder="请输入标签编码"
        initStatus={{ isSearching: false, isResult: true }}
        resultPage={<Page result={result} isLoading={loading} />}
        storeKey='device-bind-history'
        onSubmit={(keywords) => {
          console.log('keywords', keywords)
          search(keywords)
        }}
      />
    </View>
  );
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
    },
    right: {
      flex: 0,
      justifyContent: 'center',
      alignItems: 'flex-end',
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
          <View style={[styles.row,]}>
            <Text style={[styles.infoFont]}>绑定时间：{item.device.bindTime}</Text>
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

function Page({ result, isLoading }) {
  const navigation = useNavigation();
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