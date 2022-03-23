<template>
  <main class="container">
    <section class="cart-progress my-5">
      <ol class="progress-list container row g-0">
        <li class="col-4">
          <span class="step mb-2 text-white">1</span> 購物車
        </li>
        <li class="col-4">
          <span class="step mb-2 text-white">2</span>填寫資料
        </li>
        <li class="col-4 active">
          <span class="step mb-2 text-white">3</span>訂單確認
        </li>
      </ol>
    </section>
    <section class="">
      <div class="thank-text p-5 d-flex flex-column align-items-center">
        <h2>訂購完成!!</h2>
        <p>
          {{
            orderData.user.name
          }}先生/小姐，感謝您的購買，Reverie白日夢會繼續努力推出更美味的甜點!
        </p>
        <p>以下為您訂購資訊</p>

        <span v-if="orderData.is_paid"
          ><router-link to="/" class="btn btn-primary"
            >回到首頁</router-link
          ></span
        >
        <span v-else
          ><button class="btn btn-primary" @click="goPaid">
            確定付款
          </button></span
        >
      </div>
    </section>
    <section class="mt-5">
      <div class="container px-4">
        <div class="row gx-5">
          <div class="col">
            <div class="order bg-light">
              <table class="table caption-top">
                <caption class="fs-5 bg-primary mb-2 px-3 text-white">
                  訂購商品
                </caption>
                <thead class="d-none d-lg-block d-xl-lg-block">
                  <tr class="d-flex px-5 row">
                    <th scope="col" class="col-12 col-lg-8">商品資料</th>
                    <th scope="col" class="col-6 col-lg-2">數量</th>
                    <th scope="col" class="col-6 col-lg-2">小計</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="d-flex px-5 row"
                    v-for="item in orderData.products"
                    :key="item.id"
                  >
                    <th scope="row" class="col-12 col-lg-8 row">
                      <img
                        :src="item.product.imageUrl"
                        alt=""
                        class="w-50 col"
                      />
                      <p class="d-inline-block col my-auto text-center">
                        {{ item.product.title }}
                      </p>
                    </th>
                    <td class="col-6 col-lg-2 row">
                      <p>{{ item.qty }}{{ item.product.unit }}</p>
                    </td>
                    <td class="col-6 col-lg-2 row">
                      <p>NT${{ item.total }}元</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col">
            <div class="order bg-light">
              <table class="table caption-top">
                <caption class="fs-5 bg-primary mb-2 px-3 text-white">
                  顧客資訊
                </caption>
                <tbody>
                  <tr class="d-flex px-5">
                    <th scope="row" class="col-6 col-lg-3 text-center">
                      訂購日期
                    </th>
                    <td class="col-6 col-lg-9">{{ orderData.create_at }}</td>
                  </tr>
                  <tr class="d-flex px-5">
                    <th scope="row" class="col-6 col-lg-3 text-center">姓名</th>
                    <td class="col-6 col-lg-9">{{ orderData.user.name }}</td>
                  </tr>
                  <tr class="d-flex px-5">
                    <th scope="row" class="col-6 col-lg-3 text-center">電話</th>
                    <td class="col-6 col-lg-9">{{ orderData.user.tel }}</td>
                  </tr>
                  <tr class="d-flex px-5">
                    <th scope="row" class="col-6 col-lg-3 text-center">
                      Email
                    </th>
                    <td class="col-6 col-lg-9">{{ orderData.user.email }}</td>
                  </tr>
                  <tr class="d-flex px-5">
                    <th scope="row" class="col-6 col-lg-3 text-center">地址</th>
                    <td class="col-6 col-lg-9">{{ orderData.user.address }}</td>
                  </tr>
                  <tr class="d-flex px-5">
                    <th scope="row" class="col-6 col-lg-3 text-center">留言</th>
                    <td class="col-6 col-lg-9">{{ orderData.message }}</td>
                  </tr>
                  <tr class="d-flex px-5">
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
        </div>
      </div>
    </section>
  </main>
</template>

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

/* table */
.table > :not(:first-child) {
  border-top: none;
}

.order {
  border: 1px solid #839ea9;
}

.thank-text {
  background-color: #aac1ca55;
  box-shadow: 0 0 1rem #bababa;
}
</style>

<script>
import emitter from '@/libs/emitter'
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
      }
    }
  },
  methods: {
    getOrder () {
      const { Id } = this.$route.params
      console.log('id', this.orderData.id)
      if (Id) {
        const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${Id}`
        this.$http(api)
          .then((res) => {
            this.orderData = res.data.order
            console.log('orderData', this.orderData)
          })
          .catch(() => {
            // alert(error.data.message)
          })
      }
    },
    goPaid () {
      if (this.orderData.id) {
        const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${this.orderData.id}`
        this.$http
          .post(api)
          .then((res) => {
            console.log('res', res.data.message)
            console.log('this.orderData', this.orderData)
            this.getOrder()
            emitter.emit('get-cart')
            this.$router.push({
              name: 'paid',
              params: { Id: `${this.orderData.id}` }
            })
          })
          .catch((error) => {
            console.log('error', error)
            alert('請重新付款')
          })
      } else {
        alert('請選購商品')
      }
    }
  },
  mounted () {
    this.getOrder()
    console.log('id', this.orderData.id)
  }
}
</script>
