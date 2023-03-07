import React from "react";
import AlertListPage from "../components/pages/message/AlertListPage";

const data = [
  {
    id: 1,
    time: '2023.1.15 13:30:33',
    status: 'pending',
    title: '硫酸车间告警',
    brief: 'xxx触发的告警',
  },
  {
    id: 2,
    time: '2023.1.15 13:31:33',
    status: 'pending',
    title: '硫酸车间告警2',
    brief: 'xxx触发的告警2',
  },
  {
    id: 3,
    time: '2023.1.15 13:32:33',
    status: 'done',
    title: '硫酸车间告警3',
    brief: 'xxx触发的告警3',
  },
  {
    id: 4,
    time: '2023.1.15 13:33:33',
    status: 'pending',
    title: '硫酸车间告警4',
    brief: 'xxx触发的告警4',
  },
]

export default function TestAlertList({ navigation }) {
  return (
    <AlertListPage data={data} navigation={navigation} />
  )
}