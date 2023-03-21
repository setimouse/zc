import React, { createContext, useContext, useEffect, useState } from "react";
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
  }

  async function requestMapList({ deptId, name, pageNum = 1, pageSize = 100 }) {
    const url = `${baseURL}/lmsapi/lms-map/api/v1/maps/pages?pageNum=${pageNum}&pageSize=${pageSize}`
    return fetch(url, {
      method: 'GET',
      headers: { Authorization: `${tokenType} ${accessToken}`, }
    }).then(resp => resp.json())
      .catch(error => console.log(error))
  }

  async function requestIndoorMap({ id }) {
    const url = `${baseURL}/lmsapi/lms-map/api/v1/maps/indoorMap/${id}`
    return fetch(url, {
      method: 'GET',
      headers: { Authorization: `${tokenType} ${accessToken}`, }
    }).then(resp => resp.json())
      .catch(error => console.log(error))
  }

  return (
    <MapContext.Provider value={{ requestDefaultMap, requestMapList, requestIndoorMap }}>
      {children}
    </MapContext.Provider>
  )
}
