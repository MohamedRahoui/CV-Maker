import { boot } from 'quasar/wrappers'
import { Notify } from 'quasar'
import Errors from '@models/errors'

declare module 'vue/types/vue' {
  interface Vue {
    $errors: Errors;
  }
}
const errors: Errors = {
  login: () => {
    Notify.create({
      type: 'negative',
      message: 'les informations d\'identification fournies ne correspondent pas.'
    })
  }
}
export default boot(({ Vue }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$errors = errors
})
