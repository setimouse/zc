import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { MapContext } from "../../../webserve/MapContext";
import ButtonWidget from "../../widgets/ButtonWidget";
import SectionGroupList from "../../widgets/SectionGroupList";

export default function VehicleDetailPage() {
  const { requestVehicleBase, requestVehicleDetail, } = useContext(MapContext);
  const navigation = useNavigation();
  const route = useRoute();

  const [vehicleBase, setVehicleBase] = useState({ title: '', data: [] });
  const [vehicleDetail, setVehicleDetail] = useState({ title: '', data: [] });
  const [vehicle, setVehicle] = useState([]);

  useEffect(() => {
    // console.log(vehicleBase)
    // console.log(vehicleDetail)
    setVehicle([vehicleBase, vehicleDetail])
  }, [vehicleBase, vehicleDetail])

  function baseArrived(data) {
    // console.log('base', data);
    data = data.map(e => {
      return { key: e.label, value: e.val }
    })
    setVehicleBase({
      title: '基础信息',
      data: data,
    })
  }

  function detailArrived(data) {
    // console.log('detail', data);
    data = data.map(e => {
      return { key: e.label, value: e.val }
    })
    setVehicleDetail({
      title: '车辆信息',
      data: data,
    })
  }

  useEffect(() => {
    const param = route.params.vehicle;
    console.log('param', param)
    const carNo = param.consumerName;
    requestVehicleBase({ carNo: carNo }).then(resp => resp.data).then(baseArrived)
    requestVehicleDetail({ carNo: carNo }).then(resp => resp.data).then(detailArrived)
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: '#F4F6F8' }}>
      <ScrollView style={{ paddingHorizontal: 12, flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <SectionGroupList data={vehicle} />
        <ButtonWidget title="定位"
          onPress={() => navigation.navigate('mapmain', {
            deviceId: route.params.vehicle.deviceId
          })}
        />
      </ScrollView>
    </View>
  )
}
