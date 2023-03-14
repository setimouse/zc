import React, { createContext, useState } from "react";

import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const host = 'http://47.94.249.77';
const url = host + '/lmsapi/lms-auth/oauth/token';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const [loginError, setLoginError] = useState(null);

  async function login(username, password) {
    // username = 'admin'; password = '123456';
    const fetchUrl = `${url}?grant_type=captcha&username=${username}&password=${password}`
    return await fetch(fetchUrl, {
      method: 'POST',
      headers: {
        Authorization: 'Basic bWFsbC1hZG1pbi13ZWI6MTIzNDU2',
        'Content-Type': 'application/json',
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
        storage.setItem(data["access_token"]).then(() => {
          setUserInfo(JSON.stringify(data))
          setAccessToken(data['access_token'])
        })
      })
    // .catch(error => {
    //   console.log(error);
    //   setLoginError(error);
    //   throw error;
    // })
  }

  async function logout() {
    const storage = useAsyncStorage("token");
    storage.removeItem();
    setAccessToken(null);
    setUserInfo(null);
  }

  return (
    <AuthContext.Provider value={{ accessToken, userInfo, isLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}