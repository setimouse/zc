import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { MapContext } from "../../../webserve/MapContext";
import SearchBarWidget from "../../widgets/SearchBarWidget";
import SearchResultItemWidget from '../../widgets/SearchResultItemWidget';

export default function MapSearchPage() {
  const { requestListTargetReals } = useContext(MapContext)
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
        }
      }))
      .then(result => setSearchResult({ result: result }))
      .catch(console.log)
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
        resultPage={<Page result={searchResult} />}
        onSubmit={(keyword) => search({ consumerName: keyword })}
      />
    </View >
  )
}

function Page({ result }) {
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F7F8F8',
      flex: 1,
    },
  });

  console.log("page result:", result);
  return (
    <View style={[{ width: '100%' }]}>
      <FlatList style={{ height: '100%' }}
        data={result.result}
        renderItem={({ item }) => (
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
          />)}
        keyExtractor={item => item.id}
      />
    </View>
  )
}
