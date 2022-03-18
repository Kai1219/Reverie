<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link to="/admin" class="navbar-brand">後台</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/admin/adminproducts" class="nav-link"
              >產品列表</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/admin/order" class="nav-link"
              >訂單列表</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/admin/coupon" class="nav-link"
              >優惠券</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/" class="nav-link">回到前台</router-link>
          </li>
        </ul>
      </div>
      <a href="#" @click.prevent="signout">登出</a>
    </div>
  </nav>
  <router-view v-if="checkSuccess"></router-view>
</template>

<script>
export default {
  data () {
    return {
      checkSuccess: false
    }
  },
  methods: {
    checkAdmin () {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      if (token) {
        // Axios 預設值
        this.$http.defaults.headers.common.Authorization = `${token}`
        this.$http
          .post(`${process.env.VUE_APP_API}/api/user/check`)
          .then(() => {
            this.checkSuccess = true
          })
          .catch((error) => {
            alert(error.data.message)
            console.dir(error)
          })
      } else {
        alert('您尚未登入。')
        this.$router.push('/login')
      }
    },
    signout () {
      document.cookie = 'hexToken=;expires=;'
      alert('已登出')
      this.$router.push('/products')
    }
  },
  mounted () {
    this.checkAdmin()
  }
}
</script>
