<template>
  <div class="dash-title d-flex flex-column mb-3 mt-3">
    <span class="text-secondary position-relative deco-line">Order List</span>
    <h2 class="mb-3 fw-bold">訂單列表</h2>
  </div>
  <section class="container">
    <div class="container table-responsive ">
      <table class="table table-hover align-middle">
        <thead class="table-secondary">
          <tr>
            <th scope="col">訂單編號</th>
            <th scope="col">訂單日期</th>
            <th scope="col">訂購人姓名</th>
            <th scope="col">應付金額</th>
            <th scope="col">付款狀態</th>
            <th scope="col">備註</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="order in orders" :key="order.id">
            <tr>
              <td scope="row">{{ order.id }}</td>
              <td>{{ $filters.date(order.create_at) }}</td>
              <td>{{ order.user.name }}</td>
              <td>{{ Math.round(order.total) }}</td>
              <td>
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="`paidSwitch${order.id}`"
                    v-model="order.is_paid"
                    @change="updatePaid(order)"
                    :disabled="order.is_paid"
                  />
                  <label class="form-check-label" for="`paidSwitch${order.id}`">
                    <span v-if="order.is_paid">已付款</span>
                    <span v-else class="text-danger fw-bold">未付款</span>
                  </label>
                </div>
              </td>
              <td>{{ order.user.message }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="openModal(order)"
                >
                  明細
                </button>
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-info"
                  @click="openDelOrderModal(order)"
                >
                  刪除
                </button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
      <Pagination :pages="pagination" @emit-pages="getOrders"></Pagination>
  </section>
  <OrderModal
    :temporary-order="tempOrder"
    :edit-status="editStatus"
    ref="orderModal"
    @update-paid="updatePaid"
    @change-edit="changeEdit"
  ></OrderModal>
  <DelModal ref="DelModal" @del-item="delOrder" :title="delteTitle"></DelModal>
  <Loading ref="Loading"></Loading>
</template>

<script>
import OrderModal from '@/components/Modal/OrderModal.vue'
import DelModal from '@/components/Modal/DelModal.vue'
import Pagination from '@/components/PaginationView.vue'
import Loading from '@/components/LoadingView.vue'
export default {
  data () {
    return {
      orders: {},
      pagination: {},
      tempOrder: {},
      currentPage: 1,
      editStatus: false,
      delteTitle: ''
    }
  },
  components: {
    Pagination,
    DelModal,
    OrderModal,
    Loading
  },
  methods: {
    getOrders (currentPage = 1) {
      this.$refs.Loading.ToggleLoading('on')
      this.currentPage = currentPage
      this.isLoading = true
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${this.currentPage}`
        )
        .then((res) => {
          this.orders = res.data.orders
          this.pagination = res.data.pagination
          this.isLoading = false
        })
        .catch((error) => {
          this.isLoading = false
          alert(error.data.message)
        })
      this.$refs.Loading.ToggleLoading('off')
    },
    openModal (order) {
      this.tempOrder = JSON.parse(JSON.stringify(order))
      this.editStatus = false
      const orderComponent = this.$refs.orderModal
      orderComponent.openModal()
    },
    openDelOrderModal (order) {
      this.tempOrder = { ...order }
      this.delteTitle = this.tempOrder.id + '此筆訂單'
      const DelModal = this.$refs.DelModal
      DelModal.openModal()
    },
    updatePaid (order) {
      const paid = {
        is_paid: order.is_paid,
        user: order.user
      }
      this.$http
        .put(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${order.id}`,
          { data: paid }
        )
        .then((res) => {
          this.getOrders(this.currentPage)
          if (!this.editStatus) {
            alert(res.data.message)
            const orderComponent = this.$refs.orderModal
            orderComponent.hideModal()
          } else {
            alert('已更新收件人資訊')
            this.editStatus = false
          }
        })
        .catch((error) => {
          alert(error.data.message)
        })
    },
    delOrder () {
      this.isLoading = true
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`
        )
        .then(() => {
          this.getOrders(this.currentPage)
          alert('訂單刪除成功!')
        })
        .catch((error) => {
          alert(error.data.message)
        })
      this.$refs.DelModal.hideModal()
      this.isLoading = false
    },
    changeEdit () {
      this.editStatus = true
    }
  },
  mounted () {
    this.getOrders()
  }
}
</script>
