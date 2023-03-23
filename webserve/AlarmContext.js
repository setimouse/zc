import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { baseURL } from "./http_config";

export const AlarmContext = createContext();

export const AlarmProvider = ({ children }) => {
  const [alarmCount, setAlarmCount] = useState()
  const [alarmItems, setAlarmItems] = useState([])
  const { fetch_json, tokenType, accessToken } = useContext(AuthContext);

  useEffect(function () {
    console.log('start interval')
    reminder();
    // const timer = setInterval(() => {
    //   reminder()
    // }, 3000);
    return function () {
      // clearInterval(timer);
    }
  }, [tokenType])

  async function reminder() {
    console.log('alarm reminder')
    axios.get('/lmsapi/lms-admin/api/v1/reminder', {
      baseURL: baseURL,
      headers: { Authorization: `${tokenType} ${accessToken}` }
    })
      .then(response => {
        let respData = response.data
        if (respData['code'] !== '00000') {
          return Promise.reject(response);
        }
        let data = respData.data;
        setAlarmCount(data.count);
        setAlarmItems(data.items)
        console.log(data);
      })
      .catch(error => {
        console.log(error)
      });
    // const url = `${baseURL}/lmsapi/lms-admin/api/v1/reminder`
    // fetch_json(url)
    //   .then(response => {
    //     let respData = response.data
    //     let data = respData.data;
    //     setAlarmCount(data.count);
    //     setAlarmItems(data.items)
    //     console.log(data);
    //   })
  }

  async function alarmEvent({ processingStatus, pageSize = 10, pageNum = 1 }) {
    console.log('request alarm list, processing=', processingStatus)
    return await axios.get('/lmsapi/lms-map/api/v1/alarmEvents/pages', {
      baseURL: baseURL,
      params: {
        processingStatus: processingStatus,
        pageSize: pageSize,
        pageNum: pageNum,
      },
      headers: { Authorization: `${tokenType} ${accessToken}` },
    })
      .then(response => {
        let respData = response.data
        if (respData['code'] !== '00000') {
          return Promise.reject(response);
        }
        let data = respData.data;
        return data;
        // console.log(data);
      })
      .catch(error => {
        console.log('error', error.message)
      });
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