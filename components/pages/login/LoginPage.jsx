import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Image } from 'react-native';
import { useState } from 'react';
import BackgroundImage from '../../../assets/login_bg.png';

export default function LoginPage({ navigation }) {
  const [phoneNumber, setPhoneNumbers] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Image source={BackgroundImage} style={styles.bgimg} />
      <View style={styles.welcome}>
        <Text style={styles.title}>欢迎登录</Text>
      </View>
      <View style={styles.inputbox}>
        <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumbers} placeholder="请输入手机号"></TextInput>
        <TextInput style={styles.input} secureTextEntry={true} value={password} onChangeText={setPassword} placeholder='请输入密码'></TextInput>
      </View>
      <Pressable style={styles.loginButton}
        onPress={() => navigation.replace('main')}
      >
        <Text style={{ color: 'white', fontSize: 16, width: 320, textAlign: 'center' }}>登录</Text>
      </Pressable>
      <Text style={{ fontSize: 14, color: '#3E4146', fontWeight: 'bold' }}>忘记密码？</Text>
      <StatusBar translucent={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 29,
  },
  bgimg: {
    position: 'absolute',
    top: 0, left: 0,
  },
  welcome: {
    width: '100%',
    marginBottom: 60,
  },
  title: {
    fontSize: 24,
    textAlign: 'left',
  },
  inputbox: {
    width: '100%',
    justifyContent: 'space-between',
    height: 112,
  },
  input: {
    backgroundColor: '#F7F8F8',
    fontSize: 14,
    height: 48,
    paddingLeft: 45,
    borderRadius: 24,
    color: '#B0B1B3',
    fontWeight: '600',
  },
  loginButton: {
    justifyContent: 'center',
    width: 320,
    height: 48,
    alignContent: 'center',
    color: '#fff',
    borderRadius: 24,
    backgroundColor: '#2882FF',
    marginVertical: 24,
  }
});