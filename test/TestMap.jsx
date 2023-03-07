import React from "react";
import MapPage from "../components/pages/map/MapPage";

export default function TestMapPage({ route, navigation }) {
  return (
    <MapPage navigation={navigation} route={route} />
  )
}