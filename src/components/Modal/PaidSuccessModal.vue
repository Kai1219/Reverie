<template>
  <div
    class="modal fade"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="exampleModalLabel" v-if="!loading">付款完成!</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body text-center" v-if="loading">
          <div
            class="mx-auto d-flex align-items-center justify-content-center text-white"
          >
            <span
              class="spinner-border text-primary spinner-size me-2 "
              role="status"
              aria-hidden="true"
            ></span>
            <span class="fs-2 text-primary">付款中...</span>
          </div>
        </div>
        <div class="modal-body text-center text-success" v-else>
          <i class="bi bi-patch-check"></i>
          <p class="fs-1">付款成功!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'
export default {
  data () {
    return {
      modal: '',
      loading: true
    }
  },
  mixins: [modalMixin],
  mounted () {
    setTimeout(() => {
      this.loading = false
    }, 3000)
  }
}
</script>

<style lang="scss">
.bi-patch-check {
  font-size: 10rem;
}

.spinner-size {
  padding: 10px;
  width: 5rem;
  height: 5rem;
}
</style>
