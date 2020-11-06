import Vue from 'vue'
import Component from 'vue-class-component'
import ListItem from 'src/models/list-item'
import { mapGetters } from 'vuex'
import { fullName } from 'src/models/user'

@Component({
  computed: {
    ...mapGetters([
      'user'
    ])
  }
})
export default class MainLayout extends Vue {
  drawerRight = false
  drawerLeft = false
  menuItems: ListItem[] = [
    // {
    //   icon: 'fas fa-exclamation',
    //   text: 'Important',
    //   url: '/important',
    //   color: 'warning'
    // },
    {
      icon: 'contact_page',
      text: 'Mon Profil Conserto',
      to: '/profile'
    },
    {
      icon: 'person_search',
      text: 'Trouver un Consertien',
      to: '/find-user'
    },
    {
      icon: 'work',
      text: 'Trouver une mission',
      to: '/find-mission'
    },
    {
      icon: 'chat',
      text: 'Contacter mon manager',
      to: '/contact-manager'
    },
    {
      icon: 'far fa-newspaper',
      text: 'Conserto News',
      to: '/news'
    }
  ]

  fullName () {
    return fullName(this.$store.getters.user)
  }

  breadCrumbs (): ListItem[] {
    const pathArray = this.$route.path.split('/')
    return pathArray.reduce((breadcrumbArray: ListItem[], path, idx) => {
      breadcrumbArray.push({
        to: this.$route.matched[idx].path === '' ? '/' : this.$route.matched[idx].path,
        text: this.$route.matched[idx].meta.linkText || path,
        icon: this.$route.matched[idx].meta.linkIcon || ''
      })
      return breadcrumbArray
    }, []).filter(x => x.text)
  }

  logout () {
    this.$store.dispatch('logout').then(() => {
      this.$router.push('login')
    })
  }
}
