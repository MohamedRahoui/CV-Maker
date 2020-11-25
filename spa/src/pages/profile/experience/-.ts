import Component from 'vue-class-component'
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Experience from '@models/experience'
import { Notify } from 'quasar'

@Component({
  computed: {
    ...mapGetters([
      'experiences',
      'fetchedExperiences'
    ])
  }
})
export default class ExperienceComponent extends Vue {
  isEditingExperience = false
  editionLoading = false
  expEdition: Experience | null = null
  envCurrent = ''
  currentTask = ''

  editExperience (experience: Experience) {
    this.expEdition = Object.assign({}, experience)
    this.isEditingExperience = true
  }

  updateExperience () {
    this.editionLoading = true
    this.$store.dispatch('updateExperience', this.expEdition)
      .then(experience => {
        Notify.create({
          position: 'bottom-right',
          type: 'positive',
          message: `L'expérience "${experience.title}" à bien été modifiée`
        })
        this.editionLoading = false
        this.isEditingExperience = false
        this.expEdition = null
      }, () => {
        this.editionLoading = false
      })
  }

  getEnvList (experience: Experience): string[] {
    if (!experience.environment) return []
    const env = JSON.parse(experience.environment.replace(/'/g, '"'))
    return env.env ? env.env : []
  }

  removeEnvItem (item: string) {
    if (!this.expEdition?.environment) return
    const env = JSON.parse(this.expEdition?.environment.replace(/'/g, '"'))
    if (this.expEdition && env?.env?.length) {
      env.env = env.env.filter((x: string) => x !== item)
      this.expEdition.environment = JSON.stringify(env)
    }
  }

  removeTaskItem (item: string) {
    if (!this.expEdition?.tasks) return
    const tasks = JSON.parse(this.expEdition?.tasks.replace(/'/g, '"'))
    if (this.expEdition && tasks?.tasks?.length) {
      tasks.tasks = tasks.tasks.filter((x: string) => x !== item)
      this.expEdition.tasks = JSON.stringify(tasks)
    }
  }

  addEnvItem () {
    if (!this.envCurrent) return
    let env
    if (this.expEdition?.environment) {
      env = JSON.parse(this.expEdition?.environment.replace(/'/g, '"'))
    } else {
      env = {
        env: []
      }
    }
    if (this.expEdition) {
      env.env.push(this.envCurrent)
      this.expEdition.environment = JSON.stringify(env)
      this.envCurrent = ''
    }
  }

  addTaskItem () {
    if (!this.currentTask) return
    let tasks
    if (this.expEdition?.tasks) {
      tasks = JSON.parse(this.expEdition?.tasks.replace(/'/g, '"'))
    } else {
      tasks = {
        tasks: []
      }
    }
    if (this.expEdition) {
      tasks.tasks.push(this.currentTask)
      this.expEdition.tasks = JSON.stringify(tasks)
      this.currentTask = ''
    }
  }
}
