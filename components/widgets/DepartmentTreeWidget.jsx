/**
 * 部门组织架构
 */
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, Image } from 'react-native';
import { MapContext } from '../../webserve/MapContext';

export default function DepartmentTreeWidget() {
  const navigation = useNavigation();
  const route = useRoute();
  // console.log('route', route, 'navigation')
  const [stack, setStack] = useState([])
  onSelected = route.params.onSelected

  useEffect(() => {
    if (stack.length > 0) {
      return
    }
    setStack(route.params ? (route.params.stack ?? []) : [])
  }, [])

  const { department } = useContext(MapContext)
  let tree = department
  stack.forEach(e => {
    const nodes = tree.filter(n => n.value == e)
    if (nodes.length < 1) {
      return;
    }
    tree = nodes[0].children
  });
  tree.sort((a, b) => {
    if (a.children === undefined && b.children !== undefined) return 1
    if (a.children !== undefined && b.children === undefined) return -1
    return 0
  })

  return (
    <View>
      <FlatList
        data={tree}
        keyExtractor={item => item.value}
        renderItem={({ item }) => <Cell node={item} onPress={(value) => {
          if (item.children !== undefined) {
            // 进到下一级
            let s = new Array(...stack)
            s.push(value)
            navigation.push('tree', Object.assign({}, route.params, { stack: s }))
          } else {
            // console.log(onSelected)
            onSelected && onSelected(item)
          }
        }} />}
        ItemSeparatorComponent={<View style={{
          backgroundColor: '#DDDEDF', marginHorizontal: 12, height: 1,
        }}></View>}
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
      onPress && onPress(node.value)
    }}>
      <View style={styles.container}>
        <Text style={[styles.text, node.children ? styles.textDir : null]}>{node.title}</Text>
        {node.children &&
          <Image source={require('../../assets/right-arrow.png')} style={{ width: 16, height: 16 }} />
        }
      </View>
    </Pressable>
  )
}

