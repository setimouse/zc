import React from "react";
import { FlatList, SectionList, Image, ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import AlertPending from '../../../assets/alert_pending.png';
import AlertDone from '../../../assets/alert_done.png';
import SwitchBarWidget from "../../widgets/SwitchBarWidget";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useRoute } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

const styles = StyleSheet.create({
  item: {
    marginTop: 16,
  },
  header: {
    marginBottom: 8,
  },
  headerText: {
    textAlign: 'center',
    color: '#B0B1B3',
    fontSize: 12,
  },
})

function Header({ title }) {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  )
}

function Body(props) {
  const s = StyleSheet.create({
    body: {
      backgroundColor: '#fff',
      height: 108,
      marginHorizontal: 12,
      borderRadius: 8,
      paddingHorizontal: 12, paddingVertical: 9,
    },
    headline: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomColor: '#DDDEDF',
      borderBottomWidth: 0.5,
      paddingBottom: 10,
    },
    status: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      width: 16, height: 16,
      marginRight: 4,
    },
    statusText: {
      color: '#3E4146',
      fontSize: 12,
    },
    detail: {
      fontSize: 12,
      color: '#B0B1B3',
    },
    alert: {
      marginTop: 12,
    },
    title: {
      color: '#333333',
      fontWeight: 'bold',
      fontSize: 14,
      marginBottom: 4,
    },
    brief: {
      color: '#B0B1B3',
      fontSize: 12,
    }
  })

  const data = props.data

  return (
    <View style={s.body}>
      <View style={s.headline}>
        <View style={s.status}>
          <Image style={s.icon} source={AlertPending} />
          <Text style={s.statusText}>告警消息待处理</Text>
        </View>
        <Pressable onPress={() => {
          props.navigation.navigate('alertdetail')
        }}>
          <View>
            <Text style={s.detail}>告警详情 &raquo;</Text>
          </View>
        </Pressable>
      </View>
      <View style={s.alert}>
        <Text style={s.title}>{data.title}</Text>
        <Text style={s.brief}>{data.brief}</Text>
      </View>
    </View>
  )
}

function Item(props) {
  return (
    <View style={styles.item}>
      <Header title={props.item.time} />
      <Body data={props.item} navigation={props.navigation} />
    </View>
  )
}

function AlertList(props) {
  const params = props.route.params;
  let data = params.data ?? [];
  return (
    <View style={{ flex: 1, backgroundColor: '#F4F6F8' }}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Item item={item} navigation={props.navigation} />}
      />
    </View>
  )
}

export default function AlertListPage(props) {
  const data = props.data;
  console.log(data)
  return (
    <Tab.Navigator>
      <Tab.Screen name="pending" component={AlertList} initialParams={{ data }} options={{ title: '未处理' }} />
      <Tab.Screen name="done" component={AlertList} initialParams={{ data }} options={{ title: '已完成' }} />
      <Tab.Screen name="all" component={AlertList} initialParams={{ data }} options={{ title: '全部' }} />
    </Tab.Navigator>
  )
}