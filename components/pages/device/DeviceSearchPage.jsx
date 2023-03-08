import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import SearchBarWidget from '../../widgets/SearchBarWidget';
import SearchResultItemWidget from '../../widgets/SearchResultItemWidget';

function Page({ result }) {
  const navigation = useNavigation();

  return (
    <View style={{ width: '100%', flex: 1 }}>
      <FlatList style={{}}
        data={result}
        renderItem={({ item }) => (
          <SearchResultItemWidget item={item}
            detailText="设备详情"
            onTargetPress={() => { navigation.navigate('mapmain') }}
            onDetailPress={() => { navigation.navigate('devicedetail') }}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
export default function DeviceSearchPage(props) {
  return (
    <View style={[styles.container]}>
      <SearchBarWidget
        placeholder="请输入设备编号"
        suggests={props.suggests}
        resultPage={<Page result={props.result} />}
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