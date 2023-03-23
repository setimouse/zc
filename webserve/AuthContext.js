import React, { createContext, useState } from "react";

import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { baseURL } from "./http_config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [tokenType, setTokenType] = useState(null)


  async function fetch_json(url, init = {}) {
    var oriInit = {
      method: 'GET',
      headers: { Authorization: `${tokenType} ${accessToken}`, }
    }
    init.headers = Object.assign({}, init.headers, oriInit.headers)

    init = Object.assign(oriInit, init)
    // console.log('init', init)
    return new Promise((resolve, reject) => {
      fetch(url, init)
        .then(resp => resp.json())
        .then(json => {
          // console.log('json', json)
          if (json.code && json.code == '00000') {
            resolve(json)
          } else {
            console.log('fetch json error:', json)
            reject(json)
          }
        })
    })
  }

  async function login(username, password) {
    username = 'admin'; password = '123456';
    const url = baseURL + '/lmsapi/lms-auth/oauth/token';
    const fetchUrl = `${url}?grant_type=captcha&username=${username}&password=${password}`
    console.log('login url=' + fetchUrl);
    return await fetch(fetchUrl, {
      method: 'POST',
      headers: {
        Authorization: 'Basic bWFsbC1hZG1pbi13ZWI6MTIzNDU2',
      },
      params: JSON.stringify({
        username: username,
        password: password,
        grant_type: 'captcha',
        uuid: '',
      })
    }).then(resp => resp.json())
      .then(json => {
        if (json.code !== '00000') {
          console.log(json)
          setLoginError(json['msg']);
          throw new Error(json['msg'])
        }
        return json['data'];
      })
      .then((data) => {
        console.log(data);
        const storage = useAsyncStorage("token");
        setUserInfo(JSON.stringify(data))
        setAccessToken(data['access_token'])
        setTokenType(data['token_type'])
        storage.setItem(data["access_token"]).then(() => {
        })
      })
  }

  async function logout() {
    const url = baseURL + '/lmsapi/lms-auth/oauth/logout';
    const fetchUrl = `${url}`
    console.log('logout url=' + fetchUrl);
    return await fetch(fetchUrl, {
      method: 'DELETE',
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    }).then(resp => resp.json())
      .then((data) => {
        console.log(data);
        const storage = useAsyncStorage("token");
        storage.removeItem();
        setAccessToken(null);
        setUserInfo(null);
      })
  }

  return (
    <AuthContext.Provider value={{ fetch_json, accessToken, tokenType, userInfo, isLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}