import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native';
import SearchBarWidget from '../../widgets/SearchBarWidget';
import SearchResultItemWidget from '../../widgets/SearchResultItemWidget';
import CurrentImage from '../../../assets/locate_current.png';

function Item(props) {
  const s = StyleSheet.create({
    item: {
      height: 44, borderBottomColor: '#DDDEDF',
      justifyContent: 'center',
      borderBottomWidth: 0.5,
    },
    text: {
      width: '100%',
      color: '#3E4146',
    }
  })
  return (
    <Pressable onPress={props.onPress}>
      <View style={s.item}>
        <Text style={s.text}>{props.item.name}</Text>
      </View >
    </Pressable>
  )
}

export default function SwitchMapPage(props) {
  const { navigation, route } = props
  return (
    <View style={[styles.container]}>
      <View style={styles.current}>
        <Text style={styles.currentMap}>当前地图</Text>
        <View style={styles.currentName}>
          <Image style={styles.locateIcon} source={CurrentImage} />
          <Text style={styles.currentText}>{props.maps.current.name}</Text>
        </View>
      </View>
      <View style={styles.listView}>
        <FlatList style={styles.list}
          data={props.maps.list}
          renderItem={({ item }) => (<Item item={item} onPress={() => { navigation.goBack(); }}></Item>)}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F8F8',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  current: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    alignContent: 'stretch',
    width: '100%',
    padding: 12,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  currentMap: {
    fontSize: 12, color: '#B0B1B3',
    marginBottom: 8,
  },
  currentName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locateIcon: {
    width: 16, height: 16,
    marginRight: 4,
  },
  currentText: {
    color: '#3E4146', fontSize: 14, fontWeight: 500,
  },
  listView: {
    backgroundColor: 'white',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    alignContent: 'stretch',
    width: '100%',
    paddingLeft: 12,
  },
  list: {
    width: '100%', height: '100%'
  }
});