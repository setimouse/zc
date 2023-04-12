import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native';
import CurrentImage from '../../../assets/locate_current.png';
import { useContext, useEffect, useState } from 'react';
import { MapContext } from '../../../webserve/MapContext';
import { useNavigation, useRoute } from '@react-navigation/native';

function Item({ item, onPress }) {
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
    <Pressable onPress={onPress}>
      <View style={s.item}>
        <Text style={s.text}>{item.name}</Text>
      </View >
    </Pressable>
  )
}

export default function SwitchMapPage({ route }) {
  // console.log("navigate to switchmap with params: ", route.params)
  const { requestMapList } = useContext(MapContext);
  const [maps, setMaps] = useState([])
  useEffect(() => {
    requestMapList({ pageNum: 1, pageSize: 1000 })
      .then(response => {
        console.log('map list', response)
        const list = response.data.list
        setMaps(list.filter(e => e.id != '-101'))
      })
  }, [])

  // const route = useRoute()
  const { currentMap } = route.params
  console.log("当前地图：", currentMap)

  const navigation = useNavigation()

  return (
    <View style={[styles.container]}>
      <View style={styles.current}>
        <Text style={styles.currentMap}>当前地图</Text>
        <View style={styles.currentName}>
          <Image style={styles.locateIcon} source={CurrentImage} />
          <Text style={styles.currentText}>{currentMap ? currentMap.name : '[当前地图未知]'}</Text>
        </View>
      </View>
      <View style={styles.listView}>
        <FlatList style={styles.list}
          data={maps}
          renderItem={({ item }) => (
            <Item item={item}
              onPress={() => {
                navigation.navigate({
                  name: 'mapmain',
                  params: { map: item },
                  merge: true,
                });
              }} />
          )}
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
    flex: 1,
  },
  list: {
    width: '100%', height: '100%'
  }
});