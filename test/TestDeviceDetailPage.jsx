import React from "react";
import DeviceDetailPage from "../components/pages/device/DeviceDetailPage";

// const device = [
//   {
//     title: '基础信息',
//     data: [
//       {
//         key: '型号图片', value: <Image source={require('../assets/device.png')} style={{ width: 60, height: 60 }} />,
//         id: 'image'
//       },
//       {
//         key: '标签编码', value: 'CU-XXXX-382A8832',
//         id: 'deviceId',
//       },
//       { key: '设备型号', value: '检修中', id: 'deviceModel' },
//       { key: '描述', },
//     ],
//   },
//   {
//     title: '绑定信息',
//     data: [
//       { key: '合并车型', value: '提速车' },
//       { key: '全场', value: '23783m' },
//       { key: '制造厂', value: '常客' },
//       { key: '制造年月', value: '2007-03' },
//     ],
//   },

// ]

const device = {
  // 基础信息
  // 'img': require('../assets/device.png'),
  'deviceId': 'CU-XXXX-382A8832',
  'deviceModel': 'xxx',
  'desc': 'xxx',
  // 绑定信息
  'bindStatus': 'binding',
  'bindObject': 'xxx',
  'currentStage': '台位1',
  'bindTime': '2023.1.15 13:33:22',
  'power': '80%'
}
export default function TestDeviceDetailPage() {
  return (
    <DeviceDetailPage device={device} />
  )
}