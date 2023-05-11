import { useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert, Keyboard, Platform, Pressable, Switch, TextInput } from "react-native";
import { StyleSheet, View, Text, ScrollView, Modal } from "react-native";
import { AlarmContext } from "../../../webserve/AlarmContext";
import ButtonWidget from "../../widgets/ButtonWidget";
import SectionGroupList from "../../widgets/SectionGroupList";
import { CommonAlert, SimpleAlert } from "../../../common/global";

export default function AlertDetailPage(props) {
  const { reminder, alarmDetail, alarmDeal } = useContext(AlarmContext)
  const route = useRoute()
  const id = route.params['id'];
  const type = route.params.type;
  console.log('alert id:', id, type)

  const [alert, setAlert] = useState({})

  async function loadDetail({ id }) {
    alarmDetail({ id: id })
      .then(resp => setAlert(resp))
      .catch(error => console.log(error))
  }

  useEffect(function () {
    loadDetail({ id })
  }, [])

  const data = alertInfo2listData(alert, type);

  const [dealModal, setDealModal] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: '#F4F6F8', }}>
      {data.length > 0 &&
        <ScrollView style={{ padding: 12, }} showsVerticalScrollIndicator={false}>
          <SectionGroupList data={data} />
          {alert.processingStatus == 0 && ['done'].indexOf(type) > -1 &&
            <View style={{ marginBottom: 32, }}>
              <ButtonWidget title='处理' onPress={() => setDealModal(true)} />
            </View>
          }
        </ScrollView>
        ||
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator></ActivityIndicator>
        </View>
      }
      <Modal visible={dealModal} animationType="slide" transparent={true}
        onRequestClose={() => { setDealModal(false) }}
      >
        <DealBox id={id}
          onClose={() => { setDealModal(false) }}
          onSave={(opinion, isMisinformation) => {
            alarmDeal({ idList: [id], opinion, isMisinformation })
              .then(() => {
                loadDetail({ id })
                SimpleAlert('处理完成')
                setDealModal(false)
                reminder()
              })
              .catch(error => CommonAlert('处理失败', error.message))
          }}
        />
      </Modal>

    </View>
  )
}

function DealBox({ id, onClose, onSave }) {
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      // backgroundColor: 'rgba(192 192 192 / 0.62)'
    },
    window: {
      width: '80%',
      backgroundColor: '#fff',
      padding: 12,
      borderRadius: 8,
      shadowColor: '#ccc',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 5,
      elevation: 100,
    },
    opinion: {
      marginBottom: Platform.OS == 'ios' ? 12 : 0,
    },
    opinionTextView: {
      borderColor: '#ccc',
      borderWidth: 1,
      height: 128,
      justifyContent: 'space-between',
    },
    errorText: {
      color: '#f00', fontSize: 12
    }
  })

  const [isMisinformation, setIsMisinformation] = useState(false);
  const [opinion, setOpinion] = useState('');
  const [opinionError, setOpinionError] = useState('');

  const toggleSwitch = () => setIsMisinformation(isMisinformation => !isMisinformation);

  const maxLength = 100

  return (
    <Pressable onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.window}>
          <View style={styles.opinion}>
            <Text style={{ marginBottom: 8 }}>处理意见</Text>
            <View style={styles.opinionTextView}>
              <TextInput multiline={true} textAlignVertical="top"
                onChangeText={setOpinion}
                onChange={() => setOpinionError('')}
                maxLength={maxLength}
                style={{ height: '100%' }}
                value={opinion}
              />
              <Text style={{
                flexDirection: 'row',
                textAlign: 'right',
                fontSize: 12,
                color: '#666'
              }}>{opinion.length}/{maxLength}</Text>
            </View>
            <Text style={styles.errorText}>{opinionError !== '' && opinionError}</Text>
          </View>
          <View style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <Text style={{ marginRight: 12 }}>是否误报</Text>
              <Switch trackColor={{ true: '#2882FF' }}
                value={isMisinformation}
                onValueChange={toggleSwitch}
              />
            </View>
            {/* <Text style={styles.errorText}>请选择是否误报</Text> */}
          </View>
          <View style={{ marginTop: 12, flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={{ width: '40%' }}>
              <ButtonWidget title="关闭" onPress={onClose} />
            </View>
            <View style={{ width: '40%' }}>
              <ButtonWidget title="保存" onPress={() => {
                if (opinion.length < 1) {
                  setOpinionError('请输入处理信息')
                  return
                }
                if (opinion.trim() == '') {
                  setOpinionError('处理信息不能是空格')
                  return
                }
                onSave(opinion, isMisinformation)
              }
              } />
            </View>
          </View>
        </View>
      </View >
    </Pressable>
  )
}

function alertInfo2listData(alert, type) {
  alert = alert ?? {}

  const statusMap = {
    0: { title: '告警中' },
    1: { title: '已结束' },
  }

  const handleMap = {
    0: { title: '自动处理' },
    1: { title: '人工处理' },
  }

  const processingStatusMap = {
    0: { title: '未处理' },
    1: { title: '已处理' },
  }

  const data = [
    {
      title: '基础信息',
      data: [
        { key: '告警对象', value: alert.targetName ?? '-' },
        { key: '对象部门', value: alert.targetGroupName ?? '-' },
        { key: '标签编码', value: alert.terminalSn ?? '-' },
      ],
    },
    {
      title: '告警信息',
      data: [
        { key: '告警地图', value: alert.mapName ?? '-' },
        { key: '告警围栏', value: alert.fenceName ?? '-' },
        { key: '告警时间', value: alert.createdTime ?? '-' },
        { key: '告警时长（秒）', value: alert.retentionTime ?? '-' },
        { key: '告警状态', value: statusMap[alert.status ?? '-'] ? statusMap[alert.status ?? '-'].title : '未知' },
        { key: '告警事件', value: alert.triggerTypeName ?? '-' },
        // { key: '滞留时长（秒）', value: alert.retentionTime ?? '-' },
      ],
    },

  ]
  if (['done'].indexOf(type) > -1) {
    data.push({
      title: '处理信息',
      data: [
        { key: '处理方式', value: handleMap[alert.handleWay ?? '-'] ? handleMap[alert.handleWay ?? '-'].title : '未知' },
        { key: '处理意见', value: (alert.opinion ?? "").length > 19 ? <Text style={{ textAlign: 'left' }}>{alert.opinion ?? ''}</Text> : alert.opinion ?? '' },
        { key: '处理时间', value: alert.misinformationTime ?? '' },
        { key: '是否误报', value: alert.isMisinformation ?? '-' ? '是' : '否' },
        { key: '处理状态', value: processingStatusMap[alert.processingStatus ?? '-'] ? processingStatusMap[alert.processingStatus ?? '-'].title : '未知' },
      ],
    })
  }
  return data
}
