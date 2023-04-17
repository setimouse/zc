import React from "react";
import { Image } from "react-native";
import AlertDetailPage from "../components/pages/message/AlertDetailPage";

const device = [
  {
    title: '基础信息',
    data: [
      { key: '告警对象', value: '周生生' },
      { key: '对象部门', value: '一车间' },
      { key: '标签编码', value: 'CN-2389471' },
    ],
  },
  {
    title: '告警信息',
    data: [
      { key: '告警地图', value: '硫酸车间' },
      { key: '告警围栏', value: '车辆滞留' },
      { key: '告警时间', value: '2023.1.12 15:33:21' },
      { key: '告警时长', value: '3分钟' },
      { key: '告警状态', value: '告警中' },
      { key: '告警事件', value: '滞留' },
      { key: '滞留时长', value: '10分钟' },
    ],
  },
  {
    title: '处理信息',
    data: [
      { key: '处理方式', value: '人工处理' },
      { key: '处理意见', value: '尽快驶离' },
      { key: '处理时间', value: '2023.1.12 15:33:21' },
      { key: '是否误报', value: '否' },
      { key: '处理状态', value: '已处理' },
    ],
  },

]

export default function TestAlertDetailPage() {
  return (
    <AlertDetailPage device={device} />
  )
}