<template>
  <div class="dash-title d-flex flex-column mt-3">
    <span class="text-secondary position-relative deco-line"
      >Products List</span
    >
    <h2 class="mb-3 fw-bold">產品列表</h2>
  </div>
  <section>
    <div class="container">
      <div class="text-end mt-4">
        <button
          type="button"
          class="btn btn-primary"
          @click="openProductModal('create')"
        >
          建立新的產品
        </button>
      </div>
      <table class="table mt-4">
        <thead>
          <tr>
            <th width="120">分類</th>
            <th>產品名稱</th>
            <th width="120">原價</th>
            <th width="120">售價</th>
            <th width="100">是否啟用</th>
            <th width="120">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.category }}</td>
            <td>{{ product.title }}</td>
            <td class="text-end">
              {{ product.origin_price }}
            </td>
            <td class="text-end">
              {{ product.price }}
            </td>
            <td>
              <span v-if="product.is_enabled" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-sm btn-primary"
                  @click="openProductModal('edit', product)"
                >
                  編輯
                </button>
                <button
                  type="button"
                  class="btn btn-sm btn-info"
                  @click="openProductModal('delete', product)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <ProductsModal
      :temporary-products="tempProducts"
      :status="status"
      v-on:get-data="getProducts"
      ref="ProductsModal"
    ></ProductsModal>
    <DelModal
      ref="DelModal"
      @del-item="deleteProduct"
      :title="tempProducts.title"
    ></DelModal>
    <!-- Modal -->
  </section>
  <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination>
  <Loading ref="Loading"></Loading>
</template>

<script>
import Pagination from '@/components/PaginationView.vue'
import ProductsModal from '@/components/Modal/ProductsModal.vue'
import DelModal from '@/components/Modal/DelModal.vue'
import Loading from '@/components/LoadingView.vue'
export default {
  data () {
    return {
      products: [],
      tempProducts: {
        imagesUrl: []
      },
      status: '',
      pagination: {}
    }
  },
  components: {
    Pagination,
    ProductsModal,
    DelModal,
    Loading
  },
  methods: {
    getProducts (page = 1) {
      this.$refs.Loading.ToggleLoading('on')
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`
      this.$http
        .get(api)
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
        })
        .catch((error) => {
          alert(error.data.message)
        })
      this.$refs.Loading.ToggleLoading('off')
    },
    openProductModal (status, product) {
      const productsComponent = this.$refs.ProductsModal
      const DelModal = this.$refs.DelModal
      if (!product) {
        this.tempProducts = {
          imagesUrl: []
        }
        productsComponent.openModal()
        this.status = 'create'
      } else if (status === 'edit') {
        this.tempProducts = { ...product }
        productsComponent.openModal()
        this.status = 'edit'
      } else if (status === 'delete') {
        this.tempProducts = { ...product }
        DelModal.openModal()
        this.status = 'delete'
      }
    },
    deleteProduct () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProducts.id}`
      this.$http
        .delete(api, { data: this.tempProducts })
        .then((res) => {
          this.getProducts()
          alert(res.data.message)
        })
        .catch((error) => {
          alert(error.data.message)
        })
      this.$refs.DelModal.hideModal()
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
