import Vue from 'vue'
import axios from 'axios'
import {get} from 'lodash'
import {Notify} from 'quasar'

const URL = process.env.DEV ? 'http://localhost:8000/api/' : 'HOST';
const api = axios.create({
  baseURL: URL,
  Authorization: `Token ${get(localStorage, '__d.auth.token')}`
});

api.errorCallback = () => {
  Notify.create({
    type: 'negative',
    message: `les informations d'identification fournies ne correspondent pas.`
  });
};



Vue.prototype.$axios = api;

export {api}
