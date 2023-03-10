import React from "react";
import DeviceObjectBindingPage from "../components/pages/device/DeviceObjectBindingPage";

const objects = [
  { id: 1, obj: '562173892423' },
  { id: 2, obj: '6514981498131' },
  { id: 3, obj: '4123654123924' },
  { id: 4, obj: '1234172347890' },
  { id: 5, obj: '4651892348107' },
  { id: 6, obj: '983401087313' },
  { id: 7, obj: '134812934' },
  { id: 8, obj: '73412412348712' },
  { id: 9, obj: '7346128061913234' },
  { id: 10, obj: '7346128061913234' },
  { id: 11, obj: '7346128061913234' },
  { id: 12, obj: '7346128061913234' },
  { id: 13, obj: '7346128061913234' },
  { id: 14, obj: '7346128061913234' },
  { id: 15, obj: '7346128061913234' },
  { id: 16, obj: '7346128061913231' },
  { id: 17, obj: '7346128061913232' },
  { id: 18, obj: '7346128061913233' },
  { id: 19, obj: '7346128061913234' },
  { id: 20, obj: '7346128061913235' },
]

export default function TestDeviceObjectBindingPage() {
  return (
    <DeviceObjectBindingPage objects={objects} />
  )
}