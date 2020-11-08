import Component from 'vue-class-component'
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { fullName } from 'src/models/user'

@Component({
  computed: {
    ...mapGetters([
      'user'
    ])
  }
})
export default class UserInfo extends Vue {
  fullName (): string {
    return fullName(this.$store.getters.user)
  }
}
