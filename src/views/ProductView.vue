<template>
  <main>
    <section class="section-top mb-5">
      <div class="bg-top banner-product pic">
        <div class="text-center w-100 h-100 mask z-index-3 position-relative">
          <div class="position-absolute top-50 start-50 translate-middle">
            <h2>產品細節</h2>
            <p>Product Details</p>
          </div>
        </div>
      </div>
    </section>
    <section class="container mb-6">
      <div class="row my-5">
        <div class="products-items col">
          <div class="row md-5">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link :to="`/`">首頁</router-link>
                </li>
                <li class="breadcrumb-item">
                  <router-link to="/products">商品一覽</router-link>
                </li>
                <li class="breadcrumb-item active fw-bold" aria-current="page">
                  {{ product.category }}
                </li>
              </ol>
            </nav>
            <div class="col col-md-6 mb-5">
              <ProductSwiper :swiperProduct="product"></ProductSwiper>
            </div>
            <div class="col col-md-6 px-lg-5 product-content mt-5">
              <h2>{{ product.title }}</h2>
              <span class="badge bg-secondary rounded-pill">{{
                product.category
              }}</span>
              <hr />
              <p>{{ product.content }}</p>
              <p>{{ product.description }}</p>
              <div class="price my-5">
                <div v-if="product.origin_price === product.price">
                  <span class="h5">NT${{ product.price }}</span>
                </div>
                <div v-else>
                  <span class="h5 text-danger"
                    >NT${{ product.price }}&nbsp;</span
                  >
                  <span class="text-decoration-line-through fw-light"
                    >NT${{ product.origin_price }}</span
                  >
                </div>
                <div class="input-group my-3">
                  <select class="form-select" v-model="qty">
                    <option
                      v-for="num in 10"
                      :value="num"
                      :key="`${num}_${product.id}`"
                    >
                      {{ num }}
                    </option>
                  </select>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="addToCart(product.id)"
                    :disabled="isLoadingItem === product.id"
                  >
                    <div
                      class="mx-auto d-flex align-items-center justify-content-center text-white"
                      v-if="isLoadingItem === product.id"
                    >
                      <span
                        class="spinner-border spinner-border-sm me-2 d-none d-sm-block"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span>加入中...</span>
                    </div>
                    <span v-else>加入購物車</span>
                  </button>
                </div>
                <button
                  type="button"
                  class="btn text-dark my-3 fs-5"
                  @click="toggleFavorite(product.id)"
                >
                  <i
                    class="bi bi-heart-fill text-info"
                    v-if="favoriteItems.includes(product.id)"
                  ></i>
                  <i class="bi bi-heart" v-else></i>
                  我的最愛
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="my-5">
        <ul class="nav nav-tabs flex-nowrap" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              配送方式
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              注意事項
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#contact"
              type="button"
              role="tab"
              aria-controls="contact"
              aria-selected="false"
            >
              退換貨須知
            </button>
          </li>
        </ul>
        <div class="tab-content mt-3" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <ul class="tab-content-ul">
              <li>配送僅限台灣本島。</li>
              <li>
                確認訂單後約七個工作天(不含例假日)送達，訂單成立後會有專人致電訂購人確認。
              </li>
              <li>單筆訂單滿1000元即可享免運費</li>
            </ul>
          </div>
          <div
            class="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <ul class="tab-content-ul">
              <li>盒內放有乾冰，請小心處理，否則可能引起危險。</li>
              <li>切勿用手接觸乾冰，否則有可能導致皮膚凍傷</li>
              <li>切勿吞嚥乾冰或把乾冰放入食物或飲品中</li>
            </ul>
          </div>
          <div
            class="tab-pane fade"
            id="contact"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            <ul class="tab-content-ul">
              <li>訂購商品後，在尚未出貨之前，您仍可以申請取消訂單</li>
              <li>本商店商品無7天鑑賞期，食品貨物提領後恕不提供退換貨服務</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <div class="recommend my-5">
      <div class="products container text-center">
        <h2 class="mb-5 mb-md-3 fw-bold">為您推薦</h2>
        <ShopSwiper
          :swiperProducts="categoryProducts"
          @add-cart="addToCart"
        ></ShopSwiper>
      </div>
    </div>
    <ServiceList />
    <SuccessToast ref="SuccessToast" :message="toastMessage"></SuccessToast>
    <ErrorToast ref="ErrorToast" :message="toastMessage"></ErrorToast>
    <Loading ref="Loading"></Loading>
  </main>
</template>

<script>
import ProductSwiper from '@/components/Swiper/ProductSwiper.vue'
import emitter from '@/libs/emitter'
import Loading from '@/components/LoadingView.vue'
import SuccessToast from '@/components/SuccessToast.vue'
import ErrorToast from '@/components/ErrorToast.vue'
import ShopSwiper from '@/components/Swiper/ShopSwiper.vue'
import ServiceList from '@/components/ServiceList.vue'
export default {
  name: 'ProductView',
  data () {
    return {
      product: {
        imageUrl: ''
      },
      qty: 1,
      favoriteItems: JSON.parse(localStorage.getItem('favorite')) || [],
      toastMessage: '',
      categoryProducts: [],
      isLoadingItem: ''
    }
  },
  components: {
    ProductSwiper,
    Loading,
    SuccessToast,
    ErrorToast,
    ShopSwiper,
    ServiceList
  },
  methods: {
    getProduct () {
      const { id } = this.$route.params
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`
      this.$refs.Loading.ToggleLoading('on')
      this.$http(api)
        .then((res) => {
          this.product = res.data.product
          this.getCategory(this.product.category)
        })
        .catch(() => {
          this.toastMessage = '發生錯誤，請重新整理'
          this.$refs.ErrorToast.openToasts()
        })
      this.$refs.Loading.ToggleLoading('off')
    },
    addToCart (id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      const data = {
        product_id: this.product.id,
        qty: this.qty
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
          alert('請再加入購物車一次')
        })
      setTimeout(() => {
        this.isLoadingItem = ''
      }, 1000)
    },
    toggleFavorite (id) {
      const favIndex = this.favoriteItems.findIndex((item) => item === id)
      if (favIndex === -1) {
        this.favoriteItems.push(id)
        emitter.emit('get-favorites', this.favoriteItems)
      } else {
        this.favoriteItems.splice(favIndex, 1)
        emitter.emit('get-favorites', this.favoriteItems)
      }
    },
    getCategory (category) {
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products`
      if (category) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?category=${category}`
      }
      this.$http(api)
        .then((res) => {
          this.categoryProducts = res.data.products
          const { id } = this.$route.params
          const categoryIndex = this.categoryProducts.findIndex(
            (item) => item.id === id
          )
          this.categoryProducts.splice(categoryIndex, 1)
        })
        .catch(() => {
          this.toastMessage = '發生錯誤，請重新選擇'
          this.$refs.ErrorToast.openToasts()
        })
    }
  },
  watch: {
    favoriteItems: {
      handler () {
        localStorage.setItem('favorite', JSON.stringify(this.favoriteItems))
      },
      deep: true
    },
    $route (to) {
      if (to.name === 'product') {
        this.getProduct()
      }
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>

<style lang="scss">
.breadcrumb a {
  text-decoration: none;
}

.tab-content-ul li {
  margin-bottom: 1rem;
}

.banner-product {
  background-image: url('@/assets/img/banner/banner-product.png');
}
</style>
