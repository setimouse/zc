import React from "react";
import { FlatList, SectionList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import AlertPending from '../../../assets/alert_pending.png';
import AlertDone from '../../../assets/alert_done.png';
import SwitchBarWidget from "../../widgets/SwitchBarWidget";

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

function Header(props) {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>{props.title}</Text>
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
  const status = {
    'pending': {}
  }
  return (
    <View style={s.body}>
      <View style={s.headline}>
        <View style={s.status}>
          <Image style={s.icon} source={AlertPending} />
          <Text style={s.statusText}>告警消息待处理</Text>
        </View>
        <View>
          <Text style={s.detail}>告警详情 &raquo;</Text>
        </View>
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
      <Body data={props.item} />
    </View>
  )
}

export default function AlertListPage(props) {
  return (
    <View style={{ flex: 1, backgroundColor: '#F4F6F8' }}>
      <SwitchBarWidget />
      <FlatList
        data={props.data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Item item={item} />}
      />
    </View>
  )
}