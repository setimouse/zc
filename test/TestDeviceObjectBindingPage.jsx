import React from "react";
import DeviceObjectBindingPage from "../components/pages/device/DeviceObjectBindingPage";

const suggests = [
  { word: 'abc' },
  { word: 'def' },
  { word: '123' },
];

const searchResult = [
  {
    id: 1,
    items: [
      { key: '车号', value: '330033' },
      { key: '当前台位', value: '台位1' },
      { key: '设备编号', value: 'CU-XXXX-3894' },
    ],
  },
  {
    id: 2,
    items: [
      { key: '车号', value: '330123' },
      { key: '当前台位', value: '台位2' },
      { key: '设备编号', value: 'CU-XXXX-383495' },
    ],
  },
  {
    id: 3,
    items: [
      { key: '车号', value: '330045' },
      { key: '当前台位', value: '台位3' },
      { key: '设备编号', value: 'CU-XXXX-3833' },
    ],
  },
]

export default function TestDeviceObjectBindingPage() {
  return (
    <DeviceObjectBindingPage />
  )
}