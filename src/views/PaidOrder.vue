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
      <div class="thank-text p-5">
        <h2>訂購完成!!</h2>
        <p>
          {{}}先生/小姐，感謝您的購買，Reverie白日夢會繼續努力推出更美味的甜點!
        </p>
        <p>以下為您訂購資訊:</p>
      </div>
      <div class="row">
        <div class="cart col"></div>
        <div class="user col"></div>
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
.thank-text {
  background-color: #fff;
  box-shadow: 0 0 1rem #bababa;
  border: 10px solid #aac1ca;
}
</style>

<script>
export default {
  name: 'SendOrder',
  data () {
    return {
      cartData: {},
      orderData: {},
      orderform: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      orderId: ''
    }
  },
  methods: {
    getCart () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http(api)
        .then((res) => {
          this.cartData = res.data.data
          console.log(this.cartData)
        })
        .catch((error) => {
          alert(error.data.message)
        })
    },
    getOrder () {
      const { id } = this.$route.params
      /* const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${orderId}`
      this.$http(api)
        .then((res) => {
          console.log(orderId)
          this.cartData = res.data.order.products
          this.orderData = res.data.order
          console.log(this.orderData)
          console.log(this.cartData)
        })
        .catch((error) => {
          alert(error.data.message)
        }) */
      console.log(id)
    }
  },
  mounted () {
    this.getOrder()
  }
}
</script>
