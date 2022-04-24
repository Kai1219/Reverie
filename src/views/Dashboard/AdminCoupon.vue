<template>
  <div class="dash-title d-flex flex-column mt-3">
    <span class="text-secondary position-relative deco-line">Coupon List</span>
    <h2 class="mb-3 fw-bold">優惠碼</h2>
  </div>
  <section>
    <div class="container">
      <div class="text-end mt-4">
        <button
          type="button"
          class="btn btn-primary"
          @click="openCouponModal('create')"
        >
          建立新的優惠碼
        </button>
      </div>
      <table class="table mt-4">
        <thead>
          <tr>
            <th width="120">標題</th>
            <th>優惠碼</th>
            <th width="120">折扣</th>
            <th width="120">截止日期</th>
            <th width="120">啟用</th>
            <th width="120">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="coupon in coupons" :key="coupon.id">
            <td>{{ coupon.title }}</td>
            <td>{{ coupon.code }}</td>
            <td>{{ coupon.percent }}%</td>
            <td>
              {{ $filters.date(coupon.due_date) }}
            </td>
            <td>
              <span v-if="coupon.is_enabled" class="text-success fw-bold"
                >啟用</span
              >
              <span v-else>未啟用</span>
            </td>
            <td>
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-sm btn-primary"
                  @click="openCouponModal('edit', coupon)"
                >
                  編輯
                </button>
                <button
                  type="button"
                  class="btn btn-sm btn-info"
                  @click="openCouponModal('delete', coupon)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <CouponModal
      :temporary-coupons="tempCoupons"
      :status="status"
      v-on:get-data="getCoupons"
      ref="CouponsModal"
    ></CouponModal>
  </section>
  <DelModal
    ref="DelModal"
    @del-item="deleteCoupon"
    :title="tempCoupons.title"
  ></DelModal>
  <Pagination :pages="pagination"></Pagination>
  <Loading ref="Loading"></Loading>
</template>

<script>
import Pagination from '@/components/PaginationView.vue'
import CouponModal from '@/components/Modal/CouponModal.vue'
import DelModal from '@/components/Modal/DelModal.vue'
import Loading from '@/components/LoadingView.vue'
export default {
  data () {
    return {
      coupons: {},
      tempCoupons: {
        title: '',
        is_enabled: 1,
        percent: 100,
        code: ''
      },
      status: '',
      pagination: {}
    }
  },
  components: {
    Pagination,
    CouponModal,
    DelModal,
    Loading
  },
  methods: {
    getCoupons (page = 1) {
      this.$refs.Loading.ToggleLoading('on')
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`
      this.$http
        .get(api)
        .then((res) => {
          this.coupons = res.data.coupons
          this.pagination = res.data.pagination
        })
        .catch((error) => {
          alert(error.data.message)
        })
      this.$refs.Loading.ToggleLoading('off')
    },
    openCouponModal (status, coupon) {
      const CouponComponent = this.$refs.CouponsModal
      const DelModal = this.$refs.DelModal

      if (!coupon) {
        this.tempCoupons = {}
        CouponComponent.openModal()
        this.tempCoupons = {
          due_date: new Date().getTime() / 1000,
          is_enabled: 0,
          percent: 100
        }
        this.status = 'create'
      } else if (status === 'edit') {
        this.tempCoupons = { ...coupon }
        CouponComponent.openModal()
        this.status = 'edit'
      } else if (status === 'delete') {
        this.tempCoupons = { ...coupon }
        DelModal.openModal()
        this.status = 'delete'
      }
    },
    deleteCoupon () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupons.id}`
      this.$http
        .delete(api, { data: this.tempCoupons })
        .then((res) => {
          this.getCoupons()
          alert(res.data.message)
        })
        .catch((error) => {
          alert(error.data.message)
        })
      this.$refs.DelModal.hideModal()
    }
  },
  mounted () {
    this.getCoupons()
  }
}
</script>
