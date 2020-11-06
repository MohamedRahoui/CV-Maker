import Component from 'vue-class-component'
import Vue from 'vue'
import UserInfo from './user-info/-.vue'

@Component({
  components: {
    'user-info': UserInfo
  }
})
export default class Profile extends Vue {
  name = 'Profile'
}
