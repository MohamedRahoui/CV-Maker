import Component from 'vue-class-component'
import Vue from 'vue'
import { mapGetters } from 'vuex'
import User, { fullName } from 'src/models/user'
import { Notify } from 'quasar'
import fileDownload from 'js-file-download'

@Component({
  computed: {
    ...mapGetters([
      'user'
    ])
  }
})
export default class UserInfo extends Vue {
  isEditingInfo = false
  editionLoading = false
  cvLoading = false
  userForm: User | null = null
  user!: any

  editInfo () {
    this.userForm = Object.assign({}, this.user)
    this.isEditingInfo = true
  }

  updateInfo () {
    this.editionLoading = true
    this.$store.dispatch('updateUser', this.userForm)
      .then(() => {
        Notify.create({
          position: 'bottom-right',
          type: 'positive',
          message: 'Votre profil à bien été modifié'
        })
        this.editionLoading = false
        this.isEditingInfo = false
        this.userForm = {}
      }, () => {
        this.editionLoading = false
      })
  }

  fullName (): string {
    return fullName(this.$store.getters.user)
  }

  downloadCv () {
    this.cvLoading = true
    this.$axios.get('profile/generate_cv', {
      responseType: 'blob'
    })
      .then(res => {
        this.cvLoading = false
        fileDownload(res.data, 'mon_cv.docx')
      })
  }
}
