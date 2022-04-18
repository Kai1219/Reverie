<template>
  <section class="section-top mb-5">
    <div class="bg-top banner-order pic"></div>
  </section>
  <main class="container mb-5">
    <section class="cart-progress my-5">
      <ol class="progress-list container row g-0">
        <li class="col-4">
          <span class="step mb-2 text-white">1</span> 購物車
        </li>
        <li class="col-4 active">
          <span class="step mb-2 text-white">2</span>填寫資料
        </li>
        <li class="col-4">
          <span class="step mb-2 text-white">3</span>訂單完成
        </li>
      </ol>
    </section>
    <section class="row">
      <div class="col-12 col-md-6">
        <div class="bg-primary text-white">
          <h4 class="m-0 p-2">購物車({{ cartData.carts.length }}件)</h4>
        </div>
        <div class="cart px-2 p-sm-5 pb-sm-2">
          <table class="table align-middle">
            <div class="thead row">
              <div class="col-md-6">商品資料</div>
              <div class="col-md-3">數量</div>
              <div class="col-md-3">小計</div>
              <hr />
            </div>
            <div
              class="row p-3 align-items-center"
              v-for="item in cartData.carts"
              :key="item.id"
            >
              <div class="col-3">
                <div
                  class="pic ratio ratio-1x1"
                  :style="{
                    backgroundImage: `url(${item.product.imageUrl})`
                  }"
                ></div>
              </div>
              <div class="col-3">
                <p class="d-inline-block col my-auto text-center">
                  {{ item.product.title }}
                </p>
              </div>
              <div class="col-3">
                <p class="m-0">{{ item.qty }}{{ item.product.unit }}</p>
              </div>
              <div class="col-3 order-md-4 order-4">
                <p class="m-0">{{ item.total }}元</p>
              </div>
            </div>
          </table>
          <div class="my-3">
            <div class="d-flex flex-column align-items-end">
              <p>小計:NT${{ cartData.total }}</p>
              <div class="text-success text-end" v-if="discountCoupon.code">
                <p class="d-inline bg-success text-white p-2">
                  已套用優惠券:{{ discountCoupon.code }}
                </p>
                <p class="mt-2">
                  -{{ Math.round(cartData.total - cartData.final_total) }}
                </p>
              </div>
              <p class="fw-normal">
                合計:NT${{ Math.round(cartData.final_total) }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="bg-primary text-white">
          <h4 class="m-0 p-2">訂購資訊</h4>
        </div>
        <v-form
          class="form py-5 p-sm-5 pb-sm-2 justify-content-center"
          v-slot="{ errors }"
          @submit="submitorder"
        >
          <div class="mb-3">
            <label for="email" class="form-label"
              >Email<span class="text-danger"> *</span></label
            >
            <v-field
              type="email"
              class="form-control"
              name="email"
              id="email"
              placeholder="請輸入 Email"
              :class="{ 'is-invalid': errors['email'] }"
              rules="email|required"
              v-model="orderform.user.email"
            ></v-field>
            <ErrorMessage
              name="email"
              class="invalid-feedback"
            ></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="name" class="form-label"
              >收件人姓名<span class="text-danger"> *</span></label
            >
            <v-field
              type="text"
              class="form-control"
              name="姓名"
              id="name"
              placeholder="請輸入姓名"
              :class="{ 'is-invalid': errors['姓名'] }"
              rules="required"
              v-model="orderform.user.name"
            ></v-field>
            <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="tel" class="form-label"
              >收件人手機<span class="text-danger"> *</span></label
            >
            <v-field
              type="tel"
              class="form-control"
              name="手機"
              id="tel"
              placeholder="請輸入手機號碼:09XXXXXXXX"
              :class="{ 'is-invalid': errors['手機'] }"
              :rules="{ regex: /^09[0-9]{8}$/, required: true }"
              v-model="orderform.user.tel"
            ></v-field>
            <ErrorMessage name="手機" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="address" class="form-label"
              >收件人地址<span class="text-danger"> *</span></label
            >
            <v-field
              type="text"
              class="form-control"
              name="地址"
              id="address"
              placeholder="請輸入地址"
              :class="{ 'is-invalid': errors['地址'] }"
              rules="required"
              v-model="orderform.user.address"
            ></v-field>
            <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <v-field
              as="textarea"
              id="message"
              name="留言"
              class="form-control"
              cols="30"
              rows="10"
              v-model="orderform.user.message"
            >
            </v-field>
          </div>
          <div class="d-flex justify-content-center mt-5">
            <button type="submit" class="btn btn-primary mb-3">送出訂單</button>
          </div>
        </v-form>
      </div>
    </section>
    <ErrorToast ref="ErrorToast" :message="toastMessage"></ErrorToast>
    <Loading ref="Loading"> </Loading>
  </main>
</template>

<script>
import Loading from '@/components/LoadingView.vue'
import ErrorToast from '@/components/ErrorToast.vue'
export default {
  name: 'SendOrder',
  data () {
    return {
      cartData: {
        carts: []
      },
      discountCoupon: {
        code: ''
      },
      orderform: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      orderId: '',
      toastMessage: ''
    }
  },
  components: {
    Loading,
    ErrorToast
  },
  methods: {
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
          if (this.cartData.carts.length <= 0) {
            this.toastMessage = '購物車為空，帶您回到購物頁面'
            this.$refs.ErrorToast.openToasts()
            setTimeout(() => {
              this.$router.push('/products')
            }, 3000)
          }
        })
        .catch((error) => {
          alert(error.data.message)
        })
      this.$refs.Loading.ToggleLoading('off')
    },
    submitorder () {
      if (this.cartData.carts.length <= 0) {
        this.toastMessage = '購物車為空，帶您回到購物頁面'
        this.$refs.ErrorToast.openToasts()
        setTimeout(() => {
          this.$router.push('/products')
        }, 3000)
      } else {
        const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`
        const data = this.orderform
        this.$http
          .post(api, { data })
          .then((res) => {
            this.orderId = res.data.orderId
            this.$router.push({
              name: 'paid',
              params: { Id: `${this.orderId}` }
            })
            this.$refs.form.resetForm()
          })
          .catch(() => {
            this.toastMessage = '購物車為空，帶您回到購物頁面'
            this.$refs.ErrorToast.openToasts()
          })
      }
    }
  },
  mounted () {
    this.getCart()
  }
}
</script>

<style lang="scss">
.banner-order{
  background-image: url('@/assets/img/banner/banner-order.png');
}

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
}

.table > :not(:first-child) {
  border-top: none;
  border-bottom: 1px solid #d5d5d5;
}

.form {
  background-color: #fff;
}
</style>
