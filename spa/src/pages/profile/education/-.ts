import Component from 'vue-class-component'
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Education from '@models/education'
import { Notify } from 'quasar'

@Component({
  computed: {
    ...mapGetters([
      'educations',
      'fetchedEducation',
      'user'
    ])
  }
})
export default class EducationComponent extends Vue {
  user!: any
  isEditingEducation = false
  isAddingItem = false
  mode: 'create' | 'edit' | '' = ''
  editionLoading = false
  addingItemLoading = false
  educEdition: Education | null = null
  item = ''
  itemLabel = ''
  itemTitle = ''
  itemTitleLabel = ''
  current_item_type: 'technical_skill' | 'functional_skill' | 'focus_area' | '' = ''

  editEducation (education: Education) {
    this.educEdition = Object.assign({}, education)
    this.mode = 'edit'
    this.isEditingEducation = true
  }

  createEducation () {
    this.educEdition = {
      title: '',
      year: new Date().getFullYear()
    } as Education
    this.mode = 'create'
    this.isEditingEducation = true
  }

  updateEducation () {
    this.editionLoading = true
    this.$store.dispatch('updateEducation', this.educEdition)
      .then(education => {
        Notify.create({
          position: 'bottom-right',
          type: 'positive',
          message: `La formation "${education.title}" à bien été modifiée`
        })
        this.editionLoading = false
        this.isEditingEducation = false
        this.educEdition = null
      }, () => {
        this.editionLoading = false
      })
  }

  addEducation () {
    this.editionLoading = true
    this.$store.dispatch('createEducation', this.educEdition)
      .then(education => {
        Notify.create({
          position: 'bottom-right',
          type: 'positive',
          message: `La formation "${education.title}" à bien été crée`
        })
        this.editionLoading = false
        this.isEditingEducation = false
        this.educEdition = null
      }, () => {
        this.editionLoading = false
      })
  }

  removeEducation (id: Education['id']) {
    this.editionLoading = true
    this.$store.dispatch('deleteEducation', id)
      .then(() => {
        Notify.create({
          position: 'bottom-right',
          type: 'positive',
          message: 'La formation à bien été supprimée'
        })
        this.editionLoading = false
      }, () => {
        this.editionLoading = false
      })
  }

  removeItem (item, field, name, label, hasValue = false) {
    const data = {}
    data[field] = this.$tools.removeJsonItem(
      this.user[field], name, [], item, hasValue)
    this.$store.dispatch('patchProfile',
      {
        id: this.user.id,
        data
      }).then(() => {
      Notify.create({
        position: 'bottom-right',
        type: 'positive',
        message: `${label} à bien été supprimée`
      })
    })
  }

  addItem (label, type, titleLabel?) {
    this.isAddingItem = true
    this.itemLabel = label
    this.current_item_type = type
    this.itemTitleLabel = titleLabel
  }

  runAddItem (field, name, label) {
    this.addingItemLoading = true
    const data = {}
    const val = this.itemTitleLabel ? {
      value: this.item,
      title: this.itemTitle
    } : this.item
    data[field] = this.$tools.addJsonItem(
      this.user[field], name, [], val)
    this.$store.dispatch('patchProfile', {
      id: this.user.id,
      data
    }).then(() => {
      this.addingItemLoading = false
      this.isAddingItem = false
      this.item = ''
      this.itemLabel = ''
      this.itemTitle = ''
      this.itemTitleLabel = ''
      Notify.create({
        position: 'bottom-right',
        type: 'positive',
        message: `${label} à bien été ajoutée`
      })
    })
  }

  addItemParams () {
    if (this.current_item_type === 'focus_area') {
      return ['focus_areas', 'areas', 'Le domaine d\'intervention']
    } else if (this.current_item_type === 'functional_skill') {
      return ['functional_skills', 'skills', 'La compétence fonctionnelle']
    } else if (this.current_item_type === 'technical_skill') {
      return ['technical_skills', 'skills', 'La compétence technique']
    }
  }
}
