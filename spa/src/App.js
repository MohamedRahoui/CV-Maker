export default {
  name: 'App',
  data() {
    return {}
  },
  created() {
    this.$axios.defaults.headers.common['Authorization'] = this.$store.getters.token ? `Token ${this.$store.getters.token}` : '';
    this.$store.watch(
      state => {
        return state.auth.token
      },
      val => {
        this.$axios.defaults.headers.common['Authorization'] = val ? `Token ${val}` : '';
      }
    )
  }
}
