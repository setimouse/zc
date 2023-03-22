import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { AuthContext } from "./AuthContext";
import { baseURL } from "./http_config";

export const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const { tokenType, accessToken } = useContext(AuthContext);

  async function requestDefaultMap() {
    const url = `${baseURL}/lmsapi/lms-map/api/v1/maps/defaultMap`
    return fetch(url, {
      method: 'GET',
      headers: { Authorization: `${tokenType} ${accessToken}`, }
    }).then(resp => resp.json())
      .catch(error => Alert.alert('Oops', error.message))
  }

  async function requestMapList({ deptId, name, pageNum = 1, pageSize = 100 }) {
    const url = `${baseURL}/lmsapi/lms-map/api/v1/maps/pages?pageNum=${pageNum}&pageSize=${pageSize}`
    return fetch(url, {
      method: 'GET',
      headers: { Authorization: `${tokenType} ${accessToken}`, }
    }).then(resp => resp.json())
      .catch(error => Alert.alert('Oops', error.message))
  }

  async function requestIndoorMap({ id }) {
    const url = `${baseURL}/lmsapi/lms-map/api/v1/maps/indoorMap/${id}`
    return fetch(url, {
      method: 'GET',
      headers: { Authorization: `${tokenType} ${accessToken}`, }
    }).then(resp => resp.json())
      .catch(error => Alert.alert('Oops', error.message))
  }

  async function requestListTargetReals({ consumerStatus = 1, deviceList = [], status = 0 }) {
    const url = `${baseURL}/lmsapi/lms-device/api/v1/targets/listTargetReals`
    return fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        consumerStatus: consumerStatus,
        deviceIdList: deviceList,
        status: status,
      })
    }).then(resp => resp.json())
      .catch(error => Alert.alert('Oops', error.message))
  }

  async function requestTargets({ keywords, pageNum = 1, pageSize = 5000, blackStatus = 0 }) {
    // todo: escape keywords
    const url = `${baseURL}/lmsapi/lms-device/api/v1/targets/pages?keywords=${keywords}&pageNum=${pageNum}&pageSize=${pageSize}&blackStatus=${blackStatus}`
    return fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }).then(resp => resp.json())
      .catch(error => Alert.alert('Oops', error.message))
  }

  return (
    <MapContext.Provider value={{
      requestDefaultMap, requestMapList,
      requestIndoorMap, requestListTargetReals, requestTargets
    }}>
      {children}
    </MapContext.Provider>
  )
}
