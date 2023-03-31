import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { MapContext } from "../../../webserve/MapContext";
import SearchBarWidget from "../../widgets/SearchBarWidget";
import SearchResultItemWidget from '../../widgets/SearchResultItemWidget';

export default function MapSearchPage() {
  const { requestListTargetReals, requestStation } = useContext(MapContext)
  const [searchResult, setSearchResult] = useState([]);

  let search = async ({ consumerName }) => {
    requestListTargetReals({ consumerName: consumerName })
      .then(resp => resp.data)
      .then(data => data.map(e => {
        return {
          id: e.deviceId,
          items: [
            { key: '车号', value: e.consumerName },
            { key: '当前台位', value: '' },
            { key: '设备编号', value: e.deviceId },
          ],
          info: e,
          stage: null, // 台位信息
        }
      }))
      .then(result => {
        setSearchResult(result)
        return result
      })
      .catch(console.log)
  }

  useEffect(() => {
    let changed = false
    searchResult.forEach(e => {
      if (e.stage !== null) {
        return
      }
      e.stage = 1
      changed |= true
      requestStation({ x: e.info.x, y: e.info.y }).then(resp => resp.data)
        .then(data => {
          const stage = data.length > 0 ? data[0].fenceName : '-'
          console.log('stage', stage)
          e.items.forEach((e, i) => {
            if (e.key == '当前台位') e.value = stage
          })
          updateStage(searchResult)
        })
    })
    changed && setSearchResult(searchResult)
  }, [searchResult])

  function updateStage(searchResult) {
    setSearchResult(searchResult)
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
          onRequestStation={({ item }) => { }}
        />}
        onSubmit={(keyword) => search({ consumerName: keyword })}
      />
    </View >
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
      <FlatList style={{ height: '100%' }}
        data={result}
        renderItem={({ item }) => {
          if (item.stage === null) {
            onRequestStation && onRequestStation({ item })
          }
          return (
            <SearchResultItemWidget item={item}
              detailText="车辆详情"
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
      />
    </View>
  )
}
