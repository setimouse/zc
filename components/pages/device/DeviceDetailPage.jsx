/**
 * 设备详情页
 */
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, Text, SectionList, ScrollView, Image, Pressable } from "react-native";
import ButtonWidget from "../../widgets/ButtonWidget";
import SectionGroupList from "../../widgets/SectionGroupList";

const styles = StyleSheet.create({
  text: {
    fontSize: 14, color: '#3E4146',
  }
});

function Header({ title }) {
  const styles = StyleSheet.create({
    header: {
      marginVertical: 8,
      marginHorizontal: 12,
    },
    text: {
      color: '#B0B1B3',
      fontSize: 12,
    }
  });

  return (
    <View style={styles.header}>
      <Text style={styles.text}>{title}</Text>
    </View>
  )
}

function Body(props) {
  const styles = StyleSheet.create({
    body: {
      backgroundColor: 'white',
      padding: 12,
      borderRadius: 8,
    }
  });
  return (
    <View style={styles.body}>
      {props.children}
    </View>
  );
}

function CellView({ direction = 'row', children, underline = true, onPress }) {
  const styles = StyleSheet.create({
    cell: {
      flexDirection: 'row',
      justifyContent: "space-between",
      // backgroundColor: 'yellow',
    },
    content: {
      flex: 1,
      alignItems: direction === 'column' ? 'flex-start' : 'center',
      padding: 12,
      flexDirection: direction,
      justifyContent: "space-between",
      borderBottomColor: '#DDDEDF',
      borderBottomWidth: underline ? 0.5 : 0,
    },
    target: {
      // backgroundColor: 'red',
      justifyContent: 'center',
    },
    arrow: {
      // backgroundColor: 'pink'
    }
  });

  return (
    <View style={styles.cell}>
      <Pressable style={{ flex: 1, }} onPress={() => onPress ? onPress() : {}}>
        <View style={styles.content}>
          {children}
        </View>
      </Pressable>
      {onPress && <View style={styles.target}><Text style={styles.arrow}>&gt;</Text></View>}
    </View>
  )
}

function BaseInfoView({ device }) {
  const navigation = useNavigation();

  return (
    <>
      <Header title="基础信息" />
      <Body>
        <CellView onPress={() => navigation.navigate('devicepic')}>
          <View><Text style={styles.text}>型号图片</Text></View>
          <View><Image source={device.img} style={{ width: 60, height: 60 }} /></View>
        </CellView>
        <CellView onPress={() => navigation.navigate('deviceid')}>
          <View><Text style={styles.text}>设备ID</Text></View>
          <View><Text>{device.deviceId}</Text></View>
        </CellView>
        <CellView>
          <View><Text style={styles.text}>设备型号</Text></View>
          <View><Text style={styles.text}>{device.deviceModel}</Text></View>
        </CellView>
        <CellView direction="column" underline={false}>
          <View><Text style={styles.text}>描述</Text></View>
          <View><Text style={styles.text}>{device.desc}</Text></View>
        </CellView>
      </Body>
    </>
  )
}

function BindInfoView({ device }) {
  const navigation = useNavigation();

  const bindingStatus = {
    'binding': '已绑定',
  }
  return (
    <>
      <Header title="绑定信息" />
      <Body>
        <CellView>
          <View><Text style={styles.text}>绑定对象</Text></View>
          <View><Text>{bindingStatus[device.bindStatus]}</Text></View>
        </CellView>
        <CellView onPress={() => navigation.navigate('objectbinding')}>
          <View><Text style={styles.text}>绑定对象</Text></View>
          <View><Text>{device.bindObject}</Text></View>
        </CellView>
        <CellView>
          <View><Text style={styles.text}>当前台位</Text></View>
          <View><Text style={styles.text}>{device.currentStage}</Text></View>
        </CellView>
        <CellView>
          <View><Text style={styles.text}>绑定时间</Text></View>
          <View><Text style={styles.text}>{device.bindTime}</Text></View>
        </CellView>
        <CellView underline={false}>
          <View><Text style={styles.text}>设备电量</Text></View>
          <View><Text style={styles.text}>{device.power}</Text></View>
        </CellView>
      </Body>
    </>
  )

}

export default function DeviceDetailPage(props) {
  const navigation = useNavigation();

  const device = props.device;
  return (
    <View style={{ flex: 1, backgroundColor: '#F4F6F8' }}>
      <ScrollView style={{ paddingHorizontal: 12 }} showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: 24 }}>
          <BaseInfoView device={device} />
          <BindInfoView device={device} />
        </View>
        {/* <SectionGroupList data={device} /> */}
        <ButtonWidget title="绑定" onPress={() => { navigation.goBack() }} />
      </ScrollView>
    </View>
  )
}
