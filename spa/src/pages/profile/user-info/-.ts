import Component from 'vue-class-component'
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { get } from 'lodash'
import { fullName } from 'src/models/user'
import Experience from '@models/experience'

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

  currentExperience (): Experience {
    return get(this.$store.getters.user, 'experiences.0')
  }
}
