import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard,
  Pressable, Image, ImageBackground, SafeAreaView, KeyboardAvoidingView
} from 'react-native';
import { useContext, useEffect, useState } from 'react';
import BackgroundImage from '../../../assets/login_bg.png';
import { AuthContext } from '../../../webserve/AuthContext';
import IconUser from '../../../assets/login_icon_user.png';
import IconPassword from '../../../assets/login_icon_password.png';
import { Ionicons } from '@expo/vector-icons';
import { AlertError, SimpleAlert } from '../../../common/global';

function InputIconBox({ placeholder, maxLength = 9999, source, onChangeText, value, secureTextEntry = false, tip }) {
  const s = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: '#F7F8F8',
      height: 48,
      paddingVertical: 12,
      paddingLeft: 20,
      borderRadius: 24,
      marginBottom: 16,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    icon: {
      width: 16,
      resizeMode: 'contain',
      marginRight: 10,
    },
    input: {
      fontSize: 14,
      color: '#B0B1B3',
      fontWeight: '500',
      height: 44,
      flex: 1,
    },
    tip: {
      height: 44,
      alignItems: 'center',
      alignContent: 'center',
      flexDirection: 'row',
      paddingHorizontal: 18,
    }
  });

  return (
    <View style={s.container}>
      <Image source={source} style={s.icon} />
      <TextInput placeholder={placeholder} secureTextEntry={secureTextEntry}
        onChangeText={onChangeText} value={value} style={s.input} maxLength={maxLength} />
      <View style={s.tip}>
        {tip}
      </View>
    </View>
  )
}

export default function LoginPage() {
  const { login, captcha, requestCaptcha } = useContext(AuthContext)
  const [phoneNumber, setPhoneNumbers] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState()
  const [wrongTimes, setWrongTimes] = useState(0);
  const [verifyCode, setVerifyCode] = useState('');
  const usernameMaxLength = 30

  useEffect(() => {
    setHidePassword(true)
  }, [])

  useEffect(() => {
    if (wrongTimes > 2) {
      console.log('wrong time over', wrongTimes)
      requestCaptcha()
    }
  }, [wrongTimes])

  useEffect(() => {
    console.log('captcha', captcha)
  }, [captcha])

  return (
    <ImageBackground source={BackgroundImage} resizeMethod="resize" style={[styles.container,]}>
      <StatusBar translucent={true} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <KeyboardAvoidingView
            behavior='height'
            style={{ paddingHorizontal: 29, flex: 1, justifyContent: 'center' }}>
            <View>
              <View style={{ marginBottom: 60, }}>
                <Text style={styles.title}>欢迎登录</Text>
              </View>
              <View style={styles.inputbox}>
                <InputIconBox placeholder="请输入帐号" source={IconUser} value={phoneNumber} onChangeText={setPhoneNumbers}
                  // tip={
                  //   <Text style={{ fontSize: 10, color: 'lightgrey' }}>
                  //     {phoneNumber.length}/{usernameMaxLength}
                  //   </Text>
                  // }
                  maxLength={30}
                />
                <InputIconBox placeholder="请输入密码" secureTextEntry={hidePassword} source={IconPassword} value={password} onChangeText={setPassword}
                  tip={
                    <Pressable onPressIn={() => {
                      setHidePassword(!hidePassword)
                    }} >
                      <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={16} color="black" />
                    </Pressable>
                  }
                />
                {captcha &&
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, }}>
                    <TextInput style={{
                      borderColor: '#ccc', borderWidth: 1,
                      width: '50%', height: 32, paddingHorizontal: 8,
                      flex: 0.5
                      // backgroundColor: 'red',
                    }}
                      placeholder='请输入验证码'
                      onChangeText={setVerifyCode}
                      value={verifyCode}
                    />
                    <Pressable onPress={() => requestCaptcha()} style={{ flex: 0.45, borderColor: '#ccc', borderWidth: 1, }}>
                      <Image source={{ uri: captcha.img }} style={{ flex: 1 }} />
                    </Pressable>
                  </View>
                }
                <Pressable style={styles.loginButton}
                  onPress={() => {
                    if (captcha && verifyCode == '') {
                      SimpleAlert('请输入验证码')
                      return
                    }
                    login(phoneNumber, password, verifyCode)
                      .catch((error) => {
                        if (error.message === "Network request failed") {
                          SimpleAlert("网络请求失败")
                          return
                        }
                        if (error.message && error.message.indexOf("JSON Parse error:") > -1) {
                          SimpleAlert("登录服务异常，请稍后再试")
                          return
                        }
                        setWrongTimes(wrongTimes + 1)
                        AlertError(error)
                      })
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>登录</Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
          <View style={{ marginBottom: 44, }}>
            <Image source={require('../../../assets/logo.png')} style={{ height: 63, alignSelf: 'center', }} resizeMode='contain' />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 600,
  },
  welcome: {
    marginTop: 139,
    marginBottom: 60,
  },
  title: {
    fontSize: 24,
    textAlign: 'left',
    fontWeight: 600,
  },
  loginButton: {
    justifyContent: 'center',
    width: '100%',
    height: 48,
    alignContent: 'center',
    color: '#fff',
    borderRadius: 24,
    backgroundColor: '#2882FF',
    // marginVertical: 24,
  }
});
