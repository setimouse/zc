import React, { createContext, useEffect, useState } from "react";

import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { baseURL } from "./http_config";

const url = baseURL + '/lmsapi/lms-auth/oauth/token';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [tokenType, setTokenType] = useState(null)

  async function login(username, password) {
    username = 'admin'; password = '123456';
    const fetchUrl = `${url}?grant_type=captcha&username=${username}&password=${password}`
    console.log('login url=' + fetchUrl);
    return await fetch(fetchUrl, {
      method: 'POST',
      headers: {
        Authorization: 'Basic bWFsbC1hZG1pbi13ZWI6MTIzNDU2',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        grant_type: 'captcha',
        uuid: '',
      })
    })
      .then(resp => resp.json())
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
    const storage = useAsyncStorage("token");
    storage.removeItem();
    setAccessToken(null);
    setUserInfo(null);
  }

  return (
    <AuthContext.Provider value={{ accessToken, tokenType, userInfo, isLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}