import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import SearchBarWidget from "../../widgets/SearchBarWidget";
import SearchResultItemWidget from '../../widgets/SearchResultItemWidget';

function Page(props) {
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F7F8F8',
      flex: 1,
    },
  });

  return (
    <View style={{ width: '100%' }}>
      <FlatList style={{ height: '100%' }}
        data={props.result}
        renderItem={({ item }) => (
          <SearchResultItemWidget item={item}
            detailText="车辆详情"
            onTargetPress={() => { navigation.navigate('mapmain') }}
            onDetailPress={() => { navigation.navigate('vehicledetail') }}
          />)}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

export default function MapSearchPage({ suggests }) {
  return (
    <View style={{ flex: 1 }}>
      <SearchBarWidget suggests={suggests} resultPage={<Page result={searchResult} />} />
    </View >
  )
}

const searchResult = [
  {
    id: 1,
    items: [
      { key: '车号', value: '330033' },
      { key: '当前台位', value: '台位1' },
      { key: '设备编号', value: 'CU-XXXX-3894' },
    ],
  },
  {
    id: 2,
    items: [
      { key: '车号', value: '330123' },
      { key: '当前台位', value: '台位2' },
      { key: '设备编号', value: 'CU-XXXX-3895' },
    ],
  },
  {
    id: 3,
    items: [
      { key: '车号', value: '330045' },
      { key: '当前台位', value: '台位3' },
      { key: '设备编号', value: 'CU-XXXX-3833' },
    ],
  },
]