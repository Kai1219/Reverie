import Toast from 'bootstrap/js/dist/toast'

export default {
  methods: {
    openToasts () {
      this.toast.show()
    },
    hideToasts () {
      this.toast.hide()
    }
  },
  mounted () {
    this.toast = new Toast(this.$refs.toast)
  }
}
