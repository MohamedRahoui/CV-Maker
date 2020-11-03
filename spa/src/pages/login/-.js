export default {
  data() {
    return {
      username: '',
      password: '',
      isPwd: true,
      loading: false,
    }
  },
  created() {
  },
  methods: {
    login() {
      this.loading = true;
      this.$axios.post('auth', {
        username: this.username,
        password: this.password
      }).then(res => {
        this.loading = false;
        this.$store.dispatch('login', res.data).then(() => {
          this.$router.push('/');
        });
      }, err => {
        this.loading = false;
        this.$axios.errorCallback();
      })
    }
  }
}
