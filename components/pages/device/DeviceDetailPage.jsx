/**
 * 设备详情页
 */
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Image, Pressable, Alert } from "react-native";
import { MapContext } from "../../../webserve/MapContext";
import ButtonWidget from "../../widgets/ButtonWidget";
import { baseURL } from "../../../webserve/http_config";
import { SimpleAlert } from "../../../common/global";
import { AuthContext } from "../../../webserve/AuthContext";

export default function DeviceDetailPage() {
  const navigation = useNavigation();
  const route = useRoute()

  const {
    requestDeviceDetail, // 详情
    requestDeviceDetailByNo, // 详情（通过设备编码）
    requestStation, // 台位
    requestListTargetTypes, // 图片
    requestBind, // 绑定
    requestUnbind, // 解绑
  } = useContext(MapContext)

  const { me } = useContext(AuthContext)

  const [device, setDevice] = useState({})
  const [stage, setStage] = useState()
  const [image, setImage] = useState()
  const [binding, setBinding] = useState()
  const [targetId, setTargetId] = useState()

  useEffect(() => {
    setDevice(Object.assign({}, device, stage, image))
  }, [stage, image])

  let getImage = async (deviceData) => {
    requestListTargetTypes()
      .then(result => result.data)
      .then(data => data.filter(e => e.deviceType == deviceData.deviceType)[0])
      .then(data => { console.log('list target types: ', data); return data })
      .then(data => data.featureImage)
      .then(image => image ? { uri: `${baseURL}${image}` } : require('../../../assets/default_image.png'))
      .then(img => setImage({ img: img }))
  }

  let getStation = async (data) => {
    requestStation({ x: data.x, y: data.y }).then(resp => resp.data)
      .then(data => {
        console.log('stage info', data)
        if (data.length > 0) {
          setStage({ currentStage: data[0].fenceName })
        }
      })
  }

  let getDeviceDetail = async (targetId) => {
    requestDeviceDetail({ targetId: targetId }).then(result => result.data)
      .then(data => {
        getStation(data)
        getImage(data)
        return data
      })
      .then(data => {
        console.log(data)
        setBinding(data.consumerStatusLabel)
        return {
          id: data.id,
          // 'img': image,
          deviceId: data.deviceId,
          deviceModel: data.deviceType,
          desc: data.description,
          // 绑定信息
          bindStatus: data.consumerStatusLabel,
          bindObject: data.consumerName,
          consumerId: data.consumerId,
          // currentStage: '',
          bindTime: data.consumerTime,
          power: data.qoe + '%'
        }
      })
      .then(device => setDevice(device))
  }

  let getDeviceDetailByNo = async (deviceId) => {
    requestDeviceDetailByNo({ deviceId: deviceId }).then(result => result.data)
      .then(data => {
        getStation(data)
        getImage(data)
        return data
      })
      .then(data => {
        console.log(data)
        setBinding(data.consumerStatusLabel)
        return {
          id: data.id,
          // 'img': image,
          deviceId: data.deviceId,
          deviceModel: data.deviceType,
          desc: data.description,
          // 绑定信息
          bindStatus: data.consumerStatusLabel,
          bindObject: data.consumerName,
          consumerId: data.consumerId,
          // currentStage: '',
          bindTime: data.consumerTime,
          power: data.qoe + '%'
        }
      })
      .then(device => setDevice(device))
      .catch(error => {
        SimpleAlert(error.msg ?? "标签编码有误")
        navigation.canGoBack() && navigation.goBack()
      })
  }

  let unbind = async ({ targetId }) => {
    return requestUnbind({ targetId: targetId })
      .then(data => console.log(data))
      .then(() => getDeviceDetail(targetId))
  }

  let bind = async ({ targetId, consumerId }) => {
    return requestBind({ targetId: targetId, consumerId: consumerId })
      .then(() => getDeviceDetail(targetId))
  }

  useEffect(() => {
    if (route.params == undefined) {
      return;
    }
    if (route.params.targetId) {
      getDeviceDetail(route.params.targetId)
    } else if (route.params.deviceId) {
      getDeviceDetailByNo(route.params.deviceId)
    }
  }, [])

  useEffect(() => {
    console.log('effect params', route.params)
    if (route.params.targetId) {
      setTargetId(targetId)
    }
    if (route.params.item) {
      let item = route.params.item;
      setDevice(Object.assign({}, device, { consumerId: item.id, bindObject: item.title }))
    }
  }, [route.params])

  console.log('detail, target id =', route.params)
  console.log('perms', me)
  return (
    <View style={{ flex: 1, backgroundColor: '#F4F6F8' }}>
      <ScrollView style={{ paddingHorizontal: 12, marginBottom: 0 }} showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: 24 }}>
          <BaseInfoView device={device} />
          <BindInfoView device={device} />
        </View>
        {me && me.perms && me.perms.indexOf('device:device:bindOrUnbind') > -1 &&
          <View style={{ marginBottom: 24, }}>
            {
              binding === '已绑定'
              && <ButtonWidget title='解绑' buttonColor='#F96868' onPress={() => {
                Alert.alert('确认解绑该设备吗？', '', [
                  {
                    text: '确认', onPress: () => unbind({ targetId: device.id })
                      .then(() => { setStage('') })
                      .then(() => SimpleAlert('解绑成功'))
                  },
                  {
                    text: '取消'
                  }
                ], { cancelable: false })
              }} />
              || <ButtonWidget title='绑定' onPress={() => {
                if (!device.consumerId) {
                  SimpleAlert('请选择要绑定的对象')
                  return;
                }
                console.log(device.consumerId)
                Alert.alert('确认绑定该设备吗？', '', [
                  {
                    text: '确认', onPress: () => bind({ targetId: device.id, consumerId: device.consumerId })
                      .then(() => SimpleAlert('绑定成功'))
                  },
                  {
                    text: '取消'
                  }
                ], { cancelable: false })
              }} />
            }
          </View>}
      </ScrollView>
    </View>
  )
}

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
        <CellView onPress={() => navigation.navigate('devicepic', {
          device: device
        })}>
          <View><Text style={styles.text}>型号图片</Text></View>
          <View><Image source={device.img} style={{ width: 60, height: 60 }} /></View>
        </CellView>
        <CellView
        // onPress={() => navigation.navigate('deviceid')}
        >
          <View><Text style={styles.text}>标签编码</Text></View>
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
          <View><Text style={styles.text}>绑定状态</Text></View>
          <View><Text style={{ color: '#2882FF' }}>{device.bindStatus}</Text></View>
        </CellView>
        <CellView onPress={device.bindTime ? null : () => navigation.navigate('objectbinding', {
          targetId: device.id,
        })}>
          <View><Text style={styles.text}>绑定对象</Text></View>
          <View style={{ flex: 1, marginLeft: 12, alignItems: 'flex-end' }}><Text>{device.bindObject}</Text></View>
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

