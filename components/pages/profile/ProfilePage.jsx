/**
 * 我的
 */
import React from 'react';
import { Image, View, Text, StyleSheet, Pressable } from 'react-native';
import ProfileBg from '../../../assets/profile_bg.png';
import AlertIcon from '../../../assets/profile_alert.png';
import DeviceIcon from '../../../assets/profile_device.png';
import { useNavigation } from '@react-navigation/native';

function UserView({ user }) {
  const styles = StyleSheet.create({
    container: {
      height: 220,
      paddingHorizontal: 12,
      paddingTop: 94,
      flexDirection: 'row',
    },
    bg: {
      position: 'absolute',
      width: '100%',
      top: 0, left: 0,
    },
    iconView: {
      marginRight: 10,
    },
    avatar: {
      width: 60, height: 60,
      borderColor: '#FFFFFF',
      borderWidth: 2,
      borderRadius: 30,
    },
    infoView: {
      marginVertical: 5,
    },
    namedep: {
      flexDirection: 'row',
      marginBottom: 4,
      alignItems: 'baseline',
    },
    name: {
      fontSize: 16,
      color: '#fff',
    },
    department: {
      fontSize: 12,
      color: '#fff',
    },
    telView: {
      flexDirection: 'row',
    },
    tel: {
      color: '#fff',
      fontSize: 14,
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.iconView}>
        <Image style={styles.avatar} source={user.avatar} />
      </View>
      <View style={styles.infoView}>
        <View style={styles.namedep}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.department}>/{user.department}</Text>
        </View>
        <View style={styles.telView}>
          <Text style={styles.tel}>{user.tel}</Text>
        </View>
      </View>
    </View>
  )
}

function FunctionButton({ icon, title, onPress }) {
  const styles = StyleSheet.create({
    container: {
      width: 88,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      marginBottom: 8,
      // backgroundColor: 'red',
    },
    press: {
      alignItems: 'center',
      paddingVertical: 3,
    },
    icon: {
      width: 30, height: 30,
    },
    title: {
      marginTop: 4,
      fontSize: 12, color: '#3E4146',
    }
  });

  return (
    <View style={styles.container}>
      <Pressable style={styles.press} onPress={() => onPress ? onPress() : {}}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
      </Pressable>
    </View>
  )
}

function FunctionsView() {
  const styles = StyleSheet.create({
    container: {
    },
    titleView: {
      justifyContent: 'center',
      height: 20,
      paddingLeft: 8,
      marginTop: 12,
      marginHorizontal: 12,
      borderLeftColor: '#2882FF',
      borderLeftWidth: 2,
    },
    title: {
      fontSize: 14,
    },
    functionView: {
      marginTop: 16,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    }
  });

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.title}>其他功能</Text>
      </View>
      <View style={styles.functionView}>
        <FunctionButton icon={AlertIcon} title="告警信息"
          onPress={() => {
            navigation.navigate('profile_alert_list')
          }}
        />
        <FunctionButton icon={DeviceIcon} title="设备管理"
          onPress={() => { navigation.navigate('profile_device_manage') }}
        />
        <FunctionButton />
        <FunctionButton />
      </View>
    </View>
  )
}

export default function ProfilePage({ user }) {
  return (
    <View style={{ backgroundColor: '#F4F6F8', flex: 1 }}>
      <Image style={{ position: 'absolute', height: 220, width: '100%' }} source={ProfileBg} />
      <UserView user={user} />
      <View top={-36} style={{ backgroundColor: '#fff', marginHorizontal: 12 }} borderRadius={10} >
        <FunctionsView />
      </View>
    </View>
  )
}
