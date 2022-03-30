<template>
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
          <span class="step mb-2 text-white">3</span>訂單確認
        </li>
      </ol>
    </section>
    <section class="cart px-2 p-sm-3 pb-sm-2">
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
          <div class="col-8 col-md-3 order-md-3 order-4">
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
          <div class="col-4 col-md-3 order-md-4 order-4">
            <p>{{ item.total }}元</p>
          </div>
          <div class="position-absolute top-0 end-0 text-end">
            <button type="button" class="cancel" @click="delCartItem(item)">
              <i class="bi bi-x-square fs-5 text-danger"></i>
            </button>
          </div>
        </div>
      </table>
      <div class="my-3">
        <div class="d-flex flex-column align-items-end">
          <p class="">小計:NT${{ cartData.total }}</p>
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
            <button
              type="button"
              class="cancel d-inline"
              @click="delDiscount()"
            >
              <i class="bi bi-x-square fs-5 text-danger"></i>
            </button>
            <p v-if="discountCoupon.code" class="d-inline">
              已套用優惠券:{{ discountCoupon.code }}
            </p>
            <p>-{{ cartData.total - cartData.final_total }}</p>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center mt-5">
          <button type="button" class="btn btn-delete-all" @click="delCartAll">
            清空購物車
          </button>
          <p class="fw-bold fs-4">
            合計:NT$
            <span v-if="discountCoupon">{{ cartData.final_total }}</span>
            <span v-else>{{ cartData.total }}</span>
          </p>
        </div>
      </div>
    </section>
    <div class="d-flex justify-content-center mt-5">
      <button
        type="botton"
        class="btn btn-primary w-25 h-25 fs-4"
        @click="goToSendOrder"
      >
        前往結帳
      </button>
    </div>
  </main>
  <Loading ref="Loading"> </Loading>
</template>

<style lang="scss">
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
  .thead {
    display: none;
  }
}

.cart {
  background-color: #fff;
  box-shadow: 0 0 1rem #eaeaea;
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

.pic {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>

<script>
import emitter from '@/libs/emitter'
import Loading from '@/components/LoadingView.vue'
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
      isLoadingItem: ''
    }
  },
  components: { Loading },
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
        .catch((error) => {
          alert(error)
        })
      this.$refs.Loading.ToggleLoading('off')
    },
    updateCartItem (item) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      const data = {
        product_id: item.id,
        qty: item.qty
      }
      console.log(data)
      this.isLoadingItem = item.id
      this.$http
        .put(api, { data })
        .then(() => {
          this.getCart()
        })
        .catch((error) => {
          alert(error.data.message)
        })
      this.isLoadingItem = ''
      console.log(this.cartData)
    },
    delCartItem (item) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.$http
        .delete(api)
        .then(() => {
          this.getCart()
          emitter.emit('get-cart')
        })
        .catch((error) => {
          alert(error.data.message)
        })
    },
    delCartAll () {
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
            alert(error.data.message)
          })
      }
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
          alert(
            '您的優惠券無效。請重新檢查代碼是否填寫有誤及英文字母大小寫是否符合。'
          )
        })
    },
    delDiscount () {
      this.discountCoupon.code = ''
    }
  },
  mounted () {
    this.getCart()
  }
}
</script>
