import axios from "axios";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "./AuthContext";
import { baseURL, dealError } from "./http_config";

export const AlarmContext = createContext();

export const AlarmProvider = ({ children }) => {
  const [alarmCount, setAlarmCount] = useState()
  const [alarmItems, setAlarmItems] = useState([])
  const { fetch_json, tokenType, accessToken } = useContext(AuthContext);

  const [alarmingList, setAlarmingList] = useState([]);
  const [alarmingCount, setAlarmingCount] = useState(0);
  // const [alarmingPage, setAlarmingPage] = useState(1);
  let alarmingPage = useRef(1);

  const [alarmEndList, setAlarmEndList] = useState([]);
  const [alarmEndCount, setAlarmEndCount] = useState(0);
  // const [alarmEndPage, setAlarmEndPage] = useState(1);
  let alarmEndPage = useRef(1);

  async function reminder() {
    console.log('alarm reminder')
    const url = `${baseURL}/lmsapi/lms-admin/api/v1/reminder`
    return fetch_json(url)
      .then(resp => resp.data)
      .then(data => {
        console.log('alarm data', data);
        setAlarmCount(data.count)
        setAlarmItems(data.items)
      })
      .catch(error => dealError(error))
    // return axios.get('/lmsapi/lms-admin/api/v1/reminder', {
    //   baseURL: baseURL,
    //   headers: { Authorization: `${tokenType} ${accessToken}` }
    // })
    //   .then(response => {
    //     let respData = response.data
    //     if (respData['code'] !== '00000') {
    //       return Promise.reject(response);
    //     }
    //     let data = respData.data;
    //     console.log('alarm data', data);
    //     setAlarmCount(data.count);
    //     setAlarmItems(data.items)
    //   })
    //   .catch(error => {
    //     console.log('reminder error', error)
    //   });
  }

  async function alarmEvent({ processingStatus, pageSize = 10, pageNum = 1 }) {
    console.log('request alarm list, processing=', processingStatus)
    const url = `${baseURL}/lmsapi/lms-map/api/v1/alarmEvents/pages?processingStatus=${processingStatus}&pageSize=${pageSize}&pageNum=${pageNum}`
    return fetch_json(url)
      .then(resp => resp.data)
      .then(data => { console.log('alarm data', data); return data })
      .catch(error => dealError(error))
  }

  async function alarmDetail({ id }) {
    console.log('alarm detail, id=', id)
    return await axios.get(`/lmsapi/lms-map/api/v1/alarmEvents/detail/${id}`, {
      baseURL: baseURL,
      params: {
        id: id,
      },
      headers: { Authorization: `${tokenType} ${accessToken}` },
    })
      .then(response => {
        let respData = response.data
        console.log(respData);
        if (respData['code'] !== '00000') {
          return Promise.reject(respData);
        }
        let data = respData.data;
        return data;
        // console.log(data);
      })
      .catch(error => {
        console.log('error', error.message)
      });
  }

  async function alarmDeal({ idList, opinion, isMisinformation }) {
    console.log('alarm deal, id=', JSON.stringify(idList))
    return await fetch(`${baseURL}/lmsapi/lms-map/api/v1/alarmEvents/dealWith`, {
      method: 'PUT',
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        alarmEventIdList: idList,
        opinion: opinion,
        isMisinformation: isMisinformation
      })
    }).then(response => response.json())
      .then(json => {
        console.log(json);
      })
      .catch(error => {
        console.log(error)
        throw error
      })
  }

  /**
   * 告警中
   */
  async function requestAlarming() {
    console.log('request 告警中')
    const url = `${baseURL}/lmsapi/lms-map/api/v1/alarmEvents/pages?pageNum=${alarmingPage.current}&pageSize=10`
    fetch_json(url)
      .then(resp => resp.data)
      .then(data => { console.log('alarm ing', data); return data })
      .then(data => data.list)
      .then(list => alarmEndList.concat(list))
      .then(setAlarmingList)
      .catch(dealError)
    alarmingPage.current++
  }

  async function refreshAlarming() {
    setAlarmingList([])
    alarmingPage.current = 1
    requestAlarming()
  }

  /**
   * 告警结束
   */
  async function requestAlarmEnd() {
    console.log('request 告警结束')
    const url = `${baseURL}/lmsapi/lms-map/api/v1/alarmEvents/alarmEventEnd?pageNum=${alarmEndPage.current}&pageSize=10`
    fetch_json(url)
      .then(resp => resp.data)
      .then(data => { console.log('alarm end', data); return data })
      .then(data => data.list)
      .then(list => alarmEndList.concat(list))
      .then(setAlarmEndList)
      .catch(dealError)
    alarmEndPage.current++
  }

  async function refreshAlarmEnd() {
    setAlarmEndList([])
    alarmEndPage.current = 1
    requestAlarmEnd()
  }

  return (
    <AlarmContext.Provider value={{
      reminder, alarmCount, alarmItems, alarmEvent, alarmDetail, alarmDeal,
      requestAlarming, requestAlarmEnd,
      alarmingList, alarmEndList,
      refreshAlarming, refreshAlarmEnd,
    }}>
      {children}
    </AlarmContext.Provider>
  )
}