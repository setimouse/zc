import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Alert, Text, View, TextInput, Pressable, Image, ImageBackground, Dimensions } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import BackgroundImage from '../../../assets/login_bg.png';
import { AuthContext } from '../../../webserve/AuthContext';
import IconUser from '../../../assets/login_icon_user.png';
import IconPassword from '../../../assets/login_icon_password.png';
import { Ionicons } from '@expo/vector-icons';

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
  const { login } = useContext(AuthContext)
  const [phoneNumber, setPhoneNumbers] = useState('');
  const [password, setPassword] = useState('');
  const { width, height } = Dimensions.get('screen');
  const [hidePassword, setHidePassword] = useState()

  const usernameMaxLength = 30

  useEffect(() => {
    setHidePassword(true)
  }, [])

  return (
    <View style={styles.container}>
      <ImageBackground source={BackgroundImage} resizeMode="cover" style={[{ width, height }, styles.bgimg]}>
        <View style={styles.welcome}>
          <Text style={styles.title}>欢迎登录</Text>
        </View>
        <View style={styles.inputbox}>
          <InputIconBox placeholder="请输入帐号" source={IconUser} value={phoneNumber} onChangeText={setPhoneNumbers}
            tip={
              <Text style={{ fontSize: 10, color: 'lightgrey' }}>
                {phoneNumber.length}/{usernameMaxLength}
              </Text>
            }
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
        </View>
        <Pressable style={styles.loginButton}
          onPress={() => {
            login(phoneNumber, password)
              .catch((error) => {
                Alert.alert('', error.message);
              })
          }}
        >
          <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>登录</Text>
        </Pressable>
        {/* <Text style={{ fontSize: 14, color: '#3E4146', fontWeight: 'bold' }}>忘记密码？</Text> */}
        <StatusBar translucent={true} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgimg: {
    flex: 1,
    paddingHorizontal: 29,
    // backgroundColor: 'red'
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
    marginVertical: 24,
  }
});