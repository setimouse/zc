import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text, Pressable, Image } from "react-native";
import { MapContext } from "../../../webserve/MapContext";
import SearchBarWidget from "../../widgets/SearchBarWidget";
import SearchResultItemWidget from '../../widgets/SearchResultItemWidget';

export default function MapSearchPage() {
  const { requestListTargetReals, requestStation } = useContext(MapContext)
  const [searchResult, setSearchResult] = useState([]);
  const [stageInfo, setStageInfo] = useState({ id: '', stage: null })

  useEffect(() => {
    console.log('stage info', stageInfo)
    searchResult.forEach(e => {
      if (e.id !== stageInfo.id) {
        return
      }
      e.items.forEach(kv => {
        if (kv.key == '当前台位') kv.value = stageInfo.stage === '' ? '-' : stageInfo.stage
      })
    })
    setSearchResult(searchResult)
    console.log('after', stageInfo)
  }, [stageInfo])

  let search = async ({ consumerName }) => {
    requestListTargetReals({ consumerName: consumerName })
      .then(resp => resp.data)
      .then(data => data.map(e => {
        return {
          id: e.deviceId,
          vehicle: {
            no: e.consumerName,
            stage: '',
            deviceId: e.deviceId,
          },
          items: [
            { key: '车号', value: e.consumerName },
            { key: '当前台位', value: '' },
            { key: '标签编码', value: e.deviceId },
          ],
          info: e,
          stageTag: null,
        }
      }))
      .then(setSearchResult)
  }

  return (
    <View style={{
      backgroundColor: '#F7F8F8',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }}>
      <SearchBarWidget
        storeKey="map-search"
        resultPage={<Page result={searchResult}
          onRequestStation={({ item }) => {
            if (item.stageTag) {
              return
            }
            item.stageTag = 1
            // console.log(item)
            const info = item.info
            requestStation({ x: info.x, y: info.y }).then(resp => resp.data)
              .then(data => {
                const stage = data.length > 0 ? data[0].fenceName ?? '-' : '-'
                console.log('stage', stage, info.deviceId, info.x, info.y)
                setStageInfo({ id: item.id, stage: stage })
                setStageInfo({ id: '------------', stage: stage })
              })
              .catch(console.log)
          }}
        />}
        onSubmit={(keyword) => search({ consumerName: keyword })}
      />
    </View >
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
    }
  });

  return (
    <View style={styles.searchbox}>
      <View style={styles.left}>
        <Pressable onPress={() => onDetailPress && onDetailPress()}>
          <View style={[styles.row,]}>
            <Text style={[styles.vehicle, styles.vehicleFont]}>车号：</Text>
            <Text style={[styles.vehicle, styles.vehicleNo, styles.infoText]}>{item.vehicle.no}</Text>
          </View>
          <View style={[styles.row,]}>
            <Text style={[styles.infoFont]}>当前台位：{item.vehicle.stage}</Text>
          </View>
          <View style={[styles.row,]}>
            <Text style={[styles.infoFont]}>设备编号：{item.vehicle.deviceId}</Text>
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

function Page({ result, onRequestStation }) {
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F7F8F8',
      flex: 1,
    },
  });

  return (
    <View style={[{ width: '100%' }]}>
      <FlatList style={{ height: '100%', }}
        data={result}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          onRequestStation && onRequestStation({ item })
          return (
            <Item item={item}
              onTargetPress={() => navigation.navigate('mapmain', { deviceId: item.info.deviceId })}
              onDetailPress={() => navigation.navigate('vehicledetail', { vehicle: item.info })}
            />
          )
        }}
      />
      {/* <FlatList style={{ height: '100%' }}
        data={result}
        renderItem={({ item }) => {
          onRequestStation && onRequestStation({ item })
          return (
            <SearchResultItemWidget item={item}
              // detailText="车辆详情"
              onTargetPress={() => {
                navigation.navigate('mapmain', {
                  deviceId: item.info.deviceId
                })
              }}
              onDetailPress={() => {
                navigation.navigate('vehicledetail', {
                  vehicle: item.info
                })
              }}
            />)
        }}
        keyExtractor={item => item.id}
      /> */}
    </View>
  )
}
