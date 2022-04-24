<template>
  <div
    class="modal fade"
    id="rouletteModal"
    tabindex="-1"
    aria-labelledby="modalModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="modalModalLabel">優惠券抽抽樂</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body my-3">
          <div class="roulette" v-if="!couponStatus">
            <div class="pointer">
              <span class="triangle"></span>
              <span class="circle"></span>
            </div>
            <div class="lottery text-white" ref="lottery">
              <div class="A">
                <span>全館7折</span>
              </div>
              <div class="B"><span>全館85折</span></div>
              <div class="C"><span>全館9折</span></div>
              <div class="D"><span>全館8折</span></div>
            </div>
          </div>
          <div
            v-else
            data-aos="zoom-in"
            data-aos-duration="1000"
            class="d-flex justify-content-center"
          >
            <img src="@/assets/img/gift.png" alt="coupon" />
          </div>
        </div>
        <div class="modal-footer justify-content-center">
          <div class="text text-primary">
            <button
              type="button"
              class="coupon mx-auto py-2"
              @click="getCoupon"
              ref="rouletteBtn"
              :disabled="!rouletteBtnStatus"
              v-if="!couponStatus"
            >
              點我抽獎
            </button>
            <p
              class="m-0"
              v-else
              data-aos="flip-down"
              data-aos-duration="1000"
              data-aos-delay="500"
            >
              恭喜獲得優惠碼:<span class="fw-bold fs-5">{{ coupon }}</span
              ><i
                class="bi bi-files fs-4 shake"
                @click="doCopy"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                title="複製優惠碼"
              ></i>
            </p>
          </div>
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
  data () {
    return {
      coupon: '',
      rouletteBtnStatus: true,
      couponStatus: false,
      toastMessage: '',
      rouletteStatus: JSON.parse(localStorage.getItem('rouletteStatus'))
    }
  },
  mixins: [modalMixin],
  components: {
    SuccessToast
  },
  methods: {
    getCoupon () {
      localStorage.setItem('rouletteStatus', JSON.stringify(false))
      this.$refs.rouletteBtn.style.animation = 'none'
      let angle = 0
      // 隨機抽取1~4數字
      const random = Math.floor(Math.random() * 4) + 1
      switch (random) {
        case 1:
          angle = 45
          this.coupon = 'pink70'
          break
        case 2:
          angle = 135
          this.coupon = 'chocolate90'
          break
        case 3:
          angle = 225
          this.coupon = 'coffee80'
          break
        case 4:
          angle = 315
          this.coupon = 'brown85'
          break
        default:
          angle = 0
          break
      }
      this.$refs.lottery.style.transform = `rotate(${angle + 1080}deg)`
      setTimeout(() => {
        this.couponStatus = true
      }, 4000)
    },
    doCopy () {
      this.$copyText(this.coupon, this.$refs.modal)
      this.toastMessage = '已複製優惠碼!'
      this.$refs.SuccessToast.openToasts()
      setTimeout(() => {
        this.modal.hide()
      }, 2000)
    }
  }
}
</script>

<style lang="scss">
.lottery {
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  width: 200px;
  height: 200px;
  transform: rotate(0deg);
  transition: transform 3s ease-in-out;
}

.roulette {
  position: relative;
}
.pointer {
  position: absolute;
  top: calc(50% - 20px);
  left: calc(50% - 20px);
  z-index: 2;
}

.triangle {
  display: block;
  width: 0px;
  height: 0px;
  border-top: 0px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 40px solid #313c3e;
  border-left: 10px solid transparent;
  position: absolute;
  top: calc(0% - 30px);
  left: calc(50% - 10px);
}

.circle {
  display: block;
  width: 40px;
  height: 40px;
  border: 10px solid #313c3e;
  background-color: #fff;
  border-radius: 50%;
  position: relative;
}

.lottery .A {
  width: 100px;
  height: 100px;
  border-radius: 100% 0% 0% 0%;
  background-color: #e8c6a4;
}

.lottery .B {
  width: 100px;
  height: 100px;
  border-radius: 0% 100% 0% 0%;
  background-color: #d17028;
}

.lottery .C {
  width: 100px;
  height: 100px;
  border-radius: 0% 0% 0% 100%;
  background-color: #e7b67b;
}

.lottery .D {
  width: 100px;
  height: 100px;
  border-radius: 0% 0% 100% 0%;
  background-color: #e3a160;
}

.lottery span {
  position: absolute;
}

.A span {
  transform: rotate(-45deg);
  top: 23%;
  left: 13%;
}

.B span {
  transform: rotate(45deg);
  top: 23%;
  right: 13%;
}

.C span {
  transform: rotate(-135deg);
  bottom: 23%;
  left: 13%;
}

.D span {
  transform: rotate(135deg);
  bottom: 23%;
  right: 13%;
}

.coupon {
  width: 10rem;
  border: none;
  color: #fff;
  border-radius: 999rem;
  background-color: #313c3e;
  animation: rouletteBtn 2s infinite;
}

.coupon:hover {
  background-color: #4e5b5d;
  transition: 0.5s;
}

@keyframes rouletteBtn {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.modal-footer .text span {
  padding: 5px 10px;
  margin: 5px 10px;
  border: 3px dashed #313c3e;
  color: #d17028;
}

.modal-footer .text .bi-files {
  cursor: pointer;
}

.shake {
  display: inline-block;
  animation: shake 3s infinite linear;
  transform: rotate(0deg);
}

@keyframes shake {
  0% {
    transform: rotate(-20deg);
  }
  10% {
    transform: rotate(20deg);
  }
  20% {
    transform: rotate(-20deg);
  }
  30% {
    transform: rotate(20deg);
  }
  40% {
    transform: rotate(-20deg);
  }
  50% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
