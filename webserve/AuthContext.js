import React, { createContext, useEffect, useState } from "react";

import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { baseURL } from "./http_config";
import CryptoJS from "crypto-js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [tokenType, setTokenType] = useState(null)
  const [me, setMe] = useState({});
  const [siteSetting, setSiteSetting] = useState({});
  const [secretKeySpec, setSecretKeySpec] = useState();
  const [ivParameterSpec, setIvParameterSpec] = useState();

  useEffect(() => {
    console.log('setting', siteSetting)
    if (typeof siteSetting !== 'object') {
      return
    }
    setSecretKeySpec(siteSetting.secretKeySpec)
    setIvParameterSpec(siteSetting.ivParameterSpec)
  }, [siteSetting])


  useEffect(() => {
    requestSiteSetting().then(setting => setSiteSetting(setting))
      .catch(error => console.log('request site setting error:', error))
  }, [])

  async function fetch_json(url, init = {}) {
    var oriInit = {
      method: 'GET',
      headers: { Authorization: `${tokenType} ${accessToken}`, }
    }
    init.headers = Object.assign({}, init.headers, oriInit.headers)

    init = Object.assign(oriInit, init)
    // console.log('init', init)
    return new Promise((resolve, reject) => {
      console.log('fetch json url:', url)
      fetch(url, init)
        .then(resp => resp.json())
        .then(json => {
          // console.log('json', json)
          if (json.code && json.code == '00000') {
            resolve(json)
          } else if (json.code && json.code === 'A0230') {
            // token无效或已过期
            setAccessToken(null)
            reject(json)
          } else {
            console.log('fetch json error:', json)
            reject(json)
          }
        })
        .catch(error => console.log('fetch json error url:', url, '\n==========\n', 'error', error))
    })
  }

  async function requestSiteSetting() {
    const url = `${baseURL}/lmsapi/lms-admin/api/v1/siteSetting`
    console.log('request site setting', url)
    return fetch(url)
      .then(resp => resp.json())
      .then(json => {
        console.log('json', json)
        if (json.code && json.code == '00000') {
          return json
        } else {
          console.log('fetch json error:', json)
          throw json
        }
      })
      .then(json => json.data)
  }

  async function login(username, password) {
    if (__DEV__) {
      username = 'admin'; password = '123456';
    }

    const encode = (data) => {
      console.log('key:', secretKeySpec, 'iv:', ivParameterSpec)
      var key = CryptoJS.enc.Latin1.parse(secretKeySpec);
      var iv = CryptoJS.enc.Latin1.parse(ivParameterSpec);
      var encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
      });
      return encrypted.toString();
    }

    if (siteSetting.encryptPwd) {
      password = encode(password)
    }

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
        if (json.code === 'B0001') {
          console.log(json)
          throw new Error('请输入用户名密码')
        }
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
        setUserInfo(data)
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

  async function loadMe() {
    const url = `${baseURL}/lmsapi/lms-admin/api/v1/users/me`
    return fetch_json(url)
      .then(resp => resp.data)
      .then(data => setMe(data))
      .catch(console.log)
  }

  return (
    <AuthContext.Provider value={{
      fetch_json, accessToken, tokenType,
      userInfo, isLogin, login, logout, loadMe, me,
      siteSetting,
    }}>
      {children}
    </AuthContext.Provider>
  )
}