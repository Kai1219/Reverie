<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm" style="z-index: 10"
  >
    <div class="container justify-content-end">
      <div class="sr-only">
        <h1>Reverie</h1>
      </div>
      <router-link class="navbar-brand me-auto" :to="`/`"
        ><img src="@/assets/img/r-logo.png" alt="Reverie" class="logo-img"
      /></router-link>

      <div class="nav-item order-lg-2">
        <router-link to="/cart" class="nav-link position-relative"
          ><i class="bi bi-cart3"></i>
          <span
            class="position-absolute translate-middle badge rounded-pill bg-primary"
            >{{ cartData.carts.length }}
          </span>
        </router-link>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse order-lg-1"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              to="/products"
              class="nav-link active"
              aria-current="page"
              >商品一覽</router-link
            >
          </li>
          <li class="nav-item d-none">
            <router-link to="/about" class="nav-link">關於我們</router-link>
          </li>
          <li class="nav-item d-none">
            <router-link to="/service" class="nav-link">常見問題</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

body {
  font-size: 16px;
}

.logo-img {
  width: 10rem;
}

.nav-item .bi-cart3 {
  font-size: 2rem;
}

.navbar-collapse {
  flex-grow: 0;
}

.badge {
  top: 20px;
}
</style>

<script>
import emitter from '@/libs/emitter'
export default {
  name: 'FrontNav',
  data () {
    return {
      cartData: {
        carts: []
      }
    }
  },
  methods: {
    getCart () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http(api).then((res) => {
        this.cartData = res.data.data
      })
    }
  },
  mounted () {
    this.getCart()
    emitter.on('get-cart',
      () => {
        this.getCart()
      })
  }
}
</script>
