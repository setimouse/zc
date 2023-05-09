import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, Keyboard } from 'react-native';
import { MapContext } from '../../../webserve/MapContext';
import SearchBarWidget from '../../widgets/SearchBarWidget';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DepartmentTreeWidget from '../../widgets/DepartmentTreeWidget';
import { CardStyleInterpolators } from '@react-navigation/stack';

const Stack = createNativeStackNavigator();

export default function DeviceObjectBindingPage() {
  const navigation = useNavigation();
  const { requestUnbindDevice } = useContext(MapContext);
  const [objects, setObjects] = useState([]);
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    requestUnbindDevice({}).then(resp => resp.data.list)
      .then(setObjects)
  }, [])

  let onSelected = (node) => {
    node.title = node.name
    console.log('selected', node)
    navigation.navigate('devicedetail', { item: node, })
  }

  return (
    <View style={[styles.container]}>
      <SearchBarWidget placeholder="请输入对象名称"
        // storeKey="binding-object"
        initStatus={{ isSearching: false, isResult: true }}
        onChangeText={(text) => {
          setSearchText(text)
          let filtered = objects.filter(e => e.name.indexOf(text) > -1)
          setResults(filtered);
          console.log(filtered);
          return { isSearching: false, isResult: true, }
        }}
        resultPage={
          (searchText.length > 0)
          && <ResultPage data={results} onSelected={onSelected} />
          || <Department
            onSelected={(node) => onSelected(node)}
            onChanged={(node) => { }}
          />
        }
      />
    </View>
  );
}

function ResultPage({ data, onSelected }) {
  return (
    <View style={styles.objects}>
      <FlatList
        data={data}
        // keyExtractor={({ item }) => item.id}
        renderItem={({ item }) => (
          <Pressable style={{ height: 44, justifyContent: 'center', marginLeft: 12 }}
            onPress={() => { onSelected(item) }}>
            <View>
              <Text style={{ color: '#2882FF', }}>{item.name}</Text>
            </View>
          </Pressable>
        )}
        ItemSeparatorComponent={<View style={{
          backgroundColor: '#DDDEDF', marginHorizontal: 12, height: 1,
        }}></View>}
        onScroll={() => { Keyboard.dismiss() }}
      />
    </View>
  )
}

function Department({ onSelected, onChanged }) {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName='tree'
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
      >
        <Stack.Screen name="tree" component={DepartmentTreeWidget} options={{
          title: '组织架构', headerShown: false,
          // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
          initialParams={{
            onSelected: onSelected,
            onChanged: onChanged,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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