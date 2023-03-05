import React from "react";
import DeviceDetailPage from "../components/pages/device/DeviceDetailPage";
import DeviceSearchResultPage from "../components/pages/map/DeviceSearchResultPage";
import { Image } from "react-native";

const device = [
  {
    title: '基础信息',
    data: [
      { key: '型号图片', value: <Image source={require('../assets/device.png')} style={{ width: 60, height: 60 }} /> },
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

export default function TestDeviceDetailPage() {
  return (
    <DeviceDetailPage device={device} />
  )
}