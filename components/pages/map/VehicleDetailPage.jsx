import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, SectionList, Pressable, ScrollView } from "react-native";
import { MapContext } from "../../../webserve/MapContext";
import ButtonWidget from "../../widgets/ButtonWidget";
import SectionGroupList from "../../widgets/SectionGroupList";

export default function VehicleDetailPage() {
  const { requestVehicleBase, requestVehicleDetail, } = useContext(MapContext);
  const navigation = useNavigation();
  const route = useRoute();

  const [vehicleBase, setVehicleBase] = useState([]);
  const [vehicleDetail, setVehicleDetail] = useState([]);
  const [vehicle, setVehicle] = useState([
    // {
    //   title: '基础信息',
    //   data: [
    //     { key: '车号', value: '' },
    //     { key: '设备编号', value: '' },
    //     { key: '检修情况', value: '' },
    //     { key: '当前台位', value: '' },
    //   ],
    // },
    // {
    //   title: '车辆信息',
    //   data: [
    //     { key: '合并车型', value: '' },
    //     { key: '全场', value: '' },
    //     { key: '制造厂', value: '' },
    //     { key: '制造年月', value: '' },
    //   ],
    // },
  ]);


  useEffect(() => {
    const param = route.params.vehicle;
    console.log('param', param)
    const carNo = param.consumerId;
    requestVehicleBase({ carNo: carNo })
      .then(resp => console.log('resp', resp))
  }, [])

  return (
    <View style={{ flex: 1, padding: 12, backgroundColor: '#F4F6F8' }}>
      <ScrollView>
        <SectionGroupList data={vehicle} />
        <ButtonWidget title="定位" onPress={() => navigation.navigate('mapmain')} />
      </ScrollView>
    </View>
  )
}
