import { StyleSheet, Text, View, FlatList } from 'react-native';
import SearchBarWidget from '../../widgets/SearchBarWidget';
import SearchResultItemWidget from '../../widgets/SearchResultItemWidget';

function Item(props) {
  return (
    <View style={{ flexDirection: 'row', height: 40 }}>
      {/* <Image source={require('../../assets/timer.png')} /> */}
      <Text style={{ alignContent: 'flex-start' }}>{props.word}</Text>
    </View>
  );
}

export default function DeviceBindPage(props) {
  return (
    <View style={[styles.container]}>
      <SearchBarWidget placeholder="请输入设备编号" />
      <View style={{ width: '100%' }}>
        <FlatList style={{ height: '100%' }}
          data={props.result}
          renderItem={({ item }) => (<SearchResultItemWidget item={item} />)}
          keyExtractor={item => item.id}
        />
      </View>
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