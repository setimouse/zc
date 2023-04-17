import React from "react";
import DeviceSearchPage from "../components/pages/device/DeviceSearchPage";

const suggests = [
  { word: 'CU-XXX', id: 1 },
  { word: '383495', id: 2 },
  { word: '3833', id: 3 },
];

const searchResult = [
  {
    id: 1,
    items: [
      { key: '标签编码', value: 'CU-XXXX-3894' },
      { key: '标签编码', value: '---' },
      { key: '车号', value: '330033' },
    ],
  },
  {
    id: 2,
    items: [
      { key: '标签编码', value: 'CU-XXXX-383495' },
      { key: '标签编码', value: '---' },
      { key: '车号', value: '330123' },
    ],
  },
  {
    id: 3,
    items: [
      { key: '标签编码', value: 'CU-XXXX-3833' },
      { key: '标签编码', value: '---' },
      { key: '车号', value: '330045' },
    ],
  },
]

export default function TestDeviceSearchPage() {
  return (
    <DeviceSearchPage suggests={suggests} result={searchResult} />
  )
}