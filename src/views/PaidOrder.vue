<template>
  <section class="section-top mb-5">
    <div class="bg-top banner-order pic">
      <div class="text-center w-100 h-100 mask z-index-3 position-relative">
        <div class="position-absolute top-50 start-50 translate-middle">
          <h2>結帳流程</h2>
          <p>Checkout</p>
        </div>
      </div>
    </div>
  </section>
  <main class="container mb-5">
    <section class="cart-progress my-5">
      <ol class="progress-list container row g-0">
        <li class="col-4">
          <span class="step mb-2 text-white">1</span> 購物車
        </li>
        <li class="col-4">
          <span class="step mb-2 text-white">2</span>填寫資料
        </li>
        <li class="col-4 active">
          <span class="step mb-2 text-white">3</span>訂單完成
        </li>
      </ol>
    </section>
    <section>
      <div class="thank-text pt-5 p-4 m-1 d-flex flex-column align-items-center">
        <h2 v-if="orderData.is_paid" class="text-success">付款完成!</h2>
        <h2 v-else>訂購完成!!</h2>
        <p>
          {{
            orderData.user.name
          }}先生/小姐，感謝您的購買，Reverie白日夢會繼續努力推出更美味的甜點!
        </p>
        <p>以下為您訂購資訊:</p>
      </div>
    </section>
    <section class="mt-5">
      <div class="container">
        <div class="row">
          <div class="col-md-6 mb-5">
            <div class="order bg-light bg-opacity-10">
              <table class="table caption-top">
                <caption class="fs-5 bg-primary mb-2 px-3 text-white">
                  訂購商品
                </caption>
                <thead class="d-none d-lg-block d-xl-lg-block border-0">
                  <tr class="d-flex px-5 row">
                    <th scope="col" class="col-12 col-md-6">商品資料</th>
                    <th scope="col" class="col-6 col-md-3">數量</th>
                    <th scope="col" class="col-6 col-md-3">小計</th>
                  </tr>
                </thead>
                <tbody class="border-0">
                  <tr
                    class="px-lg-5 row align-items-center text-center g-0"
                    v-for="item in orderData.products"
                    :key="item.id"
                  >
                    <th scope="row" class="col-5 col-md-3">
                      <div
                        class="pic ratio ratio-1x1"
                        :style="{
                          backgroundImage: `url(${item.product.imageUrl})`
                        }"
                      ></div>
                    </th>
                    <td class="col-7 col-md-3">
                      <p class="d-inline-block col my-auto text-center">
                        {{ item.product.title }}
                      </p>
                    </td>
                    <td class="col-6 col-md-2 order-md-3">
                      <p class="my-auto">
                        x{{ item.qty }}{{ item.product.unit }}
                      </p>
                    </td>
                    <td class="col-6 col-md-4 order-md-3">
                      <p class="my-auto">NT${{ item.total }}元</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="row">
                <div class="px-sm-5">
                  <p class="text-end fw-bold fs-4">
                    合計: NT${{ Math.round(orderData.total) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="order bg-light bg-opacity-10">
              <table class="table caption-top">
                <caption class="fs-5 bg-primary mb-2 px-3 text-white">
                  顧客資訊
                </caption>
                <tbody class="border-0">
                  <tr>
                    <th scope="row" class="col-6 col-lg-3 text-center">
                      訂購編號
                    </th>
                    <td class="col-6 col-lg-9">{{ orderData.id }}</td>
                  </tr>
                  <tr>
                    <th scope="row" class="col-6 col-lg-3 text-center">
                      訂購日期
                    </th>
                    <td class="col-6 col-lg-9">
                      {{ $filters.date(orderData.create_at) }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" class="col-6 col-lg-3 text-center">姓名</th>
                    <td class="col-6 col-lg-9">{{ orderData.user.name }}</td>
                  </tr>
                  <tr>
                    <th scope="row" class="col-6 col-lg-3 text-center">電話</th>
                    <td class="col-6 col-lg-9">{{ orderData.user.tel }}</td>
                  </tr>
                  <tr>
                    <th scope="row" class="col-6 col-lg-3 text-center">
                      Email
                    </th>
                    <td class="col-6 col-lg-9">{{ orderData.user.email }}</td>
                  </tr>
                  <tr>
                    <th scope="row" class="col-6 col-lg-3 text-center">地址</th>
                    <td class="col-6 col-lg-9">{{ orderData.user.address }}</td>
                  </tr>
                  <tr>
                    <th scope="row" class="col-6 col-lg-3 text-center">留言</th>
                    <td class="col-6 col-lg-9">{{ orderData.user.message }}</td>
                  </tr>
                  <tr>
                    <th scope="row" class="col-6 col-lg-3 text-center">
                      付款狀態
                    </th>
                    <td class="col-6 col-lg-9">
                      <span v-if="orderData.is_paid" class="text-success"
                        >已付款</span
                      >
                      <span v-else class="text-danger">尚未付款</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="d-flex justify-content-center p-5">
            <div v-if="orderData.is_paid">
              <router-link to="/" class="btn btn-primary">回到首頁</router-link>
            </div>
            <div v-else>
              <button type="button" class="btn btn-info" @click="goPaid()">
                確定付款
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <ErrorToast ref="ErrorToast" :message="toastMessage"></ErrorToast>
    <Loading ref="Loading"> </Loading>
    <PaidSuccessModal ref="successModal"></PaidSuccessModal>
  </main>
</template>

<script>
import emitter from '@/libs/emitter'
import PaidSuccessModal from '@/components/Modal/PaidSuccessModal.vue'
import ErrorToast from '@/components/ErrorToast.vue'
import Loading from '@/components/LoadingView.vue'
export default {
  name: 'SendOrder',
  data () {
    return {
      orderData: {
        create_at: '',
        id: '',
        is_paid: false,
        message: '',
        products: [],
        total: '',
        user: {
          address: '',
          email: '',
          name: '',
          tel: ''
        }
      },
      toastMessage: ''
    }
  },
  components: { PaidSuccessModal, Loading, ErrorToast },
  methods: {
    getOrder () {
      this.$refs.Loading.ToggleLoading('on')
      const { id } = this.$route.params
      if (id) {
        const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${id}`
        this.$http(api)
          .then((res) => {
            this.orderData = res.data.order
          })
          .catch(() => {
            this.toastMessage = '發生錯誤，請重新整理'
            this.$refs.ErrorToast.openToasts()
          })
      } else {
        this.toastMessage = '訂單不存在，帶您回到購物頁面'
        this.$refs.ErrorToast.openToasts()
        setTimeout(() => {
          this.$router.push('/products')
        }, 3000)
      }
      this.$refs.Loading.ToggleLoading('off')
    },
    goPaid () {
      this.$refs.Loading.ToggleLoading('on')
      if (this.orderData.id) {
        const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${this.orderData.id}`
        this.$http
          .post(api)
          .then(() => {
            this.$refs.Loading.ToggleLoading('off')
            this.getOrder()
            emitter.emit('get-cart')
            this.$refs.successModal.openModal()
            this.$router.push({
              name: 'paid',
              params: { id: `${this.orderData.id}` }
            })
          })
          .catch(() => {
            this.toastMessage = '請重新付款'
            this.$refs.ErrorToast.openToasts()
          })
      } else {
        this.toastMessage = '購物車為空，帶您回到購物頁面'
        this.$refs.ErrorToast.openToasts()
        setTimeout(() => {
          this.$router.push('/products')
        }, 3000)
      }
    }
  },
  mounted () {
    this.getOrder()
  }
}
</script>

<style lang="scss">
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
  background-color: #d17028;
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
  background-color: #d17028;
  z-index: -5;
}

.progress-list li.active ~ li::after,
.progress-list li.active ~ li:before {
  background-color: #d5d5d5;
}

/* table */
.table > :not(:first-child) {
  border-top: none;
  border-bottom: none;
}

thead,
tbody,
tfoot,
tr,
td,
th {
  border-top: none;
  border-bottom: none;
}

.order {
  border: 1px solid #313c3e;
}

.thank-text {
  border: 1px solid #313c3e;
}
</style>
