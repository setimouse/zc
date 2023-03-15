import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { baseURL } from "./http_config";

export const AlarmContext = createContext();

export const AlarmProvider = ({ children }) => {
  const [alarmCount, setAlarmCount] = useState()
  const [alarmItems, setAlarmItems] = useState([])
  const { tokenType, accessToken } = useContext(AuthContext);
  const [alarmList, setAlarmList] = useState({})

  useEffect(function () {
    console.log('start interval')
    reminder();
    const timer = setInterval(() => {
      reminder()
    }, 3000);
    return function () {
      clearInterval(timer);
    }
  }, [tokenType])

  async function reminder() {
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
  }

  async function alarmEvent({ processingStatus, pageSize = 10, pageNum = 1 }) {
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
        let list = alarmList;
        list[processingStatus] = data.list;
        setAlarmList(list);
        // return data;
        console.log(data);
      })
      .catch(error => {
        console.log('error', error.message)
      });
  }

  return (
    <AlarmContext.Provider value={{ alarmCount, alarmItems, alarmEvent, alarmList }}>
      {children}
    </AlarmContext.Provider>
  )
}