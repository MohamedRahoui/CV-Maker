import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class login extends Vue {
  username = '';
  password = '';
  isPwd = true;
  loading = false;

  login () {
    this.loading = true
    this.$axios.post('auth', {
      username: this.username,
      password: this.password
    }).then((res) => {
      this.loading = false
      this.$store.dispatch('login', res.data).then(() => {
        this.$router.push('/')
      })
    }, () => {
      this.loading = false
      this.$errors.login()
    })
  }
}
