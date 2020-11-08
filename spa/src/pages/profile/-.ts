import Component from 'vue-class-component'
import Vue from 'vue'
import UserInfo from './user-info/-.vue'
import ExperienceComponent from 'pages/profile/experience/-.vue'
import { mapGetters } from 'vuex'

@Component({
  components: {
    'user-info': UserInfo,
    experience: ExperienceComponent
  },
  computed: {
    ...mapGetters([
      'experiences'
    ])
  }
})
export default class Profile extends Vue {
  name = 'Profile'

  created () {
    this.$store.dispatch('fetchExperiences').then()
  }
}
