import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import AlertImage from "../../../assets/alert.png"
import { AlarmContext } from "../../../webserve/AlarmContext";
import { AuthContext } from "../../../webserve/AuthContext";
import { AlertError } from "../../../common/global";

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
  },
  icon: {
    width: 48,
    height: 48,
    marginHorizontal: 12,
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  barge: {
    backgroundColor: '#F72727',
    position: 'absolute',
    right: -6,
    borderRadius: 7,
    paddingHorizontal: 4,
  },
  bargeText: {
    fontSize: 10,
    color: '#ffffff',
  },
  info: {
    borderBottomColor: '#DDDEDF',
    borderBottomWidth: 0.5,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#3E4146',
  },
  subtitle: {
    color: '#B0B1B3',
    fontSize: 12,
    marginBottom: 11,
  }
})

function Item({ barge, icon, title, subtitle, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.item}>
        <View style={styles.icon}>
          <Image style={styles.image} source={icon} />
          {barge > 0 &&
            <View style={styles.barge}>
              <Text style={styles.bargeText}>{barge}</Text>
            </View>
          }
        </View>
        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
          {/* <Text style={styles.subtitle}>{subtitle}</Text> */}
        </View>
      </View>
    </Pressable>
  )
}

export default function MessagePage() {
  const navigation = useNavigation();
  const { alarmCount, alarmItems, reminder, } = useContext(AlarmContext)
  const { fetch_json, tokenType, accessToken } = useContext(AuthContext);
  const itemMap = {
    'alarm': {
      title: '告警提醒',
      subtitle: '副标题文字',
      icon: AlertImage,
      onPress: () => { navigation.navigate('alertlist') },
    }
  }

  useEffect(function () {
    // console.log('start interval')
    reminder()
      .catch(AlertError);
    // const timer = setInterval(() => {
    //   reminder()
    // }, 3000);
    return function () {
      // clearInterval(timer);
    }
  }, [tokenType])


  alarmItems.map(item => {
    let info = itemMap[item.module];
    if (info === undefined) {
      return item;
    }
    return Object.assign(item, info);
  })
  // console.log(alarmItems);
  return (
    <>
      {
        alarmItems.length > 0 ?
          (
            <ScrollView style={{ backgroundColor: '#F4F6F8' }}>
              {
                alarmItems.map(item => (
                  <Item key={item.module} barge={item['num']} icon={item['icon']} title={item['title']}
                    subtitle={item['subtitle']}
                    onPress={() => {
                      navigation.navigate('alertlist')
                    }} />))
              }
            </ScrollView>
          )
          :
          (
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <ActivityIndicator></ActivityIndicator>
            </View>
          )
      }
    </>
  )
}