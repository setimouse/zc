import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const host = 'http://47.94.249.77';

const url = host + '/lmsapi/lms-auth/oauth/token';

async function login(username, password) {
  username = 'admin'; password = '123456';
  const fetchUrl = `${url}?grant_type=captcha&username=${username}&password=${password}`
  return await fetch(fetchUrl, {
    method: 'POST',
    headers: {
      Authorization: 'Basic bWFsbC1hZG1pbi13ZWI6MTIzNDU2',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
      grant_type: 'captcha',
      uuid: '',
    })
  })
    .then((resp) => resp.json())
    .then(json => {
      console.log(json)
      let code = json.code;
      if (code !== '00000') {
        return Promise.reject(json);
      }
      return json['data'];
    })
    .then(data => {
      console.log(data);
      const storage = useAsyncStorage("token");
      storage.setItem(data["access_token"]).then(() => {
        return true;
      })
    })
    .catch(error => {
      throw error;
    })
}

async function logout() {
  const storage = useAsyncStorage("token");
  storage.removeItem();
}

export { login, logout }