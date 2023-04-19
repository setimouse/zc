import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { baseURL, dealError } from "./http_config";

export const AlarmContext = createContext();

export const AlarmProvider = ({ children }) => {
  const [alarmCount, setAlarmCount] = useState()
  const [alarmItems, setAlarmItems] = useState([])
  const { fetch_json, tokenType, accessToken } = useContext(AuthContext);

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

    // return await axios.get('/lmsapi/lms-map/api/v1/alarmEvents/pages', {
    //   baseURL: baseURL,
    //   params: {
    //     processingStatus: processingStatus,
    //     pageSize: pageSize,
    //     pageNum: pageNum,
    //   },
    //   headers: { Authorization: `${tokenType} ${accessToken}` },
    // })
    //   .then(response => {
    //     let respData = response.data
    //     if (respData['code'] !== '00000') {
    //       return Promise.reject(response);
    //     }
    //     let data = respData.data;
    //     return data;
    //     // console.log(data);
    //   })
    //   .catch(error => {
    //     console.log('error', error.message)
    //   });
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

  return (
    <AlarmContext.Provider value={{ reminder, alarmCount, alarmItems, alarmEvent, alarmDetail, alarmDeal }}>
      {children}
    </AlarmContext.Provider>
  )
}