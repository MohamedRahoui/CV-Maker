import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { boot } from 'quasar/wrappers'

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }
}
import { get } from 'lodash'

const URL = process.env.DEV ? 'http://localhost:8000/api/' : 'HOST'
const api = axios.create({
  baseURL: URL,
  Authorization: `Token ${get(localStorage, '__d.auth.token')}`
} as AxiosRequestConfig)

export default boot(({ Vue }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$axios = api
})
export const API = api
