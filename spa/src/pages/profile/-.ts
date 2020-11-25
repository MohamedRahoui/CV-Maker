import Component from 'vue-class-component'
import Vue from 'vue'
import UserInfo from './user-info/-.vue'
import ExperienceComponent from 'pages/profile/experience/-.vue'
import EducationComponent from 'pages/profile/education/-.vue'
import { mapGetters } from 'vuex'

@Component({
  components: {
    'user-info': UserInfo,
    experience: ExperienceComponent,
    education: EducationComponent
  },
  computed: {
    ...mapGetters([
      'experiences',
      'educations'
    ])
  }
})
export default class Profile extends Vue {
  name = 'Profile'

  created () {
    this.$store.dispatch('fetchExperiences').then()
    this.$store.dispatch('fetchEducations').then()
  }
}
