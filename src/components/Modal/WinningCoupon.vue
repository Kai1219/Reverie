<template>
  <div class="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modal title</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p class="m-0">
            恭喜獲得優惠碼:<span class="fw-bold fs-5">{{ coupon }}</span
            ><i
              class="bi bi-files fs-5"
              @click="doCopy"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              title="複製優惠碼"
            ></i>
          </p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
    <SuccessToast ref="SuccessToast" :message="toastMessage"></SuccessToast>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'
import SuccessToast from '@/components/SuccessToast.vue'
export default {
  props: ['coupon'],
  data () {
    return {
      toastMessage: ''
    }
  },
  mixins: [modalMixin],
  components: {
    SuccessToast
  },
  methods: {
    doCopy () {
      this.$copyText(this.coupon, this.$refs.modal)
      this.toastMessage = '已複製優惠碼!'
      this.$refs.SuccessToast.openToasts()
    }
  }
}
</script>
