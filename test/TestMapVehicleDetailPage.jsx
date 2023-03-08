import React from "react";
import VehicleDetailPage from "../components/pages/map/VehicleDetailPage";

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
      { key: '设备编号', value: 'CU-XXXX-3895' },
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

const vehicle = [
  {
    title: '基础信息',
    data: [
      { key: '车号', value: '83482' },
      { key: '设备编号', value: 'CU-XXXX-382A8832' },
      { key: '检修情况', value: '检修中' },
      { key: '当前台位', value: '台位1' },
    ],
  },
  {
    title: '车辆信息',
    data: [
      { key: '合并车型', value: '提速车' },
      { key: '全场', value: '23783m' },
      { key: '制造厂', value: '常客' },
      { key: '制造年月', value: '2007-03' },
    ],
  },

]

export default function TestMapVehicleDetailPage() {
  return (
    <VehicleDetailPage vehicle={vehicle} />
  )
}