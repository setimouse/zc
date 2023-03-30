import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import SearchBarWidget from '../../widgets/SearchBarWidget';
import SearchResultItemWidget from '../../widgets/SearchResultItemWidget';
import { MapContext } from '../../../webserve/MapContext';

export default function DeviceSearchPage(props) {
  const { requestTargets } = useContext(MapContext)

  const [result, setResult] = useState([])

  async function search(keywords) {
    return requestTargets({ keywords: keywords })
  }

  return (
    <View style={[styles.container]}>
      <SearchBarWidget
        placeholder="请输入设备编号"
        suggests={props.suggests}
        resultPage={<Page result={result} />}
        storeKey='device-search'
        onSubmit={(keywords) => {
          console.log('keywords', keywords)
          search(keywords)
            // .then(resp => {
            //   console.log(resp)
            //   return resp;
            // })
            .then(resp => resp.data.list)
            .then(data => data.map(r => {
              return {
                id: r.id,
                items: [
                  { key: '设备编号', value: r.deviceType },
                  { key: '设备ID', value: r.deviceId },
                  { key: '车号', value: r.consumerName },
                ],
                info: r,
              }
            })
            )
            .then(results => {
              setResult(results)
              // console.log(results);
            })
            .catch(error => console.log('error', error.message))
        }}
      />
    </View>
  );
}

function Page({ result }) {
  const navigation = useNavigation();

  return (
    <View style={{ width: '100%', flex: 1, }}>
      <FlatList style={{}}
        data={result}
        renderItem={({ item }) => (
          <SearchResultItemWidget item={item}
            detailText="设备详情"
            onTargetPress={() => {
              navigation.navigate('mapmain', {
                deviceId: item.info.deviceId
              })
            }}
            onDetailPress={() => {
              navigation.navigate('devicedetail', {
                targetId: item.info.id
              })
            }}
          />
        )}
        keyExtractor={item => item.id}
      />
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