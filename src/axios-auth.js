import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://firestore.googleapis.com/v1/projects/vuejs-axios-f8c84/databases/(default)/documents'
});

export default instance;