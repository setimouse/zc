/**
 * 部门组织架构
 */
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, Image, Keyboard } from 'react-native';
import { MapContext } from '../../webserve/MapContext';

export default function DepartmentTreeWidget() {
  const navigation = useNavigation();
  const route = useRoute();
  // console.log('route', route, 'navigation')

  const { department, requestDepartment, requestUnbindDevice } = useContext(MapContext)

  const [depts, setDepts] = useState([]);
  const [consumers, setConsumers] = useState([]);
  const [tree, setTree] = useState({});

  const dept = route.params.dept
  const onSelected = route.params.onSelected
  const onChanged = route.params.onChanged

  useEffect(() => {
    console.log('dept', dept)
    let deptId = undefined
    if (dept == undefined) {
      requestDepartment()
    } else {
      setDepts(dept.children)
      // console.log(tree)
      deptId = dept.id
    }
    requestUnbindDevice({ deptId: deptId }).then(json => json.data)
      // .then(data => { console.log(data); return data })
      .then(data => setConsumers(data.list))
  }, [])

  useEffect(() => {
    if (dept == undefined) {
      setDepts(department)
    }
  }, [department])

  useEffect(() => {
    let c = []
    if (depts) {
      depts.forEach(e => { e.type = 'dept'; e.id = e.value })
      c = c.concat(depts)
    }
    if (consumers) {
      consumers.forEach(e => { e.type = 'consumer'; e.title = e.name })
      c = c.concat(consumers)
    }
    console.log('ddd', depts, consumers, c)
    setTree(c)
  }, [depts, consumers])

  return (
    <View>
      <FlatList
        data={tree}
        keyExtractor={item => item.id + item.title}
        renderItem={({ item }) => <Cell node={item} onPress={(node) => {
          console.log('pressed unbind', node)
          if (node.type === 'dept') {
            onChanged && onChanged(node)
            navigation.push('tree', Object.assign({}, route.params, { dept: node }))
          } else {
            onSelected && onSelected(node)
          }
        }} />}
        ItemSeparatorComponent={<View style={{
          backgroundColor: '#DDDEDF', marginHorizontal: 12, height: 1,
        }}></View>}
        onScroll={() => { Keyboard.dismiss() }}
      />
    </View>
  )
}

function Cell({ node, onPress }) {
  const styles = StyleSheet.create({
    container: {
      height: 44,
      justifyContent: 'space-between',
      paddingVertical: 9, paddingHorizontal: 12,
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      color: '#2882FF',
    },
    textDir: {
      color: '#3E4146',
      fontSize: 14,
    }
  });

  return (
    <Pressable style={{}} onPress={() => {
      onPress && onPress(node)
    }}>
      <View style={styles.container}>
        <Text style={[styles.text, node.type == 'dept' ? styles.textDir : null]}>{node.title}</Text>
        {node.type == 'dept' &&
          <Image source={require('../../assets/right-arrow.png')} style={{ width: 16, height: 16 }} />
        }
      </View>
    </Pressable>
  )
}

