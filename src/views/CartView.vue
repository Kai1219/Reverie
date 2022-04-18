<template>
  <section class="section-top mb-5">
    <div class="bg-top banner-cart pic"></div>
  </section>
  <main class="container">
    <section class="cart-progress my-5">
      <ol class="progress-list container row g-0">
        <li class="col-4 active">
          <span class="step mb-2 text-white">1</span> 購物車
        </li>
        <li class="col-4">
          <span class="step mb-2 text-white">2</span>填寫資料
        </li>
        <li class="col-4">
          <span class="step mb-2 text-white">3</span>訂單完成
        </li>
      </ol>
    </section>
    <div class="bg-primary text-white p-2">
      <h3 class="m-0 text-center">購物車</h3>
    </div>
    <section
      class="cart px-2 pb-2 px-sm-5 pt-sm-5 pb-sm-2"
      v-if="cartData.carts.length > 0"
    >
      <table class="table align-middle">
        <div class="thead row">
          <div class="col-9 col-md-4">商品資料</div>
          <div class="col-12 col-md-2">單件價格</div>
          <div class="col-6 col-md-3">數量</div>
          <div class="col-6 col-md-3">小計</div>
          <hr />
        </div>
        <div
          class="row p-3 align-items-center position-relative"
          v-for="item in cartData.carts"
          :key="item.id"
        >
          <div class="col-5 col-md-2">
            <div
              class="pic ratio ratio-1x1"
              :style="{ backgroundImage: `url(${item.product.imageUrl})` }"
            ></div>
          </div>
          <div class="col-7 col-md-2">
            <p class="d-inline-block col my-auto text-center">
              {{ item.product.title }}
            </p>
          </div>
          <div class="col-12 col-md-2 order-md-2 order-3">
            <div v-if="item.product.origin_price === item.product.price">
              <p class="h5 d-inline d-lg-block">NT${{ item.product.price }}</p>
            </div>
            <div v-else>
              <p class="h5 d-inline d-lg-block">
                NT${{ item.product.price }}&nbsp;
              </p>
              <small class="text-decoration-line-through fw-light"
                >NT${{ item.product.origin_price }}</small
              >
            </div>
          </div>
          <div class="col-8 col-md-3 order-md-3 order-4 z-index-3">
            <div class="input-group input-group-sm">
              <div class="input-group mb-3">
                <select
                  class="form-select"
                  v-model="item.qty"
                  @change="updateCartItem(item)"
                  :disabled="isLoadingItem === item.id"
                >
                  <option
                    v-for="num in 10"
                    :value="num"
                    :key="`${num}_${item.id}`"
                  >
                    {{ num }}
                  </option>
                </select>
                <span class="input-group-text" id="basic-addon2">{{
                  item.product.unit
                }}</span>
              </div>
            </div>
          </div>
          <div class="col-4 col-md-3 order-md-4 order-4 text-center">
            <div
              class="d-flex align-items-center"
              v-if="isLoadingItem === item.id"
            >
              <span
                class="spinner-border me-2 d-none d-sm-block"
                role="status"
                aria-hidden="true"
              ></span>
              <span>更新中...</span>
            </div>
            <p v-else>{{ item.total }}元</p>
          </div>
          <div class="text-end del-item">
            <button
              type="button"
              class="cancel"
              @click="delCartItem(item)"
              :disabled="isLoadingItem === item.id"
            >
              <i class="bi bi-x-square fs-5 text-danger"></i>
            </button>
          </div>
        </div>
      </table>
      <div class="my-3">
        <div class="d-flex flex-column align-items-end">
          <p>小計:NT${{ cartData.total }}</p>
          <form class="row g-3" v-if="!discountCoupon.code">
            <div class="col-auto">
              <label for="coupon" class="visually-hidden"
                >請輸入優惠券代碼</label
              >
              <input
                type="text"
                class="form-control"
                id="coupon"
                placeholder="請輸入優惠券代碼"
                v-model="code"
              />
            </div>
            <div class="col-auto">
              <button
                type="submit"
                class="btn btn-primary mb-3"
                @click="discount"
              >
                套用
              </button>
            </div>
          </form>
          <div class="text-success text-end" v-else>
            <p
              v-if="discountCoupon.code"
              class="d-inline bg-success text-white p-2"
            >
              已套用優惠券:{{ discountCoupon.code }}
            </p>
            <p class="mt-2">
              -{{ Math.round(cartData.total - cartData.final_total) }}
            </p>
          </div>
        </div>

        <div class="d-flex justify-content-between align-items-center mt-5">
          <button type="button" class="btn btn-delete-all" @click="delCartAll">
            清空購物車
          </button>
          <p class="fw-bold fs-4">
            合計:NT$
            <span v-if="discountCoupon">{{
              Math.round(cartData.final_total)
            }}</span>
            <span v-else>{{ cartData.total }}</span>
          </p>
        </div>
      </div>
    </section>
    <section class="cart px-2 p-sm-3" v-else>
      <div class="d-flex flex-column align-items-center p-3">
        <i class="bi bi-cart3"></i>
        <p>你的購物車是空的</p>
        <p>記得加入商品到你的購物車</p>
        <router-link to="/products" class="btn btn-primary"
          >繼續購物
        </router-link>
      </div>
    </section>
    <div
      class="d-flex justify-content-center my-5"
      v-if="cartData.carts.length > 0"
    >
      <button type="button" class="btn btn-primary fs-4" @click="goToSendOrder">
        下一步
      </button>
    </div>
  </main>
  <div class="section-service container">
    <div class="services px-3 py-5">
      <ul class="list-unstyled row row-cols-1 row-cols-md-2 row-cols-lg-4">
        <li class="col service">
          <i class="bi bi-bag"></i>
          <h4 class="mt-3 fw-bold">訂單成立</h4>
          <p>
            確認訂單後約七個工作天(不含例假日)送達，訂單成立後會有專人致電訂購人確認。
          </p>
        </li>
        <li class="col service">
          <i class="bi bi-exclamation-square"></i>
          <h4 class="mt-3 fw-bold">注意事項</h4>
          <p>盒內放有乾冰，請小心處理，否則可能引起危險。</p>
        </li>
        <li class="col service">
          <i class="bi bi-box2"></i>
          <h4 class="mt-3 fw-bold">取消訂單</h4>
          <p>訂購商品後，在尚未出貨之前，您仍可以申請取消訂單</p>
        </li>
        <li class="col service">
          <i class="bi bi-shop"></i>
          <h4 class="mt-3 fw-bold">食品鑑賞期</h4>
          <p>本商店商品無7天鑑賞期，食品貨物提領後恕不提供退換貨服務</p>
        </li>
      </ul>
    </div>
  </div>
  <SuccessToast ref="SuccessToast" :message="toastMessage"></SuccessToast>
  <ErrorToast ref="ErrorToast" :message="toastMessage"></ErrorToast>
  <Loading ref="Loading"> </Loading>
</template>

<script>
import emitter from '@/libs/emitter'
import Loading from '@/components/LoadingView.vue'
import SuccessToast from '@/components/SuccessToast.vue'
import ErrorToast from '@/components/ErrorToast.vue'
export default {
  name: 'CartView',
  data () {
    return {
      cartData: {
        carts: []
      },
      code: '',
      discountCoupon: {
        final_total: '',
        message: '',
        code: ''
      },
      isLoadingItem: '',
      toastMessage: ''
    }
  },
  components: { Loading, SuccessToast, ErrorToast },
  methods: {
    goToSendOrder () {
      if (this.cartData.carts.length <= 0) {
        alert('請加入商品')
      } else {
        this.$router.push('/sendorder')
      }
    },
    getCart () {
      this.$refs.Loading.ToggleLoading('on')
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http(api)
        .then((res) => {
          this.cartData = res.data.data
          if (this.cartData.final_total === this.cartData.total) {
            this.discountCoupon.code = ''
          } else {
            this.discountCoupon.code = this.cartData.carts[0].coupon.code
          }
        })
        .catch(() => {
          this.toastMessage = '發生錯誤，請重新整理'
          this.$refs.ErrorToast.openToasts()
        })
      this.$refs.Loading.ToggleLoading('off')
    },
    updateCartItem (item) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      const data = {
        product_id: item.id,
        qty: item.qty
      }
      this.isLoadingItem = item.id
      this.$http
        .put(api, { data })
        .then(() => {
          this.toastMessage = '購物車更新成功'
          this.$refs.SuccessToast.openToasts()
          this.getCart()
        })
        .catch(() => {
          this.toastMessage = '發生錯誤，請重新整理'
          this.$refs.ErrorToast.openToasts()
        })
      setTimeout(() => {
        this.isLoadingItem = ''
      }, 1000)
    },
    delCartItem (item) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.isLoadingItem = item.id
      this.$http
        .delete(api)
        .then(() => {
          this.getCart()
          emitter.emit('get-cart')
        })
        .catch((error) => {
          this.toastMessage = error.data.message
          this.$refs.ErrorToast.openToasts()
        })
      setTimeout(() => {
        this.isLoadingItem = ''
      }, 1000)
    },
    delCartAll () {
      this.$refs.Loading.ToggleLoading('on')
      if (this.cartData.carts.length <= 0) {
        alert('請加入商品')
      } else {
        const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`
        this.$http
          .delete(api)
          .then(() => {
            this.getCart()
            emitter.emit('get-cart')
          })
          .catch((error) => {
            this.toastMessage = error.data.message
            this.$refs.ErrorToast.openToasts()
          })
      }
      this.$refs.Loading.ToggleLoading('off')
    },
    discount () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`
      const data = {
        code: this.code
      }
      this.$http
        .post(api, { data })
        .then((res) => {
          this.discountCoupon.final_total = res.data.data.final_total
          this.discountCoupon.message = res.data.message
          this.getCart()
        })
        .catch(() => {
          this.toastMessage =
            '您的優惠券無效哦。請重新檢查代碼是否填寫有誤及英文字母大小寫是否符合。'
          this.$refs.ErrorToast.openToasts()
        })
    }
  },
  mounted () {
    this.getCart()
  }
}
</script>

<style lang="scss">
.banner-cart {
  background-image: url('@/assets/img/banner/banner-cart.png');
}
/*cart-progress*/
.progress-list li {
  display: flex;
  flex-direction: column;
  text-align: center;
  position: relative;
}

.progress-list li:after {
  content: '';
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: #839ea9;
  top: calc(0% - 4px);
  left: calc(50% - 15px);
  z-index: -1;
}

.progress-list li + li::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 3px;
  top: calc(25% - 2.5px);
  left: -50%;
  margin: auto;
  background-color: #839ea9;
  z-index: -5;
}

.progress-list li.active ~ li::after,
.progress-list li.active ~ li:before {
  background-color: #d5d5d5;
}
/*table*/
@media screen and (max-width: 768px) {
  .thead,
  thead {
    display: none;
  }
}

.cart {
  background-color: #fff;
  box-shadow: 0 0 1rem #eaeaea;
}

.cart .bi-cart3 {
  font-size: 5rem;
}

.cancel {
  background-color: transparent;
  border: none;
}

.table > :not(:first-child) {
  border-top: none;
  border-bottom: 1px solid #d5d5d5;
}

.btn-delete-all {
  background-color: #fff;
  border: 1px solid #eaeaea;
  color: #839ea9;
}

.cart .del-item {
  position: absolute;
  top: calc(50% - 33px);
  right: 0;
}

@media screen and (max-width: 768px) {
  .cart .del-item {
    top: 0;
  }
}

.cart .ratio {
  width: 100px;
}

/*section-service*/
.services {
  border-top: 1px solid #bababa;
  border-bottom: 1px solid #bababa;
}

.services .service:not(:first-child) {
  border-left: 1px solid #bababa;
}

@media screen and (max-width: 992px) {
  .services .service:not(:first-child) {
    border-left: none;
  }
}

.service i {
  font-size: 2.25rem;
}
</style>
