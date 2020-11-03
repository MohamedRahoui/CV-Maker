import {mapGetters} from 'vuex';

export default {
  data() {
    return {
      drawer: false,
      menuItems: [
        // {
        //   icon: 'fas fa-exclamation',
        //   text: 'Important',
        //   url: '/important',
        //   color: 'warning'
        // },
        {
          icon: 'far fa-address-card',
          text: 'Mon CV',
          url: '/profile'
        },
        {
          icon: 'fas fa-search-location',
          text: 'Trouver un Consertien',
          url: '/find-user'
        },
        {
          icon: 'fas fa-briefcase',
          text: 'Trouver une mission',
          url: '/find-mission'
        },
        {
          icon: 'far fa-comment-dots',
          text: 'Contacter mon manager',
          url: '/contact-manager'
        },
        {
          icon: 'far fa-newspaper',
          text: 'Conserto News',
          url: '/news'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'user',
    ]),
    breadCrumbs() {
      let pathArray = this.$route.path.split('/');
      return pathArray.reduce((breadcrumbArray, path, idx) => {
        breadcrumbArray.push({
          to: this.$route.matched[idx].path === '' ? '/' : this.$route.matched[idx].path,
          text: this.$route.matched[idx].meta.linkText || path,
          icon: this.$route.matched[idx].meta.linkIcon || '',
        });
        return breadcrumbArray;
      }, []).filter(x => x.text)
    }
  },
  created() {
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('login');
      });
    }
  }
}
