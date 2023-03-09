import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import SearchBarWidget from '../../widgets/SearchBarWidget';

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

export default function DeviceObjectBindingPage(props) {
  const navigation = useNavigation();

  const [objects, setObjects] = useState(props.objects)
  return (
    <View style={[styles.container]}>
      <SearchBarWidget placeholder="请输入设备编号"
        onChangeText={(text) => {
          let filtered = props.objects.filter(e => e.obj.indexOf(text) > -1)
          setObjects(filtered);
        }}
      />
      <View style={styles.objects}>
        <FlatList
          data={objects}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Item
            object={item}
            onPress={() => { navigation.goBack() }}
          />}
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
  objects: {
    width: '100%',
  }
});