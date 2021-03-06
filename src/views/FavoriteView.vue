<template>
  <section class="section-top mb-5">
    <div class="bg-top banner-favorite pic">
      <div class="text-center w-100 h-100 mask z-index-3 position-relative">
        <div class="position-absolute top-50 start-50 translate-middle">
          <h2>願望清單</h2>
          <p>My Whishlist</p>
        </div>
      </div>
    </div>
  </section>
  <main class="container mb-5">
    <section class="bg-primary text-white p-2">
      <h1 class="m-0">收藏清單</h1>
    </section>
    <section
      class="favorite px-2 pb-2 px-sm-5 pt-sm-5 pb-sm-2 border"
      v-if="products.length > 0"
    >
      <table class="table align-middle">
        <tr class="thead row px-lg-3 justify-content-center">
          <td class="col-4 text-start">商品資料</td>
          <td class="col-4 col-lg-2">價格</td>
          <td class="col-3">加入購物車</td>
          <td class="col-1">刪除</td>
        </tr>
        <hr />
        <tr
          class="row p-3 p-sm-1 align-items-center position-relative justify-content-center"
          v-for="item in products"
          :key="item.id"
        >
          <td class="col-5 col-md-2">
            <div
              class="pic ratio ratio-1x1"
              :style="{ backgroundImage: `url(${item.imageUrl})` }"
            ></div>
          </td>
          <td class="col-6 col-md-2">
            <p class="d-inline-block col my-auto text-center">
              {{ item.title }}
            </p>
          </td>
          <td class="col-6 col-md-4 col-lg-2 order-md-2 order-3">
            <div v-if="item.origin_price === item.price">
              <p class="h5 d-inline d-lg-block">NT${{ item.price }}</p>
            </div>
            <div v-else>
              <p class="h5 d-inline d-lg-block text-info fw-bold">
                NT${{ item.price }}&nbsp;
              </p>
              <small class="text-decoration-line-through fw-light"
                >NT${{ item.origin_price }}</small
              >
            </div>
          </td>
          <td class="col-6 col-md-3 order-md-3 order-4 z-index-3 px-lg-5">
            <button
              type="button"
              class="btn btn-info w-100"
              @click="addToCart(item.id)"
              :disabled="isLoadingItem === item.id"
            >
              <div
                class="mx-auto d-flex align-items-center justify-content-center text-white"
                v-if="isLoadingItem === item.id"
              >
                <span
                  class="spinner-border me-2 d-none d-sm-block"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span>更新中...</span>
              </div>
              <span v-else>加入購物車</span>
            </button>
          </td>
          <td class="col-12 col-md-1 order-md-4 order-4 text-center">
            <button
              type="button"
              class="cancel del-item"
              @click="openDelModal(item.id)"
              :disabled="isLoadingItem === item.id"
            >
              <i class="bi bi-trash-fill fs-5"></i>
            </button>
          </td>
        </tr>
      </table>
      <div class="d-flex justify-content-end p-3">
        <router-link to="/products" class="btn btn-primary"
          >繼續購物
        </router-link>
      </div>
    </section>
    <section class="favorite px-2 p-sm-3" v-else>
      <div class="d-flex flex-column align-items-center p-3">
        <i class="bi bi-emoji-frown"></i>
        <p>目前沒有收藏任何商品</p>
        <p>去商店逛逛吧!</p>
        <router-link to="/products" class="btn btn-primary"
          >繼續購物
        </router-link>
      </div>
    </section>
  </main>
  <ServiceList />
  <SuccessToast ref="SuccessToast" :message="toastMessage"></SuccessToast>
  <ErrorToast ref="ErrorToast" :message="toastMessage"></ErrorToast>
  <DelModal
    ref="DelModal"
    @del-item="delfavoriteItem"
    :title="delteTitle"
  ></DelModal>
  <Loading ref="Loading"> </Loading>
</template>

<script>
import emitter from '@/libs/emitter'
import Loading from '@/components/LoadingView.vue'
import SuccessToast from '@/components/SuccessToast.vue'
import ErrorToast from '@/components/ErrorToast.vue'
import ServiceList from '@/components/ServiceList.vue'
import DelModal from '@/components/Modal/DelModal.vue'
export default {
  name: 'FavoriteView',
  data () {
    return {
      favoriteItems: JSON.parse(localStorage.getItem('favorite')) || [],
      products: [],
      toastMessage: '',
      isLoadingItem: '',
      delteCartId: {},
      delteTitle: ''
    }
  },
  components: {
    Loading,
    SuccessToast,
    ErrorToast,
    ServiceList,
    DelModal
  },
  methods: {
    addToCart (id, qty = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      const data = {
        product_id: id,
        qty
      }
      this.isLoadingItem = id
      this.$http
        .post(api, { data })
        .then((res) => {
          this.toastMessage = res.data.message
          this.$refs.SuccessToast.openToasts()
          emitter.emit('get-cart')
        })
        .catch(() => {
          this.toastMessage = '發生錯誤，請重新加入購物車'
          this.$refs.ErrorToast.openToasts()
        })
      setTimeout(() => {
        this.isLoadingItem = ''
      }, 1500)
    },
    getProduct (id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`
      this.$refs.Loading.ToggleLoading('on')
      this.$http(api)
        .then((res) => {
          this.products.push(res.data.product)
        })
        .catch(() => {
          this.toastMessage = '發生錯誤，請重新整理'
          this.$refs.ErrorToast.openToasts()
        })
      this.$refs.Loading.ToggleLoading('off')
    },
    getFavorites () {
      this.products = []
      this.favoriteItems.forEach((item) => {
        this.getProduct(item)
      })
    },
    openDelModal (id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`
      this.$http(api)
        .then((res) => {
          this.delteCartId = res.data.product.id
          this.delteTitle = res.data.product.title
          const DelModal = this.$refs.DelModal
          DelModal.openModal()
        })
        .catch(() => {
          this.toastMessage = '發生錯誤，請重新再操作一次'
          this.$refs.ErrorToast.openToasts()
        })
    },
    delfavoriteItem () {
      this.isLoadingItem = this.delteCartId
      const favIndex = this.favoriteItems.findIndex(
        (item) => item === this.delteCartId
      )
      this.favoriteItems.splice(favIndex, 1)
      this.getFavorites()
      emitter.emit('get-favorites', this.favoriteItems)
      this.$refs.DelModal.hideModal()
      setTimeout(() => {
        this.isLoadingItem = ''
      }, 1500)
    }
  },
  watch: {
    favoriteItems: {
      handler () {
        localStorage.setItem('favorite', JSON.stringify(this.favoriteItems))
      },
      deep: true
    }
  },
  mounted () {
    this.getFavorites()
  }
}
</script>

<style lang="scss">
.banner-favorite {
  background-image: url('@/assets/img/banner/banner-favrite.png');
}

@media screen and (max-width: 768px) {
  .thead,
  thead {
    display: none;
  }
}

.cancel {
  background-color: transparent;
  border: none;
}

.table > :not(:first-child) {
  border-top: none;
  border-bottom: 1px solid #d5d5d5;
}

@media screen and (max-width: 768px) {
  .favorite .del-item {
    position: absolute;
    top: calc(50% - 45px);
    right: 0;
  }
}

.favorite .ratio {
  width: 100px;
}

.favorite .bi-emoji-frown {
  font-size: 5rem;
}

td .btn {
  background-color: #d17028;
}
</style>
