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
          <h5 class="modal-title" id="exampleModalLabel">付款完成!</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body text-center text-success">
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
      modal: ''
    }
  },
  mixins: [modalMixin]
}
</script>

<style lang="scss">
.bi-patch-check {
  font-size: 10rem;
}
</style>
