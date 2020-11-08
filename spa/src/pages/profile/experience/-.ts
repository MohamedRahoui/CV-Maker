import Component from 'vue-class-component'
import Vue from 'vue'
import { mapGetters } from 'vuex'

@Component({
  computed: {
    ...mapGetters([
      'experiences'
    ])
  }
})
export default class ExperienceComponent extends Vue {
}
