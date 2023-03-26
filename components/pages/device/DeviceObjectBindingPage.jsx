import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { MapContext } from '../../../webserve/MapContext';
import SearchBarWidget from '../../widgets/SearchBarWidget';

export default function DeviceObjectBindingPage() {
  const navigation = useNavigation();

  const {
    requestListTargetReals
  } = useContext(MapContext)

  const [objects, setObjects] = useState([])
  const [displayObjs, setDisplayObjs] = useState([])
  useEffect(() => {
    requestListTargetReals({})
      .then(resp => resp.data)
      .then(data => {
        return data.map(o => {
          return {
            id: o.consumerId,
            obj: o.consumerName,
          }
        }).filter(o => o.id && o.obj)
      })
      .then(objects => {
        console.log(objects)
        setObjects(objects)
        setDisplayObjs(objects)
      })
  }, [])

  return (
    <View style={[styles.container]}>
      <SearchBarWidget placeholder="请输入设备编号"
        storeKey="binding-object"
        onChangeText={(text) => {
          let filtered = objects.filter(e => e.obj.indexOf(text) > -1)
          setDisplayObjs(filtered);
        }}
      />
      <View style={styles.objects}>
        <FlatList
          data={displayObjs}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Item
            object={item}
            onPress={() => {
              navigation.navigate('devicedetail', {
                item: item,
              })
            }}
          />}
        />
      </View>

    </View>
  );
}

function Item({ object, onPress }) {
  const styles = StyleSheet.create({
    item: {
      height: 44,
      marginLeft: 12,
      justifyContent: 'center',
      borderBottomColor: '#DDDEDF', borderBottomWidth: 0.5,
    },
    text: {
      fontSize: 14, fontWeight: 400,
      flexDirection: 'row',
      color: '#3E4146',
    }
  });
  return (
    <Pressable onPress={onPress}>
      <View style={styles.item}>
        <Text style={styles.text}>{object.obj}</Text>
      </View>
    </Pressable>
  )
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
  objects: {
    width: '100%',
  }
});