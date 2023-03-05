import { StyleSheet, Text, View, FlatList } from 'react-native';
import SearchBarWidget from '../../widgets/SearchBarWidget';
import SearchResultItemWidget from '../../widgets/SearchResultItemWidget';

export default function DeviceObjectBindingPage(props) {
  return (
    <View style={[styles.container]}>
      <SearchBarWidget placeholder="请输入设备编号" />
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