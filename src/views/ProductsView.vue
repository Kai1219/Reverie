<template>
  <main class="">
    <section class="section-top mb-5">
      <div class="bg-top"></div>
    </section>
    <section class="container p-5">
      <div class="row gx-5">
        <div class="col-sm-4 list-group">
          <a
            href="#"
            class="list-group-item list-group-item-action active"
            aria-current="true"
          >
            全部商品
          </a>
          <a href="#" class="list-group-item list-group-item-action">冰淇淋</a>
          <a href="#" class="list-group-item list-group-item-action">冰棒</a>
          <a href="#" class="list-group-item list-group-item-action">蛋糕</a>
        </div>
        <div class="products-items col-sm-8">
          <div class="products">
            <div class="row row-cols-1 row-cols-lg-3 g-lg-5">
              <div class="col align-items-center mb-5" v-for="product in products" :key="product.id">
                <div class="card-product" style="">
                  <div class="pic ratio ratio-1x1">
                    <img
                      :src="product.imageUrl"
                      alt=""
                    />
                  </div>
                  <div class="card-body">
                    <h5 class="card-title text-center mb-3">{{product.title}}</h5>
                  </div>
                  <div class="price">
                    <p class="text-center">
                      NT${{product.price}}&nbsp;
                      </p>
                       <span class="text-decoration-line-through fw-light">NT${{product.origin_price}}</span>
                    <button href="#" class="btn btn-primary">加入購物車</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss">
main {
}
.bg-top {
  height: 40vh;
  background-image: url('https://images.unsplash.com/photo-1471478108131-9b2335c21611?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
@media screen and (min-width: 576px) {
}
</style>

<script>
export default {
  name: 'ProductsView',
  data () {
    return {
      products: [],
      pagination: {}
    }
  },
  methods: {
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?page=${page}`
      this.$http(api)
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
          console.log(this.products)
        })
        .catch((error) => {
          alert(error.data.message)
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
