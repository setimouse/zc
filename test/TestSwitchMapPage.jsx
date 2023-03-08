import React from "react";
import SwitchMapPage from "../components/pages/map/SwitchMapPage";

const maps = {
  current: {
    id: 123,
    name: '主与国际3号楼',
  },
  list: [
    {
      id: 1, name: '北京主语办公楼',
    },
    {
      id: 2, name: '广州MEC停车场',
    },
    {
      id: 3, name: '园区停车场',
    },
    {
      id: 4, name: '仓库',
    },
  ]
}

export default function TestSwitchMapPage({ navigation, route }) {
  return (
    <SwitchMapPage maps={maps}
      navigation={navigation} route={route} />
  )
}