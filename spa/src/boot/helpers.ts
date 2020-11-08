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
const MONTHS: string[] = ['', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

const tools = {
  getMonth (month: string): string {
    if (!month && parseInt(month) > 13) return ''
    return MONTHS[parseInt(month)]
  }
}
export default boot(({ Vue }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$errors = errors
  Vue.prototype.$tools = tools
})
