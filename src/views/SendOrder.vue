<template>
  <main class="container">
    <section class="cart-progress my-5">
      <ol class="progress-list container row g-0">
        <li class="col-4">
          <span class="step mb-2 text-white">1</span> 購物車
        </li>
        <li class="col-4 active">
          <span class="step mb-2 text-white">2</span>填寫資料
        </li>
        <li class="col-4">
          <span class="step mb-2 text-white">3</span>訂單確認
        </li>
      </ol>
    </section>
    <section class="my-5">
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button
              class="accordion-button collapsed text-center d-flex flex-column"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne"
            >
              <div class="">
                <p class="fw-bold fs-4 text-center">
                  合計:NT${{ cartData.final_total }}
                </p>
                <p>購物車({{ cartData.carts.length }}件)</p>
              </div>
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <div class="cart px-2 p-sm-5 pb-sm-2">
                <table class="table align-middle">
                  <div class="thead row">
                    <div class="col-12 col-md-6">商品資料</div>
                    <div class="col-12 col-md-2">單件價格</div>
                    <div class="col-6 col-md-2">數量</div>
                    <div class="col-6 col-md-2">小計</div>
                    <hr />
                  </div>
                  <div
                    class="row p-5 p-sm-3 align-items-center"
                    v-for="item in cartData.carts"
                    :key="item.id"
                  >
                    <div class="col-12 col-md-6">
                      <div class="row">
                        <img
                          :src="item.product.imageUrl"
                          alt=""
                          class="w-50 col"
                        />
                        <p class="d-inline-block col my-auto text-center">
                          {{ item.product.title }}
                        </p>
                      </div>
                    </div>
                    <div class="col-12 col-md-2 order-md-2 order-3">
                      <div
                        v-if="item.product.origin_price === item.product.price"
                      >
                        <p class="h5 d-inline d-lg-block">
                          NT${{ item.product.price }}
                        </p>
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
                    <div class="col-6 col-md-2 order-md-3 order-4">
                      <p>{{ item.qty }}{{ item.product.unit }}</p>
                    </div>
                    <div class="col-6 col-md-2 order-md-4 order-4">
                      <p>{{ item.total }}元</p>
                    </div>
                  </div>
                </table>
                <div class="my-3">
                  <div class="d-flex flex-column align-items-end">
                    <p class="fw-normal">合計:NT${{ cartData.final_total }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <OrderForm :cartData="cartData" @reset-cart="delCartAll"></OrderForm>
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

.table > :not(:first-child) {
  border-top: none;
  border-bottom: 1px solid #d5d5d5;
}

.btn-delete-all {
  background-color: #fff;
  border: 1px solid #eaeaea;
  color: #839ea9;
}

.accordion-item button {
  /*height: 500px;*/
}
</style>

<script>
import OrderForm from '@/components/OrderForm.vue'
export default {
  name: 'SendOrder',
  data () {
    return {
      cartData: {
        carts: []
      }
    }
  },
  components: {
    OrderForm
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
    delCartAll () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`
      this.$http
        .delete(api)
        .then(() => {
          this.getCart()
        })
        .catch((error) => {
          alert(error.data.message)
        })
    }
  },
  mounted () {
    this.getCart()
  }
}
</script>
