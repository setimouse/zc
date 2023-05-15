import React, { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { baseURL, dealError } from "./http_config";

export const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const { fetch_json } = useContext(AuthContext);
  const [department, setDepartment] = useState([]);

  /**
   * 获取组织架构
   */
  async function requestDepartment() {
    const url = `${baseURL}/lmsapi/lms-admin/api/v1/depts/options`
    fetch_json(url).then(json => json.data)
      .then(setDepartment)
      .catch(dealError)
  }

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
    var body = {
      consumerStatus: consumerStatus,
      deviceIdList: deviceList,
      status: status,
    }
    console.log('request body', body)
    return fetch_json(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
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
   * 获取已绑定设备
   */
  async function requestBindedTargets({ keywords, pageNum = 1, pageSize = 5000, }) {
    const url = `${baseURL}/lmsapi/lms-device/api/v1/targets/pages?keywords=${keywords}&pageNum=${pageNum}&pageSize=${pageSize}&blackStatus=0&consumerStatus=1&orderField=consumerTime&sort=desc`
    return fetch_json(url)
      .catch(dealError)
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
   * 通过设备编码获取设备详情
   */
  async function requestDeviceDetailByNo({ deviceId }) {
    const url = `${baseURL}/lmsapi/lms-device/api/v1/targets/detailByNo/${deviceId}`
    return fetch_json(url)
      .catch(dealError)
  }

  /**
   * 获取部门下未绑定设备
   */
  async function requestUnbindDevice({ deptId, value }) {
    let url = `${baseURL}/lmsapi/lms-device/api/v1/localConsumers/pages/all?onlineStatus=4&pageNum=1&pageSize=1000`
    if (deptId !== undefined) {
      url += `&deptId=${deptId}`
    }
    if (value !== undefined) {
      url += `&value=${value}`
    }
    console.log('ddd request unbind device', url)
    return fetch_json(url)
      .catch(dealError)
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
        deviceIdList: [],
        room: '',
        deviceTargetTypeList: [],
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

  /**
   * 查询设备所在地图
   */
  async function requestTargetInsideMap({ deviceId }) {
    const url = `${baseURL}/lmsapi/lms-device/api/v1/targets/insideMap/${deviceId}`
    return fetch_json(url)
      .catch(dealError)
  }

  return (
    <MapContext.Provider value={{
      department,
      requestDefaultMap, requestMapList,
      requestIndoorMap, requestListTargetReals, requestDeviceDetail,
      requestTargets, requestBindedTargets,
      requestStation, requestListTargetTypes,
      requestBind, requestUnbind,
      requestVehicleBase, requestVehicleDetail,
      requestListTargetRealsDevice,
      requestTargetInsideMap,
      requestDepartment,
      requestDeviceDetailByNo,
      requestUnbindDevice,
    }}>
      {children}
    </MapContext.Provider>
  )
}
