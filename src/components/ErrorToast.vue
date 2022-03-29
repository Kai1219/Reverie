<template>
  <div class="position-fixed toast-div">
    <div
      class="toast text-white bg-danger border-0"
      ref="toast"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="d-flex">
        <div class="toast-body">
          {{ message }}
        </div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </div>
</template>

<style>
.toast-div {
  top: 5rem;
  right: 0;
  z-index: 11;
}
@media screen and (max-width: 360px) {
.toast-div {
  width: 90%;
}
}
</style>

<script>
import toastMixin from '@/mixins/toastMixin'
export default {
  props: ['message'],
  data () {
    return {}
  },
  mixins: [toastMixin]
}
</script>
