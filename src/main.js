import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'

Vue.config.productionTip = false

axios.defaults.baseURL = 'https://firestore.googleapis.com/v1/projects/vuejs-axios-f8c84/databases/(default)/documents';

const interceptorsRequest = axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
const interceptorsResponse = axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.request.eject(interceptorsRequest);
axios.interceptors.request.eject(interceptorsResponse);


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
