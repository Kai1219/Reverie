<template>
  <nav
    class="navbar navbar-expand navbar-light bg-light shadow-sm sticky-top"
    style="z-index: 10"
  >
    <div class="container justify-content-end">
      <div class="sr-only">
        <h1>Reverie</h1>
      </div>
      <router-link class="navbar-brand me-auto" :to="`/`">
        <picture>
          <source media="(min-width: 401px)" srcset="@/assets/img/r-logo.png" />
          <source
            media="(max-width: 400px)"
            srcset="@/assets/img/logo-sm.png"
          />
          <img src="@/assets/img/r-logo.png" alt="Reverie" class="logo-img" />
        </picture>
      </router-link>

      <div class="nav-item order-lg-2">
        <router-link to="/products" class="nav-link position-relative"
          ><i class="bi bi-shop"></i>
        </router-link>
      </div>
      <div class="nav-item order-lg-2">
        <router-link to="/favorite" class="nav-link position-relative"
          ><i class="bi bi-suit-heart"></i>
          <span
            class="position-absolute translate-middle badge rounded-pill bg-primary"
            >{{ favoriteItems.length }}
          </span>
        </router-link>
      </div>
      <div class="nav-item order-lg-2">
        <router-link to="/cart" class="nav-link position-relative"
          ><i class="bi bi-cart3"></i>
          <span
            class="position-absolute translate-middle badge rounded-pill bg-primary"
            >{{ cartData.carts.length }}
          </span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import emitter from '@/libs/emitter'
export default {
  name: 'FrontNav',
  data () {
    return {
      cartData: {
        carts: []
      },
      favoriteItems: JSON.parse(localStorage.getItem('favorite')) || []
    }
  },

  methods: {
    getCart () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http(api).then((res) => {
        this.cartData = res.data.data
      })
    },
    getFavorites (favoriteItems) {
      this.favoriteItems = favoriteItems
    }
  },
  mounted () {
    this.getCart()
    emitter.on('get-cart', () => {
      this.getCart()
    })
    emitter.on('get-favorites', (favoriteItems) => {
      this.getFavorites(favoriteItems)
    })
  }
}
</script>

<style lang="scss">
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.nav-item .bi {
  font-size: 2rem;
}

.navbar-collapse {
  flex-grow: 0;
}

.badge {
  top: 20px;
}
</style>
