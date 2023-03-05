import React from "react";
import { Image } from "react-native";
import AlertDetailPage from "../components/pages/message/AlertDetailPage";

const device = [
  {
    title: '基础信息',
    data: [
      { key: '告警对象', value: '周生生' },
      { key: '设备ID', value: 'CU-XXXX-382A8832' },
      { key: '设备型号', value: '检修中' },
      { key: '当前台位', value: '台位1' },
    ],
  },
  {
    title: '绑定信息',
    data: [
      { key: '合并车型', value: '提速车' },
      { key: '全场', value: '23783m' },
      { key: '制造厂', value: '常客' },
      { key: '制造年月', value: '2007-03' },
    ],
  },

]

export default function TestAlertDetailPage() {
  return (
    <AlertDetailPage device={device} />
  )
}