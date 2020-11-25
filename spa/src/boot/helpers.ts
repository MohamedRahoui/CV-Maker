import { boot } from 'quasar/wrappers'
import { Notify } from 'quasar'
import Errors, { Tools } from '@models/errors'
import { get } from 'lodash'

declare module 'vue/types/vue' {
  interface Vue {
    $errors: Errors;
    $tools: Tools;
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
  MONTHS,
  getMonth (month: string): string {
    if (!month && parseInt(month) > 13) return ''
    return MONTHS[parseInt(month)]
  },
  getMonthsOptions () {
    return MONTHS.slice(1).map((x, i) => {
      return { label: x, value: i + 1 }
    })
  },
  getJsonField (field, name, noneVal) {
    if (!field) return []
    const json = JSON.parse(field.replace(/'/g, '"'))
    return get(json, name, noneVal)
  },
  removeJsonItem (field, name, noneVal, toRemove, hasValue?) {
    const list = this.getJsonField(field, name, noneVal)
    if (list.length) {
      const newObj = {}
      newObj[name] = hasValue
        ? list.filter(x => x.value !== toRemove)
        : list.filter(x => x !== toRemove)
      return JSON.stringify(newObj)
    }
  },
  addJsonItem (field, name, noneVal, toAdd) {
    const list = this.getJsonField(field, name, noneVal)
    list.push(toAdd)
    const newObj = {}
    newObj[name] = list
    return JSON.stringify(newObj)
  }
}
export default boot(({ Vue }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$errors = errors
  Vue.prototype.$tools = tools
})
