import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { AuthContext } from "./AuthContext";
import { baseURL } from "./http_config";

export const MapContext = createContext();

function dealError(error) {
  console.log('Oops', error.message)
}

export const MapProvider = ({ children }) => {
  const { fetch_json } = useContext(AuthContext);

  /**
   * 获取默认地图 
   */
  async function requestDefaultMap() {
    const url = `${baseURL}/lmsapi/lms-map/api/v1/maps/defaultMap`
    return fetch_json(url)
      .catch(error => dealError(error))
  }

  /**
   * 获取地图列表
   */
  async function requestMapList({ deptId, name, pageNum = 1, pageSize = 100 }) {
    const url = `${baseURL}/lmsapi/lms-map/api/v1/maps/pages?pageNum=${pageNum}&pageSize=${pageSize}`
    return fetch_json(url)
      .catch(error => dealError(error))
  }

  /**
   * 查询室内地图信息
   */
  async function requestIndoorMap({ id }) {
    const url = `${baseURL}/lmsapi/lms-map/api/v1/maps/indoorMap/${id}`
    return fetch_json(url).catch(dealError)
  }

  /**
   * 获取设备实时位置
   */
  async function requestListTargetRealsDevice({ consumerStatus = 1, deviceList = [], status = 0 }) {
    const url = `${baseURL}/lmsapi/lms-device/api/v1/targets/listTargetReals`
    return fetch_json(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        consumerStatus: consumerStatus,
        deviceIdList: deviceList,
        status: status,
      })
    })
      .catch(error => dealError(error))
  }

  /**
   * 搜索设备
   */
  async function requestTargets({ keywords, pageNum = 1, pageSize = 5000, blackStatus = 0 }) {
    // todo: escape keywords
    const url = `${baseURL}/lmsapi/lms-device/api/v1/targets/pages?keywords=${keywords}&pageNum=${pageNum}&pageSize=${pageSize}&blackStatus=${blackStatus}`
    return fetch_json(url)
      .catch(error => dealError(error))
  }

  /**
   * 获取设备详情
   */
  async function requestDeviceDetail({ targetId }) {
    const url = `${baseURL}/lmsapi/lms-device/api/v1/targets/detail/${targetId}`
    return fetch_json(url)
      .catch(error => dealError(error))
  }

  /**
   * 获取台位信息
   */
  async function requestStation({ x, y }) {
    const url = `${baseURL}/lmsapi/lms-crrc/api/v1/crrc/map/station?x=${x}&y=${y}`
    return fetch_json(url)
      .catch(error => dealError(error))
  }

  /**
   * 设备类型列表
   * 获取设备图片
   */
  async function requestListTargetTypes() {
    const url = `${baseURL}/lmsapi/lms-device/api/v1/targetTypes/listTargetTypes`
    return fetch_json(url)
      .catch(error => dealError(error))
  }

  /**
   * 绑定对象
   */
  async function requestBind({ targetId, consumerId }) {
    const url = `${baseURL}/lmsapi/lms-device/api/v1/targets/bind/${targetId}?consumerId=${consumerId}`
    return fetch_json(url, {
      method: 'PATCH',
    }).catch(error => dealError(error))
  }

  /**
   * 解绑对象
   */
  async function requestUnbind({ targetId }) {
    const url = `${baseURL}/lmsapi/lms-device/api/v1/targets/unbind/${targetId}`
    return fetch_json(url, {
      method: 'PATCH',
    }).catch(error => dealError(error))
  }

  /**
   * 搜索车辆、设备（地图搜索）
   */
  async function requestListTargetReals({ consumerStatus = 1, consumerName }) {
    const url = `${baseURL}/lmsapi/lms-device/api/v1/targets/listTargetReals`
    return fetch_json(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        consumerName: consumerName,
        consumerStatus: consumerStatus,
      })
    })
      .catch(error => dealError(error))
  }

  /**
   * 车辆基本信息
   * @param {carNo} param0 
   */
  async function requestVehicleBase({ carNo }) {
    const url = `${baseURL}/lmsapi/lms-crrc/api/v1/crrc/vehicles/${carNo}/base`
    return fetch_json(url)
      .catch(error => dealError(error))

  }

  /**
   * 车辆详细信息
   * @param {carNo} param0 
   */
  async function requestVehicleDetail({ carNo }) {
    const url = `${baseURL}/lmsapi/lms-crrc/api/v1/crrc/vehicles/${carNo}`
    return fetch_json(url)
      .catch(error => dealError(error))

  }

  return (
    <MapContext.Provider value={{
      requestDefaultMap, requestMapList,
      requestIndoorMap, requestListTargetReals, requestTargets, requestDeviceDetail,
      requestStation, requestListTargetTypes,
      requestBind, requestUnbind,
      requestVehicleBase, requestVehicleDetail,
      requestListTargetRealsDevice,
    }}>
      {children}
    </MapContext.Provider>
  )
}
